import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaIndustry, FaTrash, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import DocumentationSidebar from '../../components/UI/DocumentationSidebar';

const CompanyDashboard = () => {
    const navigate = useNavigate();
    const { userId } = useParams(); // Get userId from URL
    const [companyData, setCompanyData] = useState(null);

    useEffect(() => {
        // Fetch company-specific data using userId
        const fetchCompanyData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/user/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await response.json();
                setCompanyData(data);
            } catch (error) {
                console.error('Error fetching company data:', error);
            }
        };

        fetchCompanyData();
    }, [userId]);

    const handleLogout = () => {
        // Clear the token and any other user data from local storage
        localStorage.removeItem('token');
        // Redirect to the home page
        navigate('/');
    };

    // Render company-specific dashboard data
    return (
        <div className="flex-1 h-full bg-gray-100 ">
            {/* Sidebar */}
            {/* <aside className="w-64 bg-white shadow-lg">
                <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-emerald-600">Company Dashboard</h2>
                </div>
                <nav className="mt-10">
                    <ul>
                        <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/add-electricity`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add Electricity Data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/add-co2-emissions`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaIndustry className="mr-3" />
                                Add Data of CO2 Emissions
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/add-raw-material`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add Raw Material Data
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/add-fuel`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add Fuel Data
                            </NavLink>
                        </li> */}
            {/* <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/add-goods`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Add Goods and Services Data
                            </NavLink>
                        </li> */}
            {/* <li>
                            <NavLink
                                to={`/company-dashboard/${userId}/verification-status`}
                                className={({ isActive }) =>
                                    isActive ? 'flex items-center px-4 py-2 bg-emerald-200' : 'flex items-center px-4 py-2 hover:bg-gray-200'
                                }
                            >
                                <FaPlus className="mr-3" />
                                Verification Status
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </aside> */}

            <DocumentationSidebar />

            {/* Main Content Area */}
            <div className="ml-72 flex-1 p-8">
                {/* Profile and Content Area */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-700">Dashboard Overview</h1>
                </div>

                {/* Outlet to render content based on selected sidebar option */}
                <Outlet />
                {/* Main Content (Form beside Sidebar) */}
                
            </div>
        </div>
    );
};

export default CompanyDashboard;