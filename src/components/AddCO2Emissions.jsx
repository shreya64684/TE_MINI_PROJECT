import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddCO2Emissions = () => {
    const { userId } = useParams();
    console.log('userId:', userId); 
    const [formData, setFormData] = useState({
        sourceName: '',
        emissionType: '',
        co2Amount: '',
        date: '',
        notes: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-co2-emissions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('CO2 Emission data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    sourceName: '',
                    emissionType: '',
                    co2Amount: '',
                    date: '',
                    notes: '',
                });
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add CO2 emission data.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add CO2 Emissions from Non-Kiln Sources</h2>
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Source Name</label>
                    <input
                        type="text"
                        name="sourceName"
                        value={formData.sourceName}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., Transportation, Machinery"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Emission Type</label>
                    <input
                        type="text"
                        name="emissionType"
                        value={formData.emissionType}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., Carbon Dioxide, Methane"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">CO2 Amount (tons)</label>
                    <input
                        type="number"
                        name="co2Amount"
                        value={formData.co2Amount}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., 120"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Additional Notes</label>
                    <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Optional additional notes"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition duration-200"
                >
                    Submit Data
                </button>
            </form>
        </div>
    );
};

export default AddCO2Emissions;
