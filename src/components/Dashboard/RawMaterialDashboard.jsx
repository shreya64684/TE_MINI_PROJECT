import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaIndustry, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RawMaterialDashboard = () => {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');
    const [rawMaterialData, setRawMaterialData] = useState(null);

    useEffect(() => {
        // Fetch company-specific data using userId
        const fetchRawMaterialData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/company/${userId}/add-raw-material`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("Data: ", data);
                console.log("Raw Material Data: ", data.rawMaterialData);

                if (response.ok) {
                    setRawMaterialData(data.rawMaterialData); // Adjust key as per your API
                } else {
                    setError(data.message || 'Failed to fetch raw material data');
                }
            } catch (error) {
                setError('Error fetching electricity data');
                console.error('Error fetching raw material data:', error);
            }
        };

        fetchRawMaterialData();
    }, [userId, token]);

    const handleLogout = () => {
        // Clear the token and any other user data from local storage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    };

    // Render company-specific dashboard data
    return (
        <div className="flex h-screen bg-gray-100 ">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-emerald-600">Raw Material Provider Dashboard</h2>
                </div>
                <nav className="mt-10">
                    <ul>
                        {/* <li>
                            <NavLink
                                to={`/raw-material-dashboard/${userId}/add`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add Raw Material Data
                            </NavLink>
                        </li> */}

                    </ul>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 p-8">
                {/* Profile and Content Area */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-700">Dashboard Overview</h1>
                    <button
                        onClick={handleLogout}
                        className='mt-4 py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200'
                    >
                        Logout
                    </button>
                    <div className="flex items-center space-x-4">
                        <FaUserCircle className="text-3xl text-gray-500" />
                        <span className="text-lg text-gray-700">RawMaterialProvider Profile</span>
                    </div>
                </div>
                {/* Raw Material Data Section */}
                <div className="p-6">
                    <h2 className="text-2xl font-semibold mb-4">Raw Material Supplier Dashboard</h2>
                    {error && <p className="text-red-500">{error}</p>}
                    <ul className="list-none ml-5">
                        {rawMaterialData.map((data) => (
                            <li key={data._id} className="mb-2">
                                <p>Date: {new Date(data.date).toLocaleDateString()}</p>
                                <p>Materials: {data.rawMaterialData.material} </p>
                                <p>
                                    Raw Material Bill:{' '}
                                    <a
                                        // href={`https://ipfs.io/ipfs/${data.electricityBill}`}  
                                        href={`https://gateway.pinata.cloud/ipfs/${data.rawMaterialBill}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline"
                                    >
                                        View Bill
                                    </a>
                                </p>
                                <img className='w-[300px] h-auto'
                                    // src={`https://ipfs.io/ipfs/${data.electricityBill}`}
                                    href={`https://gateway.pinata.cloud/ipfs/${data.rawMaterialBill}`}
                                // src="/public/bill.png"
                                ></img>
                                {/* <button
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
                              </button> */}

                            </li>
                        ))}
                    </ul>
                </div>
                {/* Outlet to render content based on selected sidebar option */}
                <Outlet />
            </div>
        </div>
    );
};

export default RawMaterialDashboard;