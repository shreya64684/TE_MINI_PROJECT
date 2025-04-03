import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ChevronRight, ChevronDown, Search, Book, LogOut, Settings } from "lucide-react";
import { FaPlus, FaIndustry, FaTrash, FaUserCircle, FaCog, FaBell } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { initializeWeb3, getContractInstance, getWeb3Instance, switchToGanacheNetwork } from '../../utils/web3Setup';
import DocumentationSidebar from '../../components/UI/DocumentationSidebar';

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
    const [isProfileOpen, setIsProfileOpen] = useState(false);


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
            .addElectricityData(billHash, consumption, timestamp)
            .send({ from: accounts[0] });

            console.log('Transaction Receipt:', transactionReceipt);
               
    
            console.log('Electricity data successfully added to blockchain!');

        } catch (error) {
            console.error('Failed to add data to blockchain.', error);
            throw error; // Propagate the error to handle in handleVerify
        }
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
            <div className="flex h-screen bg-gray-100">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg">
                    <div className="px-6 py-8">
                        <h2 className="text-2xl font-bold text-emerald-600">Electricity Supplier Dashboard</h2>
                    </div>
                    <nav className="mt-10">
                        <ul>
                            {/* Add Sidebar Options Here */}
                        </ul>
                    </nav>
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 p-8">
                    {/* Profile and Header */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-semibold text-gray-700">Dashboard Overview</h1>
                        <button
                            onClick={handleLogout}
                            className="mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                        <div className="flex items-center space-x-4">
                            <FaUserCircle className="text-3xl text-gray-500" />
                            <span className="text-lg text-gray-700">Electricity Supplier Profile</span>
                        </div>
                    </div>

                    {/* Electricity Data Section */}
                    <div className="p-6">
                        <h2 className="text-2xl font-semibold mb-4">Electricity Supplier Dashboard</h2>
                        {error && <p className="text-red-500">{error}</p>}
                        <ul className="list-none ml-5">
                            {electricityData.map((data) => (
                                <li key={data._id} className="mb-2">
                                    <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                                    <p>Electricity Consumed: {data.totalElectricityConsumedMWH} MWH</p>
                                    <p>
                                        Bill:{' '}
                                        <a
                                            // href={`https://ipfs.io/ipfs/${data.electricityBill}`}  
                                           href={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 underline"
                                        >
                                            View Bill
                                        </a>
                                    </p>
                                    <img className='w-[300px] h-auto'
                                    // src={`https://ipfs.io/ipfs/${data.electricityBill}`}
                                    href={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                                    // src="/public/bill.png"
                                    ></img>
                                    <button
                                        onClick={() => handleVerify(data)}
                                        disabled={data.verified && data.accepted}
                                        className={`mt-2 px-3 py-1 rounded-md ${
                                        data.verified 
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                    >
                                        {data.verified ? 'Verified' : 'Verify'}
                                    </button>
                                    <textarea
                                        placeholder="Enter remark"
                                        value={remark}
                                        onChange={(e) => setRemark(e.target.value)}
                                        className="px-3 py-1 ml-2 rounded-md  mt-1 mb-[-7px]"
                                    />
                                    <button 
                                        onClick={() => handleReject(data, remark)}
                                        className="px-3 py-1 ml-2 rounded-md bg-green-500 text-white hover:bg-green-600"
                                    >
                                        Reject with Remark
                                    </button>
                                    <button
                                        onClick={() => handleAccept(data)}
                                        disabled={!data.verified || data.accepted}
                                        className={`px-3 py-1 ml-2 rounded-md ${
                                            data.accepted
                                            ? 'bg-gray-400 cursor-not-allowed'
                                            : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                    >
                                        {data.accepted ? 'Accepted' : 'Accept'}
                                  </button>

                                </li>
                            ))}
                        </ul>
                        {successMessage && <p className="text-green-500">{successMessage}</p>}
                        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    </div>
                </div>
                {/* </div> */}
            </div>
        </div>
    )
}

export default ElectricityDashboard;