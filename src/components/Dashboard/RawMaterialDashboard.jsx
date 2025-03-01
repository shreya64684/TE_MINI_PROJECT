import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaIndustry, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getContractInstance, getWeb3Instance, initializeWeb3, switchToGanacheNetwork } from '../../utils/web3Setup';


const RawMaterialDashboard = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [rawMaterialData, setRawMaterialData] = useState([]);
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
        const fetchRawMaterialData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/company/${userId}/raw-material-data`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("fetched Data: ", data);
                console.log("Raw Material Data while fetching: ", data.rawMaterialData);

                if (response.ok) {
                    console.log(data.rawMaterialData);
                    setRawMaterialData(data.rawMaterialData); // Adjust key as per your API
                } else {
                    setError(data.message || 'Failed to fetch raw material data');
                }
            } catch (error) {
                setError('Error fetching raw material data');
                console.error('Error fetching raw material data:', error);
            }
        };

        fetchRawMaterialData();
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

    const addRawMaterialDataToBlockchain = async (data) => {
        console.log('Data being sent to blockchain in addRawMaterialDataToBlockchain:', data);

        // Validate required fields
        const materials = data.materials.map(mat => ({
            materialType: mat.materialType,
            quantitySupplied: parseInt(mat.quantitySupplied) // Ensure it's a number
        }));
        console.log("Materials: ", materials);

        const billHash = data.billHash; // Ensure it's a valid string
        console.log("Bill Hash: ", billHash);

        const timestamp = String(Math.floor(Date.now() / 1000));
        console.log("Timestamp: ", timestamp);

        if (!materials.length || !billHash) {
            throw new Error(
                `Missing or Invalid data: 
            Materials: ${JSON.stringify(materials)}, 
            rawMaterialBill: ${billHash}, 
            timestamp: ${timestamp}`
            );
        }

        console.log("Parsed Data for Blockchain:", { materials, billHash, timestamp });

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

            // Extract materials data
            const materialTypes = data.materials.map(m => m.materialType);
            const quantities = data.materials.map(m => parseInt(m.quantitySupplied));
            const billHash = data.billHash;
            const timestamp = String(Math.floor(Date.now() / 1000));

            // Validate required fields
            if (!materialTypes.length || !quantities.length || !billHash) {
                throw new Error("Missing or invalid raw material data.");
            }

            console.log("Sending raw material data to blockchain:", {
                materialTypes,
                quantities,
                billHash,
                timestamp
            });

            console.log("Contract methods: ", contract.methods);
            

            // Send data to the blockchain
            const transactionReceipt = await contract.methods
                .addRawMaterialData(materialTypes, quantities, billHash)
                .send({ from: accounts[0] });

            console.log('Transaction Receipt:', transactionReceipt);
            console.log('Raw material data successfully added to blockchain!');
        } catch (error) {
            console.error('Failed to add raw material data to blockchain.', error);
            throw error;
        }
    };


    const handleVerify = async (data) => {
        console.log('Verifying raw material data:', data);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/raw-material-data/verify`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date }), // Use a unique identifier
            });

            if (response.ok) {
                setSuccessMessage('Raw material data verified successfully!');
                setErrorMessage('');
                // Update the data to reflect changes
                setRawMaterialData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, verified: true } : item
                    )
                );
                console.log("Verified Raw Material Data: ", data);
            } else {
                const data = await response.json();
                setErrorMessage(data.message || 'Failed to verify raw material data');
            }
        } catch (error) {
            setErrorMessage('Error verifying raw material data');
            console.error(error);
        }
    };



    const handleReject = async (data, remark) => {
        console.log('Rejecting raw material data with remark:', remark);
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/raw-material-data/reject`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date, remark }), // Send the unique identifier and remark
            });

            if (response.ok) {
                setSuccessMessage('Raw material data rejected successfully!');
                setErrorMessage('');
                // Update the data with rejection status and remark
                setRawMaterialData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, verified: false, remark } : item
                    )
                );
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to reject raw material data');
            }
        } catch (error) {
            setErrorMessage('Error rejecting raw material data');
            console.error(error);
        }
    };

    const handleAccept = async (data) => {
        console.log('Raw Material Data being sent to blockchain:', data);

        if (!data.material || data.material.length === 0 || !data.rawMaterialBill) {
            setErrorMessage("Incomplete data. Ensure all required fields are provided.");
            return;
        }

        try {
            // Convert date to timestamp
            const timestamp = Math.floor(new Date(data.date).getTime() / 1000); // Convert to seconds
            // Ensure all quantities are valid numbers
            const materials = data.material.map((item) => ({
                materialType: item.materialType,
                quantitySupplied: Math.round(Number(item.quantitySupplied)), // Convert to integer
            }));

            if (materials.some((item) => isNaN(item.quantitySupplied))) {
                setErrorMessage("Invalid quantity format in raw materials.");
                return;
            }

            console.log('Data being sent to blockchain:', {
                materials,
                billHash: data.rawMaterialBill, // Assuming it's an IPFS hash
                timestamp,
            });

            // Call the smart contract function to add raw material data
            await addRawMaterialDataToBlockchain({
                materials,
                billHash: data.rawMaterialBill,
                timestamp,
            });

            // Send request to backend to update MongoDB record as accepted
            const response = await fetch(`http://localhost:5000/api/company/${userId}/raw-material-data/accept`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ date: data.date , billHash: data.rawMaterialBill}),
            });

            if (response.ok) {
                setSuccessMessage('Raw Material data accepted successfully!');
                setRawMaterialData((prevData) =>
                    prevData.map((item) =>
                        item.date === data.date ? { ...item, accepted: true } : item
                    )
                );
                setErrorMessage('');
            } else {
                const responseData = await response.json();
                setErrorMessage(responseData.message || 'Failed to accept raw material data');
            }
        } catch (error) {
            setErrorMessage('Error accepting raw material data');
            console.error(error);
        }
    };


    // Render company-specific dashboard data
    return (
        // <div className="p-6">
        //     <h1 className="text-2xl font-bold mb-4">Raw Material Dashboard</h1>
        //     {error && <p className="text-red-500">{error}</p>}
        //     <ul>
        //         {rawMaterialData.map((mat, index) => (
        //             <li key={index} className="border p-3 mb-2 rounded">

        //                 Material: {mat.material[0].materialType}, Quantity: {mat.material[0].quantitySupplied}, Verified: {mat.verified ? 'Yes' : 'No'} , Date : {mat.date}
        //             </li>
        //         ))}
        //     </ul>
        // </div>


        <div className="flex h-screen bg-gray-100 ">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-emerald-600">Raw Material Provider Dashboard</h2>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                {/* Profile and Content Area */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-700">Dashboard Overview</h1>
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-3xl text-gray-500" />
                        <span className="text-lg text-gray-700">Raw Material Provider Profile</span>
                        <button
                            onClick={handleLogout}
                            className="py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Raw Material Data Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Raw Material Supplier Dashboard</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <ul className="list-none ml-5">
                        {rawMaterialData.map((data) => (
                            <li key={data._id} className="mb-4 border p-4 rounded-md bg-white shadow">
                                <p>Date: {new Date(data.date).toLocaleDateString()}</p>

                                {/* Corrected Materials Display */}
                                <p>Materials:</p>
                                <ul className="list-disc ml-6">
                                    {data.material.map((mat, index) => (
                                        <li key={index}>
                                            {mat.materialType}: {mat.quantitySupplied} metric tons
                                        </li>
                                    ))}
                                </ul>

                                {/* Corrected IPFS Bill Display */}
                                <p>
                                    Raw Material Bill:{' '}
                                    <a
                                        href={`https://gateway.pinata.cloud/ipfs/${data.rawMaterialBill}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Bill
                                    </a>
                                </p>
                                <img
                                    className="w-[300px] h-auto mt-2"
                                    src={`https://gateway.pinata.cloud/ipfs/${data.rawMaterialBill}`}
                                    alt="Raw Material Bill"
                                />

                                {/* Buttons Section */}
                                <button
                                    onClick={() => handleVerify(data)}
                                    disabled={data.verified && data.accepted}
                                    className={`mt-2 px-3 py-1 rounded-md ${data.verified
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-green-500 text-white hover:bg-green-600'
                                        }`}
                                >
                                    {data.verified ? 'Verified' : 'Verify'}
                                </button>

                                {/* Corrected Remark Input */}
                                <textarea
                                    placeholder="Enter remark"
                                    value={remarks[data._id] || ""}
                                    onChange={(e) => handleRemarkChange(data._id, e.target.value)}
                                    className="px-3 py-1 ml-2 rounded-md border border-gray-300 mt-1"
                                />

                                <button
                                    onClick={() => handleReject(data, remarks[data._id] || "")}
                                    className="px-3 py-1 ml-2 rounded-md bg-red-500 text-white hover:bg-red-600"
                                >
                                    Reject with Remark
                                </button>

                                {/* Fixed Accept Button */}
                                <button
                                    onClick={() => handleAccept(data)}
                                    disabled={data.verified !== true || data.accepted}
                                    className={`px-3 py-1 ml-2 rounded-md ${data.accepted ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
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
                <Outlet />
            </div>
        </div>

    );
};

export default RawMaterialDashboard;