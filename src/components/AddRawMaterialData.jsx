import React, { useState } from 'react';
import DragDropFileUpload from '../components/UI/DragDropFileUpload';
import { useParams } from 'react-router-dom';
const AddRawMaterialData = () => {
    const { userId } = useParams();
    console.log("raw-userId", userId);
    const [formData, setFormData] = useState({
        date: "",
        material: [{ materialType: "", quantitySupplied: "" }],
        rawMaterialBill: null
    });
    const [file, setFile] = useState(null);
    const [fileURL, setFileURL] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        console.log("File Selected");

        setFile(e.target.files[0]);
    };

    const apiKey = process.env.REACT_APP_PINATA_API_KEY;
    const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;

    // Upload file to Pinata
    const uploadToPinata = async (file) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const formData = new FormData();
        formData.append("file", file);

        const metadata = JSON.stringify({
            name: file.name,
            keyvalues: {
                description: "Raw Material Bill File"
            }
        });
        formData.append("pinataMetadata", metadata);

        const options = JSON.stringify({
            cidVersion: 1
        });
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
            console.log(data);
            const fileURL = 'https://gateway.pinata.cloud/ipfs/' + data.IpfsHash;
            setFileURL(fileURL);
            console.log(fileURL);
            return data.IpfsHash;

        } catch (error) {
            console.error("Error uploading file to Pinata:", error);
            throw error;
        }
    };

    console.log(formData);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // Upload file to Pinata and get the IPFS hash
            const billHash = await uploadToPinata(file);
            console.log(billHash);

            // Add the IPFS hash to formData and send it to the blockchain
            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-raw-material`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify({ ...formData, rawMaterial: billHash })
            });

            const data = await response.json();
            console.log("Data:", data)
            console.log(data);
            if (response.ok) {

                setSuccessMessage('Raw Material Data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    date: "",
                    material: [{ materialType: "", quantitySupplied: "" }],
                    rawMaterialBill: ""
                });
                setFile(null);
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add raw material data.');
            }
        } catch (err) {
            console.error('Error submitting data:', err); // This will help you identify the issue
            setError('Error submitting data, please try again.');
        }
    };

    const handleMaterialChange = (index, key, value) => {
        const updatedMaterials = [...formData.material];
        updatedMaterials[index][key] = value;
        setFormData({ ...formData, material: updatedMaterials });
    };

    const addMaterialField = () => {
        setFormData({
            ...formData,
            material: [...formData.material, { materialType: "", quantitySupplied: "" }]
        });
    };

    const removeMaterialField = (index) => {
        const updatedMaterials = formData.materials.filter((_, i) => i !== index);
        setFormData({ ...formData, materials: updatedMaterials });
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Raw Material Data</h2>
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
                    <label className="block text-gray-600">Material Details</label>
                    {formData.material.map((item, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    name={`materialType-${index}`}
                                    value={item.materialType}
                                    onChange={(e) =>
                                        handleMaterialChange(index, "materialType", e.target.value)
                                    }
                                    placeholder="Material Type (e.g., Limestone)"
                                    required
                                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                                />
                                <input
                                    type="number"
                                    name={`quantitySupplied-${index}`}
                                    value={item.quantitySupplied}
                                    onChange={(e) =>
                                        handleMaterialChange(index, "quantitySupplied", e.target.value)
                                    }
                                    placeholder="Quantity Supplied (in metric tons)"
                                    required
                                    className="w-1/2 p-3 border border-gray-300 rounded-md"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addMaterialField}
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Add Another Material
                    </button>
                </div>
                <div>
                    <label className="block text-gray-600">Raw Material Bill</label>
                    <input
                        type="file"
                        name="rawMaterialBill"
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <DragDropFileUpload />
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

export default AddRawMaterialData;
