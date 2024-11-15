import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CompanySelection = () => {
    const [companies, setCompanies] = useState([]);  // Store the list of companies
    const [selectedCompanyId, setSelectedCompanyId] = useState('');  // Store the selected company's ID
    const navigate = useNavigate();
    const [error, setError] = useState('');

    // Fetch companies when the component loads
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/user/all-users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    const companyUsers = data.filter(user => user.role === 'Company');
                    console.log(companyUsers);
                    setCompanies(companyUsers);
                } else {
                    throw new Error('Failed to fetch companies');
                }
            } catch (err) {
                console.error('Error fetching companies:', err);
                setError('Error fetching companies');
            }
        };

        fetchCompanies();
    }, []);

    console.log(companies);
    // Handle the company selection and navigate to the dashboard
    const handleCompanySelect = () => {
        if (!selectedCompanyId) {
            setError('Please select a company.');
            return;
        }

        // Navigate to the dashboard, passing the selected company's ID
        navigate(`/company-dashboard/${selectedCompanyId}`);
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md min-h-screen flex justfy-center items-center flex-col mt-[200px]">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Select a Company</h2>
            <div className="mb-4">
                <label className="block text-gray-600">Choose a Company</label>
                <select
                    value={selectedCompanyId}
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                >
                    <option value="">-- Select a Company --</option>
                    {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.username} {/* Display the company name */}
                        </option>
                    ))}
                </select>
            </div>
            <button
                onClick={handleCompanySelect}
                className="w-fixed px-3 py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
                Continue to Dashboard
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CompanySelection;
