import React, { useState } from "react";
import { ChevronRight, ChevronDown, Search, Book, LogOut, Settings } from "lucide-react";
import { NavLink, Outlet } from 'react-router-dom';
import { FaPlus, FaUserCircle, FaCog, FaBell, FaIndustry } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const menuItems = [
  { title: "Add Electricity Data", subItems: ["Data Fetching"], form: "add-electricity" },
  { title: "Add Raw Material Data", subItems: ["Data Fetching"], form: "add-raw-material" },
  { title: "Add Fuel Data", subItems: ["Data Fetching"], form: "add-fuel" },
  { title: "Add Goods & Logistics Data", subItems: ["Data Fetching"], form: "add-goods" },
  { title: "Add Waste Data", subItems: ["Data Fetching"], form: "add-raw-material" },
  { title: "Verification Status", subItems: ["Data Fetching"], form: "verification-status" },
];

const DocumentationSidebar = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [openSections, setOpenSections] = useState({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleSection = (title) => {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {
    // Clear the token and any other user data from local storage
    localStorage.removeItem('token');
    // Redirect to the home page
    navigate('/');
  };

  return (
    <div className="fixed top-3 left-3 h-[100vh] flex bg-green-100 text-black shadow-lg rounded-2xl p-4 border ">
      {/* Sidebar */}
      <aside className="w-64 p-4 border-r border-gray-300 flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="flex items-center space-x-2 text-lg font-semibold">
            <Book className="text-gray-700" />
            <span>Company Dashboard</span>
          </div>

          {/* Menu */}
          <nav className="mt-6 space-y-2">
            {menuItems.map(({ title, form }) => (
              <NavLink
                key={title}
                to={`/company-dashboard/${userId}/${form}`}
                className={({ isActive }) =>
                  isActive
                    ? "flex justify-between items-center w-full px-3 py-2 rounded-lg bg-green-600 text-white"
                    : "flex justify-between items-center w-full px-3 py-2 rounded-lg hover:bg-gray-800 hover:text-white"
                }
              >
                {title}
                <FaPlus className="ml-3 text-gray-600" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-800 hover:text-white"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <FaUserCircle className="text-gray-700 w-8 h-8 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium">Company Profile</p>
              <p className="text-xs text-gray-500">mycompany@gmail.com</p>
            </div>
            <ChevronDown className="ml-auto text-gray-500 w-4 h-4" />
          </button>

          {isProfileOpen && (
            <div className="absolute bottom-12 w-full bg-white shadow-lg rounded-lg border border-gray-200">
              <div className="p-3">
                <div className="flex items-center space-x-2">
                  <FaUserCircle className="text-gray-700 w-8 h-8" />
                  <div>
                    <p className="text-sm font-medium">Company Profile</p>
                    <p className="text-xs text-gray-500">mycompany@gmail.com</p>
                  </div>
                </div>
              </div>
              <hr />
              <button className="flex items-center w-full p-3 rounded-lg  hover:bg-gray-100">
                <FaCog className="w-5 h-5 mr-2" /> Account
              </button>
              <button className="flex items-center w-full p-3 rounded-lg  hover:bg-gray-100">
                <FaBell className="w-5 h-5 mr-2" /> Notifications
              </button>
              <button onClick={handleLogout}
                className="flex items-center w-full p-3 rounded-lg  text-red-600 hover:bg-gray-800 hover:text-white">
                <LogOut className="w-5 h-5 mr-2" /> Log out
              </button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default DocumentationSidebar;