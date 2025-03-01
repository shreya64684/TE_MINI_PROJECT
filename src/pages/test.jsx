import React, { useState } from 'react';
import { FaUserCircle, FaLeaf, FaChartLine, FaFileInvoice, FaHistory, FaSignOutAlt, FaClipboardCheck } from 'react-icons/fa';
// import { TbCo2 } from 'react-icons/tb';
import { MdElectricBolt, MdDashboard } from 'react-icons/md';

const ElectricitySupplierDashboard = ({ electricityData, handleVerify, handleAccept, handleReject, handleLogout, error, successMessage, errorMessage }) => {
  const [remark, setRemark] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl rounded-r-xl">
        <div className="px-6 py-8 border-b border-gray-100">
          <div className="flex items-center gap-3">
            {/* <TbCo2 className="text-3xl text-emerald-600" /> */}
            <h2 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Carbon Manager</h2>
          </div>
          <p className="mt-2 text-xs text-gray-500">Smart Energy Dashboard</p>
        </div>
        
        <nav className="mt-10 px-4">
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === 'overview' 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MdDashboard className={activeTab === 'overview' ? 'text-emerald-600' : 'text-gray-400'} />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('consumption')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === 'consumption' 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MdElectricBolt className={activeTab === 'consumption' ? 'text-emerald-600' : 'text-gray-400'} />
                <span>Consumption</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === 'reports' 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaChartLine className={activeTab === 'reports' ? 'text-emerald-600' : 'text-gray-400'} />
                <span>Reports</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('invoices')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === 'invoices' 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaFileInvoice className={activeTab === 'invoices' ? 'text-emerald-600' : 'text-gray-400'} />
                <span>Invoices</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left ${
                  activeTab === 'history' 
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <FaHistory className={activeTab === 'history' ? 'text-emerald-600' : 'text-gray-400'} />
                <span>History</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="px-6 py-4 mt-auto border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors duration-200"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex justify-between items-center py-4 px-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              {activeTab === 'overview' && 'Dashboard Overview'}
              {activeTab === 'consumption' && 'Energy Consumption'}
              {activeTab === 'reports' && 'Carbon Reports'}
              {activeTab === 'invoices' && 'Electricity Invoices'}
              {activeTab === 'history' && 'Transaction History'}
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <FaLeaf className="text-emerald-500" />
                <span>Eco-Supplier</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center text-white">
                  <FaUserCircle className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">Energy Provider</span>
                  <span className="text-xs text-gray-500">Admin Access</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Total Consumption</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0).toFixed(2)} MWH
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <MdElectricBolt className="text-xl text-emerald-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <span className="flex items-center text-emerald-500">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" />
                  </svg>
                  3.2%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Carbon Offset</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {(electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0) * 0.42).toFixed(2)} tons
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  {/* <TbCo2 className="text-xl text-emerald-500" /> */}
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <span className="flex items-center text-emerald-500">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" />
                  </svg>
                  2.8%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Verified Entries</p>
                  <p className="text-2xl font-bold text-gray-800 mt-1">
                    {electricityData.filter(data => data.verified).length} / {electricityData.length}
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg">
                  <FaClipboardCheck className="text-xl text-emerald-500" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <span className="flex items-center text-emerald-500">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12 7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3V7z" clipRule="evenodd" />
                  </svg>
                  4.1%
                </span>
                <span className="text-gray-500 ml-2">completion rate</span>
              </div>
            </div>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md text-green-700">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md text-red-700">
              {errorMessage}
            </div>
          )}

          {/* Electricity Data */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Electricity Consumption Records</h2>
              <p className="text-sm text-gray-500 mt-1">Verify and manage electricity consumption data</p>
            </div>
            
            <div className="overflow-x-auto">
              {electricityData.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  {/* <TbCo2 className="text-5xl mx-auto mb-3 text-gray-300" /> */}
                  <p>No electricity data available</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 divide-y divide-gray-100">
                  {electricityData.map((data) => (
                    <div key={data._id} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center mb-3">
                            <div className="bg-emerald-100 text-emerald-700 rounded-md px-2 py-1 text-xs font-medium">
                              {new Date(data.date).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            {data.verified && (
                              <div className="ml-2 bg-blue-100 text-blue-700 rounded-md px-2 py-1 text-xs font-medium">
                                Verified
                              </div>
                            )}
                            {data.accepted && (
                              <div className="ml-2 bg-green-100 text-green-700 rounded-md px-2 py-1 text-xs font-medium">
                                Accepted
                              </div>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Consumption Details</h3>
                              <p className="flex items-center mt-1 text-gray-800">
                                <MdElectricBolt className="mr-1 text-emerald-500" />
                                <span className="font-semibold">{data.totalElectricityConsumedMWH} MWH</span>
                              </p>
                              <p className="flex items-center mt-1 text-gray-800">
                                {/* <TbCo2 className="mr-1 text-emerald-500" /> */}
                                <span className="font-semibold">{(data.totalElectricityConsumedMWH * 0.42).toFixed(2)} tons CO₂e</span>
                              </p>
                            </div>
                            
                            <div>
                              <h3 className="text-sm font-medium text-gray-500">Electricity Bill</h3>
                              <a
                                href={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center mt-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
                              >
                                <FaFileInvoice className="mr-1" />
                                View Bill
                              </a>
                              <p className="text-xs text-gray-500 mt-1">Transaction ID: {data._id.substring(0, 8)}...</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="shrink-0 w-full md:w-auto md:ml-4">
                          <div className="max-w-md">
                            <img 
                              className="w-full h-auto max-h-40 object-contain rounded-lg border border-gray-200"
                              src={`https://gateway.pinata.cloud/ipfs/${data.electricityBill}`}
                              alt="Electricity Bill"
                            />
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-2 mt-4">
                            <button
                              onClick={() => handleVerify(data)}
                              disabled={data.verified && data.accepted}
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                data.verified 
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700'
                              }`}
                            >
                              {data.verified ? 'Verified' : 'Verify'}
                            </button>
                            
                            <button
                              onClick={() => handleAccept(data)}
                              disabled={!data.verified || data.accepted}
                              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                !data.verified || data.accepted
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700'
                              }`}
                            >
                              {data.accepted ? 'Accepted' : 'Accept'}
                            </button>
                            
                            <div className="flex items-center gap-2 mt-2 w-full">
                              <textarea
                                placeholder="Enter rejection remark..."
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                rows="1"
                              />
                              <button 
                                onClick={() => handleReject(data, remark)}
                                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                              >
                                Reject
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Additional Data */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Footprint Analysis</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Consumption</p>
                  <p className="text-sm font-medium" id="electricity-consumption">
                    {electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0).toFixed(2)} MWH
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">CO₂ Equivalent</p>
                  <p className="text-sm font-medium" id="co2-equivalent">
                    {(electricityData.reduce((sum, data) => sum + parseFloat(data.totalElectricityConsumedMWH || 0), 0) * 0.42).toFixed(2)} tons
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-600">Transaction Hash</p>
                  <p className="text-sm font-medium text-gray-400" id="transaction-hash">
                    {electricityData[0]?._id || '--'}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Status</h3>
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                      />
                      <path
                        d="M18 2.0845
                          a 15.9155 15.9155 0 0 1 0 31.831
                          a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="3"
                        strokeDasharray={`${(electricityData.filter(data => data.verified).length / electricityData.length) * 100}, 100`}
                      />
                    </svg>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                      <div className="text-3xl font-bold text-gray-800">
                        {Math.round((electricityData.filter(data => data.verified).length / electricityData.length) * 100)}%
                      </div>
                      <div className="text-xs text-gray-500">Verified</div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-gray-600 text-center">
                    {electricityData.filter(data => data.verified).length} out of {electricityData.length} records verified
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ElectricitySupplierDashboard;