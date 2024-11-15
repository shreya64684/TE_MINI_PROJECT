import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { create } from 'ipfs-http-client';
import { initializeWeb3, getContractInstance } from '../utils/web3Setup';
const ipfs = create({
    url: 'https://ipfs.infura.io:5001/api/v0',
    headers: {
        authorization: `Basic ${Buffer.from(`${process.env.INFURA_KEY}:`).toString('base64')}`
    }
});
const AddElectricity = () => {
    const { userId } = useParams();
    console.log(userId);
    const [formData, setFormData] = useState({
        date: '',
        totalElectricityConsumedMWH: '',
        electricityBillHash: ''
    });
    const [file, setFile] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Handle file selection
    const handleFileChange = (e) => {
        console.log("File Selected");
        
        setFile(e.target.files[0]);
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const addElectricityDataToBlockchain = async () => {
        try {
            const { web3, contract } = await initializeWeb3();
            const accounts = await web3.eth.getAccounts();
            
            await contract.methods
                .addElectricityData(
                    formData.date,
                    formData.totalElectricityConsumedMWH,
                    formData.electricityBillHash
                )
                .send({ from: accounts[0] });

            setSuccessMessage('Electricity data successfully added to blockchain!');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('Failed to add data to blockchain.');
            console.error(error);
        }
    };
    const apiKey = process.env.REACT_APP_PINATA_API_KEY;
    const apiSecret = process.env.REACT_APP_PINATA_API_SECRET;
    console.log("Pinata API Key:", apiKey);
    console.log("Pinata API Secret:", apiSecret);

    // Upload file to Pinata
    const uploadToPinata = async (file) => {
        const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
        const formData = new FormData();
        formData.append("file", file);

        const metadata = JSON.stringify({
            name: file.name,
            keyvalues: {
                description: "Electricity Bill File"
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
            
            return data.IpfsHash;
        } catch (error) {
            console.error("Error uploading file to Pinata:", error);
            throw error;
        }
    };



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // // Upload file to IPFS and get the hash
            // const added = await ipfs.add(file);
            // console.log(added);
            
            // const billHash = added.path;
            // console.log(billHash);

            // Upload file to Pinata and get the IPFS hash
            const billHash = await uploadToPinata(file);
            console.log(billHash);

            // Add the IPFS hash to formData and send it to the blockchain

            const response = await fetch(`http://localhost:5000/api/company/${userId}/add-electricity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure JWT token is sent for authentication
                },
                body: JSON.stringify({ ...formData, electricityBillHash: billHash })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                 // Store data on blockchain
                await addElectricityDataToBlockchain(formData.date, formData.totalElectricityConsumedMWH, billHash);
                setSuccessMessage('Electricity data successfully added.');
                setErrorMessage('');
                // Reset form
                setFormData({
                    date: '',
                    totalElectricityConsumedMWH: '',
                    electricityBillHash: ''
                });
                setFile(null);
            } else {
                setSuccessMessage('');
                setErrorMessage(data.message || 'Failed to add electricity data.');
            }
        } catch (error) {
            setSuccessMessage('');
            setErrorMessage('Error submitting data, please try again.');
        }
    };

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Add Electricity Data</h2>
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
                    <label className="block text-gray-600">Total Electricity Consumed (MWH)</label>
                    <input
                        type="number"
                        name="totalElectricityConsumedMWH"
                        value={formData.totalElectricityConsumedMWH}
                        onChange={(e) => setFormData({ ...formData, totalElectricityConsumedMWH: e.target.value })}
                        required
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="e.g., 120"
                    />
                </div>
                <div>
                    <label className="block text-gray-600">Electricity Bill</label>
                    <input
                        type="file"
                        name="electricityBill"
                        value={formData.electricityBillHash}
                        onChange={handleFileChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        placeholder="Link or path to bill (optional)"
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

export default AddElectricity;
