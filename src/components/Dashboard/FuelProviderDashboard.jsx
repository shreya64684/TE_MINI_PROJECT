import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaIndustry, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getContractInstance, getWeb3Instance, initializeWeb3, switchToGanacheNetwork } from '../../utils/web3Setup';


const FuelProviderDashboard = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [fuelData, setFuelData] = useState([]);
    const [web3Initialized, setWeb3Initialized] = useState(false);
    // Add remark state for the verifier
    const [remark, setRemark] = useState('');
    const [remarks, setRemarks] = useState({});

    // Update remark for a specific entry
    const handleRemarkChange = (id, value) => {
        setRemarks((prevRemarks) => ({ ...prevRemarks, [id]: value }));
    };


    const handleLogout = () => {
        // Clear the token and any other user data from local storage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    };

    useEffect(() => {
        // Fetch company-specific data using userId
        const fetchFuelData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/company/${userId}/fuel-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("fetched Data: ", data);
                console.log("Fuel Data while fetching: ", data.fuelData);

                if (response.ok) {
                    console.log(data.fuelData);
                    setFuelData(data.fuelData); // Adjust key as per your API
                } else {
                    setError(data.message || 'Failed to fetch raw material data');
                }
            } catch (error) {
                setError('Error fetching raw material data');
                console.error('Error fetching raw material data:', error);
            }
        };

        fetchFuelData();
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

    const addFuelDataToBlockchain = async (data) => {
        console.log('Data being sent to blockchain in addFuelDataToBlockchain:', data);

        // Validate required fields
        const fuels = data.fuels.map(fuel => ({
            fuelType: fuel.fuelType,
            quantitySupplied: parseFloat(fuel.quantitySupplied), // Ensure it's a number
            lowerHeatingValue: fuel.lowerHeatingValue ? parseFloat(fuel.lowerHeatingValue) : 0, // Default 0 if not provided
            carbonContent: fuel.carbonContent ? parseFloat(fuel.carbonContent) : 0 // Default 0 if not provided
        }));
        console.log("Fuel Data: ", fuels);

        const fuelBill = data.billHash; // Ensure it's a valid string
        console.log("Fuel Bill Hash: ", fuelBill);

        const timestamp = String(Math.floor(Date.now() / 1000));
        console.log("Timestamp: ", timestamp);

        if (!fuels.length || !fuelBill) {
            throw new Error(
                `Missing or Invalid data: 
            Fuel Data: ${JSON.stringify(fuels)}, 
            Fuel Bill: ${fuelBill}, 
            Timestamp: ${timestamp}`
            );
        }


        console.log("Parsed Data for Blockchain:", { fuels, fuelBill, timestamp });

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

            const accounts = await web3.eth.getAccounts();
            if (accounts.length === 0) {
                throw new Error("No accounts found. Ensure MetaMask is unlocked and connected to the correct network.");
            }

            console.log('Using account:', accounts[0]);
            console.log("Account Balance:", await web3.eth.getBalance(accounts[0]));

            // Extract fuel data
            const fuelTypes = fuels.map(f => f.fuelType);
            const quantities = fuels.map(f => f.quantitySupplied);
            const heatingValues = fuels.map(f => f.lowerHeatingValue);
            const carbonContents = fuels.map(f => f.carbonContent);
            const fuelBill = data.billHash;
            const timestamp = String(Math.floor(Date.now() / 1000));

            // Validate required fields
            if (!fuelTypes.length || !quantities.length || !fuelBill) {
                throw new Error("Missing or invalid fuel data.");
            }

            console.log("Sending fuel data to blockchain:", {
                fuelTypes,
                quantities,
                heatingValues,
                carbonContents,
                fuelBill,
                timestamp
            });

            console.log("Contract methods: ", contract.methods);


            // Send data to the blockchain
            const transactionReceipt = await contract.methods
                .addFuelData(fuelTypes, quantities, heatingValues, carbonContents, fuelBill)
                .send({ from: accounts[0] });

            console.log('Transaction Receipt:', transactionReceipt);
            console.log('Fuel data successfully added to blockchain!');


            // **Listen for the ElectricityDataAdded event**
            contract.events.FuelDataAdded({ fromBlock: 'latest' })
                .on('data', async (event) => {
                    console.log('FuelAdded Event:', event);

                    // Fetch updated data from blockchain
                    const latestData = await contract.methods.getFuelData(accounts[0]).call();
                    console.log('Latest Data from Blockchain:', latestData);

                    // Extract CO₂ equivalent and transaction details
                    const { totalElectricityConsumedMWH, carbonEquivalent } = latestData;

                    // Update UI dynamically
                    updateFuelUI({
                        consumption: totalElectricityConsumedMWH,
                        co2Equivalent: carbonEquivalent,
                        transactionHash: transactionReceipt.transactionHash
                    });
                })
                .on('error', console.error);


        } catch (error) {
            console.error('Failed to add fuel data to blockchain.', error);
            throw error;
        }
    };


    // **Function to update UI dynamically**
    const updateFuelUI = ({ consumption, co2Equivalent, transactionHash }) => {
        document.getElementById('electricity-consumption').innerText = `Consumption: ${consumption} MWh`;
        document.getElementById('co2-equivalent').innerText = `CO₂ Equivalent: ${co2Equivalent} tons`;
        document.getElementById('transaction-hash').innerText = `Transaction Hash: ${transactionHash}`;
    };


    const handleVerify = async (data) => {
        console.log('Verifying fuel data:', data);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/fuel-data/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ fuelBill: data.fuelBill }), // Use fuelBill as the unique identifier
            });

            if (response.ok) {
                setSuccessMessage('Fuel data verified successfully!');
                setErrorMessage('');
                // Update the data to reflect changes
                setFuelData((prevData) =>
                    prevData.map((item) =>
                        item.fuelBill === data.fuelBill ? { ...item, verified: true } : item
                    )
                );
                console.log("Verified Fuel Data: ", data);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to verify fuel data');
            }
        } catch (error) {
            setErrorMessage('Error verifying fuel data');
            console.error(error);
        }
    };

    const handleReject = async (data, remark) => {
        console.log('Rejecting fuel data with remark:', remark);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/fuel-data/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ fuelBill: data.fuelBill, remark }), // Send the unique identifier and remark
            });

            if (response.ok) {
                setSuccessMessage('Fuel data rejected successfully!');
                setErrorMessage('');
                // Update the data with rejection status and remark
                setFuelData((prevData) =>
                    prevData.map((item) =>
                        item.fuelBill === data.fuelBill ? { ...item, verified: false, remark } : item
                    )
                );
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to reject fuel data');
            }
        } catch (error) {
            setErrorMessage('Error rejecting fuel data');
            console.error(error);
        }
    };

    const handleAccept = async (data) => {
        console.log('Fuel Data being sent to blockchain:', data);

        if (!data.fuel || data.fuel.length === 0 || !data.fuelBill) {
            setErrorMessage("Incomplete data. Ensure all required fields are provided.");
            return;
        }

        try {
            // Convert date to timestamp
            const timestamp = Math.floor(new Date(data.date).getTime() / 1000); // Convert to seconds
            // Ensure all quantities are valid numbers
            const fuels = data.fuel.map((item) => ({
                fuelType: item.fuelType,
                quantitySupplied: Math.round(Number(item.quantitySupplied)), // Convert to integer
                lowerHeatingValue: item.lowerHeatingValue ? parseFloat(item.lowerHeatingValue) : 0, // Default 0 if not provided
                carbonContent: item.carbonContent ? parseFloat(item.carbonContent) : 0 // Default 0 if not provided
            }));

            if (fuels.some((item) => isNaN(item.quantitySupplied))) {
                setErrorMessage("Invalid quantity format in fuel data.");
                return;
            }

            console.log('Data being sent to blockchain:', {
                fuels,
                billHash: data.fuelBill, // Assuming it's an IPFS hash
                timestamp,
            });

            // Call the smart contract function to add fuel data
            await addFuelDataToBlockchain({
                fuels,
                billHash: data.fuelBill,
                timestamp,
            });

            // Send request to backend to update MongoDB record as accepted
            const response = await fetch(`http://localhost:5000/api/company/${userId}/fuel-data/accept`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ fuelBill: data.fuelBill }),
            });

            if (response.ok) {
                setSuccessMessage('Fuel data accepted successfully!');
                setFuelData((prevData) =>
                    prevData.map((item) =>
                        item.fuelBill === data.fuelBill ? { ...item, accepted: true } : item
                    )
                );
                setErrorMessage('');
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to accept fuel data');
            }
        } catch (error) {
            setErrorMessage('Error accepting fuel data');
            console.error(error);
        }
    };


    // Render company-specific dashboard data
    return (
        <div>

            <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-green-100 shadow-lg rounded-r-xl border border-gray-100">
                    <div className="px-6 py-8 border-b border-gray-100" >
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            Fuel Supplier Dashboard
                        </h2>
                    </div>
                    <nav className="mt-10 px-4">
                        <ul className="space-y-2">
                            {/* Add Sidebar Options Here */}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 overflow-hidden flex flex-col">
                    {/* Profile and Content Area */}
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
                                <span className="text-sm font-medium text-gray-700">Fuel Supplier Profile</span>
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

                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Fuel Supplier Dashboard</h2>
                            {error && <p className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 border-l-4 border-red-500">{error}</p>}

                            <div className="space-y-6">

                                {fuelData.map((data) => (
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
                                                {/* Display Fuel Details */}
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <div>
                                                        <p className="text-gray-700 font-medium">Fuels:</p>
                                                        <ul className="text-xl font-bold text-emerald-600">
                                                            {data.fuel.map((fuel, index) => (
                                                                <li key={index}>
                                                                    {fuel.fuelType}: {fuel.quantitySupplied} Kg, Heating Value: {fuel.lowerHeatingValue} MJ/kg, Carbon Content: {fuel.carbonContent}%
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>



                                                    <div>
                                                        <p className="text-gray-700 font-medium">Bill:</p>
                                                        <a
                                                            href={`https://gateway.pinata.cloud/ipfs/${data.fuelBill}`}
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
                                                    src={`https://gateway.pinata.cloud/ipfs/${data.fuelBill}`}
                                                    alt="Fuel Bill"
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
                            {successMessage && <p className="mt-4 p-3 rounded-lg bg-green-50 text-green-600 border-l-4 border-green-500">{successMessage}</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default FuelProviderDashboard;