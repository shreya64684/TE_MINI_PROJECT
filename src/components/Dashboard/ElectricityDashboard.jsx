import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaIndustry, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { initializeWeb3, getContractInstance, getWeb3Instance, switchToGanacheNetwork } from '../../utils/web3Setup';

const ElectricityDashboard = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL
    const [electricityData, setElectricityData] = useState([]);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [web3Initialized, setWeb3Initialized] = useState(false);
    // Add remark state for the verifier
    const [remark, setRemark] = useState('');

    const handleLogout = () => {
        // Clear the token and any other user data from local storage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    };

    useEffect(() => {
        const fetchElectricityData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/company/${userId}/electricity-data`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                console.log("Data:", data)
                console.log("Electricity Data:", data.electricityData);


                if (response.ok) {
                    setElectricityData(data.electricityData); // Adjust key as per your API
                } else {
                    setError(data.message || 'Failed to fetch electricity data');
                }
            } catch (error) {
                setError('Error fetching electricity data');
            }
        };

        fetchElectricityData();
    }, [userId, token]);

    useEffect(() => {
        const setupWeb3 = async () => {
            try {
                await initializeWeb3();
                setWeb3Initialized(true);
                console.log("Web3 Initialized successfully.");
            } catch (error) {
                console.error("Failed to initialize Web3:", error);
            }
        };

        setupWeb3();
    }, []);

    const addElectricityDataToBlockchain = async (data) => {
        console.log('Data being sent to blockchain in blockchain function:', data);

        // Validate required fields
        const consumption = parseInt(data.consumption); // Ensure it's a number
        console.log("Consumption: ", consumption);
        const billHash = data.billHash; // Ensure it's a valid string
        console.log("billHash: ", billHash);
        const timestamp = String(Math.floor(Date.now() / 1000));
        console.log("Timestamp: ", timestamp);


        if (!consumption || !billHash) {
            throw new Error(
                `Missing or Invalid data: 
                totalElectricityConsumedMWH: ${consumption}, 
                electricityBill: ${billHash}, 
                timestamp: ${timestamp}
                `
            );
        }

        console.log("Parsed Data for Blockchain:", { consumption, billHash, timestamp });

        try {
            if (!web3Initialized) {
                throw new Error("Web3 is not initialized. Please try again later.");
            }

            // Ensure the Ganache network is selected in MetaMask
            await switchToGanacheNetwork();

            // Get Web3 and Contract instances
            const web3 = getWeb3Instance();
            const contract = getContractInstance();
            console.log("Web, Contract: ", web3, contract);
            // const { web3, contract } = await initializeWeb3();

            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                throw new Error("No accounts found. Ensure MetaMask is unlocked and connected to the correct network.");
            }
            console.log('Using account:', accounts[0]);
            console.log("Account Balance:", await web3.eth.getBalance(accounts[0]));
            // Ensure that all data is present
            console.log("Sending data in bc fun:", {
                billHash,
                consumption,
                timestamp,
            });



            const transactionReceipt = await contract.methods
                .addElectricityData( consumption, billHash, timestamp)
                .send({ from: accounts[0] });

            console.log('Transaction Receipt:', transactionReceipt);

            console.log('Electricity data successfully added to blockchain!');

        } catch (error) {
            console.error('Failed to add data to blockchain.', error);
            throw error; // Propagate the error to handle in handleVerify
        }
    };



    // **Function to update UI dynamically**
    const updateElectricityUI = ({ consumption, co2Equivalent, transactionHash }) => {
        document.getElementById('electricity-consumption').innerText = `Consumption: ${consumption} MWh`;
        document.getElementById('co2-equivalent').innerText = `CO₂ Equivalent: ${co2Equivalent} tons`;
        document.getElementById('transaction-hash').innerText = `Transaction Hash: ${transactionHash}`;
    };



    const handleVerify = async (data) => {
        console.log('Verifying data:', data);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/electricity-data/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date }), // Send the unique identifier
            });

            if (response.ok) {

                setSuccessMessage('Data verified successfully!');
                setErrorMessage('');
                // Refresh the data to reflect changes
                setElectricityData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, verified: true } : item
                    )
                );
                console.log("Verified Data: ", data);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to verify data');
            }
        } catch (error) {
            setErrorMessage('Error verifying data');
            console.error(error);
        }
    };

    const handleReject = async (data, remark) => {
        console.log('Rejecting data with remark:', remark);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/electricity-data/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date, remark }), // Send the unique identifier and remark
            });

            if (response.ok) {
                setSuccessMessage('Data rejected successfully!');
                setErrorMessage('');
                // Update the data with rejection status and remark
                setElectricityData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, verified: false, remark } : item
                    )
                );
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to reject data');
            }
        } catch (error) {
            setErrorMessage('Error rejecting data');
            console.error(error);
        }
    };


    const handleAccept = async (data) => {
        console.log('Data sent to blockchain or initially in accept function:', data);

        if (!data.totalElectricityConsumedMWH || !data.electricityBill) {
            setErrorMessage("Incomplete data. Please ensure all fields are provided in accept function in accept.");
            return;
        }

        try {

            // Convert date to timestamp and consumption to an integer
            const timestamp = Math.floor(new Date(data.date).getTime() / 1000); // Convert to seconds
            const consumption = Math.round(Number(data.totalElectricityConsumedMWH)); // Convert to integer

            // Ensure converted values are valid
            if (isNaN(timestamp) || isNaN(consumption)) {
                setErrorMessage('Invalid data format. Check consumption or date.');
                return;
            }

            console.log('Data being sent to blockchain before await : ', {
                consumption,
                billHash: data.electricityBill, // Assuming it's an IPFS hash
                timestamp,
            });

            await addElectricityDataToBlockchain({
                consumption,
                billHash: data.electricityBill,
                timestamp,
            });

            const response = await fetch(`http://localhost:5000/api/company/${userId}/electricity-data/accept`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date }),
            });

            if (response.ok) {

                // console.log('Data being sent to blockchain in accept:', data);
                setSuccessMessage('Data accepted successfully!');
                setElectricityData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, accepted: true } : item
                    )
                );
                setErrorMessage('');
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to accept data');
            }
        } catch (error) {
            setErrorMessage('Error accepting data');
            console.error(error);
        }
    };


    return (
        <div>
            <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-green-100 shadow-lg rounded-r-xl border border-gray-100">
                    <div className="px-6 py-8 border-b border-gray-100" >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Electricity Supplier Dashboard
                        </h2>
                        <p className="mt-2 text-xs text-gray-500">Carbon Footprint Manager</p>
                    </div>
                    <nav className="mt-10 px-4">
                        <ul className="space-y-2">
                            {/* Add Sidebar Options Here */}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Profile and Header */}
                    <div className="flex justify-between items-center py-4 px-8 bg-white shadow-sm">
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard Overview</h1>
                        <div className="flex items-center space-x-4">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-sm font-medium">
                                Eco-Supplier
                            </span>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                                    <FaUserCircle className="text-xl" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Electricity Supplier Profile</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="py-2 px-4 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition duration-200 shadow-sm"
                            >
                                Logout
                            </button>
                        </div>

                    </div>

                    {/* Content Area with Scrolling */}
                    <div className="flex-1 overflow-y-auto p-6 bg-gray-200">

                        {/* Electricity Data Section */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Electricity Supplier Dashboard</h2>
                            {error && <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border-l-4 border-red-500">{error}</p>}
                            
                            <div className="space-y-6">
                                {electricityData.map((data) => (
                                    <div key={data._id} className="p-4 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors bg-white shadow-sm hover:shadow">
                                        <div className="flex flex-col md:flex-row md:items-start gap-6">
                                            <div className="flex-1">
                                                <div className="flex items-center mb-3">
                                                    <span className="inline-block px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs font-medium">
                                                        {new Date(data.date).toLocaleDateString()}
                                                    </span>
                                                    {data.verified && (
                                                        <span className="ml-2 inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                                                            Verified
                                                        </span>
                                                    )}
                                                    {data.accepted && (
                                                        <span className="ml-2 inline-block px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                                            Accepted
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-gray-700 font-medium">Electricity Consumed:</p>
                                                        <p className="text-xl font-bold text-emerald-600">{data.totalElectricityConsumedMWH} MWH</p>
                                                    </div>

                                                    <div>
                                                        <p className="text-gray-700 font-medium">Bill:</p>
                                                        <a
                                                            href={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-block mt-1 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-md transition-colors text-sm"
                                                        >
                                                            View Bill
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex-shrink-0">
                                                <img
                                                    className="w-64 h-auto rounded-lg border border-gray-200 object-cover shadow-sm"
                                                    src={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                                                    alt="Electricity Bill"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-wrap items-center gap-3">
                                            <button
                                                onClick={() => handleVerify(data)}
                                                disabled={data.verified && data.accepted}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${data.verified
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-sm'
                                                    }`}
                                            >
                                                {data.verified ? 'Verified' : 'Verify'}
                                            </button>

                                            <button
                                                onClick={() => handleAccept(data)}
                                                disabled={!data.verified || data.accepted}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!data.verified || data.accepted
                                                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                        : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-sm'
                                                    }`}
                                            >
                                                {data.accepted ? 'Accepted' : 'Accept'}
                                            </button>

                                            <div className="flex flex-grow items-center gap-2 mt-2 w-full">
                                                <textarea
                                                    placeholder="Enter remark..."
                                                    value={remark}
                                                    onChange={(e) => setRemark(e.target.value)}
                                                    className="flex-grow px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                                    rows="1"
                                                />
                                                <button
                                                    onClick={() => handleReject(data, remark)}
                                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 shadow-sm"
                                                >
                                                    Reject with Remark
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                                    <p className="text-sm font-medium text-emerald-700">Consumption:</p>
                                    <p id="electricity-consumption" className="text-xl font-bold text-emerald-800">
                                        {electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0).toFixed(2)} MWH
                                    </p>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                                    <p className="text-sm font-medium text-emerald-700">CO₂ Equivalent:</p>
                                    <p id="co2-equivalent" className="text-xl font-bold text-emerald-800">
                                        {(electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0) * 0.82).toFixed(2)} tons
                                    </p>
                                </div>

                                <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border border-emerald-100">
                                    <p className="text-sm font-medium text-emerald-700">Transaction Hash:</p>
                                    <p id="transaction-hash" className="text-sm font-medium text-emerald-800 truncate">
                                        {electricityData[0]?._id || '--'}
                                    </p>
                                </div>
                            </div>
                            <p id="electricity-consumption">Consumption: --</p>
                            <p id="co2-equivalent">CO₂ Equivalent: --</p>
                            <p id="transaction-hash">Transaction Hash: --</p>
                            {successMessage && <p className="mt-4 p-3 rounded-lg bg-green-50 text-green-600 border-l-4 border-green-500">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ElectricityDashboard;