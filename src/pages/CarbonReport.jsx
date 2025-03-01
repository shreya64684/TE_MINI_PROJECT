import { React, useEffect, useState } from 'react'
import ScoreCard from '../components/ScoreCard';
import GaugeMeter from '../components/UI/GaugeMeter';
import { useParams } from 'react-router-dom';

const CarbonReport = () => {
    // State to store CO₂ report data
    const { userId } = useParams();
    console.log(userId);
    const [reportData, setReportData] = useState(null);
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');
    // Fetch report data when component loads
    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/company/${userId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("full Data: ", data);

                if (response.ok) {
                    console.log("data: ", data);
                    setReportData(data.data); // Adjust key as per your API
                    console.log("report data: ", reportData);

                } else {
                    setError(data.message || 'Failed to fetch raw material data');
                }
            } catch (error) {
                console.error("Error fetching report data:", error);
            }
        };

        fetchReportData();
    }, [userId]); // Re-fetch if companyId changes
    console.log(reportData);
    // If data is still loading
    if (!reportData) {
        return <p className="text-center text-gray-600">Loading report data...</p>;
    }

    const sampleReportData = {
        electricity: [
            { date: "2024-11-01", consumed: 500, conversionFactor: 0.233, co2Equivalent: 116.5 },
            { date: "2024-11-02", consumed: 600, conversionFactor: 0.233, co2Equivalent: 139.8 },
        ],
        fuel: [
            { date: "2024-11-01", quantity: 200, conversionFactor: 2.7, co2Equivalent: 540 },
        ],
        rawMaterial: [
            { date: "2024-11-01", quantity: 1000, conversionFactor: 0.8, co2Equivalent: 800 },
        ],
        fuel: [
            { date: "2024-11-01", quantity: 300, conversionFactor: 0.5, co2Equivalent: 150 },
        ],
        rawMaterial: [
            { date: "2024-11-01", quantity: 400, conversionFactor: 1.2, co2Equivalent: 480 },
        ],
        totalCO2: 2226.3, // Sum of all CO₂ equivalents
    };

    const conversionFactors = {
        electricity: 0.82, // Example factor for electricity
        fuel: 2.7, // Example factor for fuel
        rawMaterial: 0.8 // Example factor for raw materials
    };

    const totalCO2 = [
        ...reportData.electricityData.map(item => item.totalElectricityConsumedMWH * conversionFactors.electricity),
        ...reportData.fuelData.flatMap(item =>
            item.fuel.map(fuelItem => fuelItem.quantitySupplied * conversionFactors.fuel)
        ),
        ...reportData.rawMaterialData.flatMap(item =>
            item.material.map(materialItem => materialItem.quantitySupplied * conversionFactors.rawMaterial)
        )
    ].reduce((acc, val) => acc + val, 0); // Sum all CO₂ equivalents

    // Destructure data from props
    // const { electricity, fuel, rawMaterial, waste, goods, totalCO2 } = sampleReportData;
    return (
        <div className="font-sans">


            <div className="p-6 bg-gradient-to-b from-green-50 to-blue-50 min-h-screen mt-[60px]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-emerald-800 tracking-tight">Carbon Footprint Report <span className="text-emerald-600">📊</span></h1>

                    <div className="flex flex-wrap gap-2">
                        <button className="px-4 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-lg transition-colors duration-200 font-medium text-sm shadow-sm">
                            Refresh
                        </button>
                        <button className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 font-medium text-sm shadow-sm">
                            Filter
                        </button>
                        <button className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 font-medium text-sm">
                            Import Document
                        </button>
                    </div>
                </div>

                <div className="flex justify-center items-center h-[40vh] bg-transparent  mt-[80px] mb-8">
                    <div className="p-8 bg-white shadow-lg rounded-xl border border-gray-100 transition-all duration-300 hover:shadow-xl bg-gradient-to-br from-white to-blue-50 w-full max-w-md">
                        <h2 className="text-2xl font-bold text-center mb-4 text-emerald-700 tracking-tight">
                            Carbon Credit Score
                        </h2>
                        <GaugeMeter percentage={81} />
                        <p className="text-center mt-4 text-gray-600 font-medium">Your carbon footprint is <span className="text-emerald-600 font-bold">19% lower</span> than industry average</p>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[80px] mb-8">
                    <ScoreCard title="Electricity" value="10,428 MWH" percentage="1.5" increase={true} icon="⚡" />
                    <ScoreCard title="Fuel Consumption" value="1,439.83" percentage="5.5" increase={false} icon="🔥" />
                    <ScoreCard title="Raw Material" value="10,837KG" percentage="0.6" increase={true} icon="🏭" />
                    <ScoreCard title="Goods" value="259" percentage="5.8" increase={true} icon="📦" />
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white p-6 mt-2 rounded-xl shadow-lg border border-gray-100 bg-gradient-to-br from-white to-green-50 transition-all duration-300 hover:shadow-xl">
                    <h2 className="text-2xl font-bold text-emerald-800 mb-6 tracking-tight">Consumption Data <span className="text-emerald-600">📑</span></h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-emerald-100 text-emerald-800">
                                    <th className="p-4 text-left font-semibold rounded-tl-lg">Date</th>
                                    <th className="p-4 text-left font-semibold">Value</th>
                                    <th className="p-4 text-left font-semibold">Category</th>
                                    <th className="p-4 text-left font-semibold">Conversion Factor</th>
                                    <th className="p-4 text-left font-semibold rounded-tr-lg">CO₂ Equivalent (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ...reportData.electricityData.map(item => ({
                                        date: new Date(item.date).toISOString().split("T")[0], // Format Date
                                        quantity: item.totalElectricityConsumedMWH,
                                        category: "Electricity",
                                        conversionFactor: conversionFactors.electricity,
                                        co2Equivalent: (item.totalElectricityConsumedMWH * conversionFactors.electricity).toFixed(2)
                                    })),
                                    // Fuel Data (Looping through the 'fuel' array inside fuelData)
                                    ...reportData.fuelData.flatMap(item =>
                                        item.fuel.map(fuelItem => ({
                                            date: new Date(item.date).toISOString().split("T")[0],
                                            quantity: fuelItem.quantitySupplied,
                                            category: "Fuel",
                                            conversionFactor: conversionFactors.fuel,
                                            co2Equivalent: (fuelItem.quantitySupplied * conversionFactors.fuel).toFixed(2)
                                        }))
                                    ),
                                    // Raw Material Data (Looping through the 'material' array inside rawMaterialData)
                                    ...reportData.rawMaterialData.flatMap(item =>
                                        item.material.map(materialItem => ({
                                            date: new Date(item.date).toISOString().split("T")[0],
                                            quantity: materialItem.quantitySupplied,
                                            category: "Raw Material",
                                            conversionFactor: conversionFactors.rawMaterial,
                                            co2Equivalent: (materialItem.quantitySupplied * conversionFactors.rawMaterial).toFixed(2)
                                        }))
                                    )    
                                ].map((item, index) => (
                                            <tr key={index} className={`border-b border-emerald-100 hover:bg-emerald-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-green-50'}`}>
                                                <td className="p-4 font-medium">{item.date}</td>
                                                <td className="p-4">{item.quantity}</td>
                                                <td className="p-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                                                ${item.category === "Electricity" ? "bg-blue-100 text-blue-700" :
                                                            item.category === "Fuel" ? "bg-orange-100 text-orange-700" :

                                                                "bg-teal-100 text-teal-700"}`}>
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="p-4">{item.conversionFactor}</td>
                                                <td className="p-4 font-medium text-gray-900">{item.co2Equivalent} kg</td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 text-center">
                        <p className="text-emerald-700 font-medium">Total CO₂ Emissions: <span className="text-2xl font-bold text-emerald-800">{totalCO2.toFixed(2)} kg</span></p>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default CarbonReport