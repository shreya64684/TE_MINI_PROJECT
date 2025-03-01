import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const AddFuelData = () => {
    const { userId } = useParams();


    const [formData, setFormData] = useState({
        date: "",
        fuel: [{ fuelType: "", quantitySupplied: "", lowerHeatingValue: "", carbonContent: "" }],
        fuelBill: null
    });
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        console.log("File Selected");
        setFile(e.target.files[0]);
    };

    const apiKey = process.env.REACT_APP_PINATA_API_KEY;
    const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;

    const uploadToPinata = async (file) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const formData = new FormData();
        formData.append("file", file);

        const metadata = JSON.stringify({
            name: file.name,
            keyvalues: { description: "Fuel Bill File" }
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({ cidVersion: 1 });
        formData.append("pinataOptions", options);
        console.log(formData);

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    pinata_api_key: apiKey,
                    pinata_secret_api_key: apiSecret,
                }
            });
            if (!res.ok) {
                throw new Error('Failed to upload file to Pinata');
            }

            const data = await res.json();

            const fileURL = 'https://gateway.pinata.cloud/ipfs/' + data.IpfsHash;
            setFileURL(fileURL);
            return data.IpfsHash;
        } catch (error) {
            console.error("Error uploading file to Pinata:", error);
            throw error;
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const billHash = await uploadToPinata(file);
            console.log("billHash in submit: ", billHash);

            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-fuel-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ ...formData, fuelBill: billHash })
            });

            const data = await response.json();
            console.log("Fuel data in submit", data);
            if (response.ok) {
                setSuccessMessage('Fuel Data successfully added.');
                setErrorMessage('');
                setFormData({
                    date: "",
                    fuel: [{ fuelType: "", quantitySupplied: "", lowerHeatingValue: "", carbonContent: "" }],
                    fuelBill: ""
                });
                setFile(null);
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add fuel data.');
            }
        } catch (err) {
            console.error('Error submitting data:', err);
            setError('Error submitting data, please try again.');
        }
    };

    const handleFuelChange = (index, key, value) => {
        const updatedFuel = [...formData.fuel];
        updatedFuel[index][key] = value;
        setFormData({ ...formData, fuel: updatedFuel });
    };

    const addFuelField = () => {
        setFormData({
            ...formData,
            fuel: [...formData.fuel, { fuelType: "", quantitySupplied: "", lowerHeatingValue: "", carbonContent: "" }]
        });
    };

    console.log("fuel form data: ", formData);

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Fuel Data</h2>
            {successMessage && <div className="mb-4 text-green-600">{successMessage}</div>}
            {errorMessage && <div className="mb-4 text-red-600">{errorMessage}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-600">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Fuel Details</label>
                    {formData.fuel.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    value={item.fuelType}
                                    onChange={(e) => handleFuelChange(index, "fuelType", e.target.value)}
                                    placeholder="Fuel Type (e.g., Coal)"
                                    required
                                    className="w-1/4 p-3 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    value={item.quantitySupplied}
                                    onChange={(e) => handleFuelChange(index, "quantitySupplied", e.target.value)}
                                    placeholder="Quantity Supplied (in metric tons)"
                                    required
                                    className="w-1/4 p-3 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    value={item.lowerHeatingValue}
                                    onChange={(e) => handleFuelChange(index, "lowerHeatingValue", e.target.value)}
                                    placeholder="Lower Heating Value (MJ/kg)"
                                    className="w-1/4 p-3 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    value={item.carbonContent}
                                    onChange={(e) => handleFuelChange(index, "carbonContent", e.target.value)}
                                    placeholder="Carbon Content (kg/unit)"
                                    className="w-1/4 p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addFuelField}
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Another Fuel Type
                    </button>
                </div>
                <div>
                    <label className="block text-gray-600">Fuel Bill</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                    Submit Data
                </button>
            </form>
        </div>
    );
};

export default AddFuelData;
