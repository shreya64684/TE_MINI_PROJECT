import React from 'react'
import ScoreCard from '../components/ScoreCard';

const Report = () => {
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
        waste: [
            { date: "2024-11-01", quantity: 300, conversionFactor: 0.5, co2Equivalent: 150 },
        ],
        goods: [
            { date: "2024-11-01", quantity: 400, conversionFactor: 1.2, co2Equivalent: 480 },
        ],
        totalCO2: 2226.3, // Sum of all CO₂ equivalents
    };

    // Destructure data from props
    const { electricity, fuel, rawMaterial, waste, goods, totalCO2 } = sampleReportData;
    return (
        <div>
            {/* <div className="bg-gray-100  flex justify-center py-10">
                <div className="bg-white shadow-lg rounded-lg border border-gray-300 max-w-5xl w-full p-8">
                    <header className="text-center border-b border-gray-300 pb-4 mb-6">
                        <h1 className="text-2xl font-bold text-gray-700">Carbon Footprint Report</h1>
                        <p className="text-sm text-gray-500">Generated from IPFS Data</p>
                    </header>
                </div>
            </div> */}

            {/* <div className="bg-gray-100 min-h-screen p-6">
                <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                    <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                        Company Carbon Footprint Report
                    </h1>

                    {/* ScoreCards Section */}
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <ScoreCard title="Total Income" value="$104,284.19" percentage="15.5" increase={true} icon="💰" />
                        <ScoreCard title="Total Expenses" value="$14,391.83" percentage="8.5" increase={false} icon="💸" />
                        <ScoreCard title="Total Sales" value="10.837K" percentage="0.1" increase={true} icon="📈" />
                        <ScoreCard title="Customers" value="25,983.11" percentage="25.8" increase={true} icon="🛒" />
                    </div> */}
            {/* Section: Electricity */}
            {/* <section className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Electricity Data</h2>
                        <table className="w-full text-left border-collapse border border-gray-300">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 px-4 py-2">Date</th>
                                    <th className="border border-gray-300 px-4 py-2">Electricity Consumed (MWh)</th>
                                    <th className="border border-gray-300 px-4 py-2">Conversion Factor</th>
                                    <th className="border border-gray-300 px-4 py-2">CO₂ Equivalent (kg)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {electricity.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.consumed}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.conversionFactor}</td>
                                        <td className="border border-gray-300 px-4 py-2">{entry.co2Equivalent}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section> */}

            {/* Repeat similar sections for Fuel, Raw Material, Waste, and Goods */}
            {/* {[fuel, rawMaterial, waste, goods].map((category, idx) => (
                        <section className="mb-8" key={idx}>
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">
                                {["Fuel Data", "Raw Material Data", "Waste Data", "Goods and Supply Data"][idx]}
                            </h2>
                            <table className="w-full text-left border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                        <th className="border border-gray-300 px-4 py-2">Conversion Factor</th>
                                        <th className="border border-gray-300 px-4 py-2">CO₂ Equivalent (kg)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {category.map((entry, index) => (
                                        <tr key={index}>
                                            <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                                            <td className="border border-gray-300 px-4 py-2">{entry.quantity}</td>
                                            <td className="border border-gray-300 px-4 py-2">{entry.conversionFactor}</td>
                                            <td className="border border-gray-300 px-4 py-2">{entry.co2Equivalent}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </section>
                    ))} */}

            {/* Total CO₂ Emitted */}
            {/* <div className="mt-10 bg-emerald-100 p-6 rounded-lg">
                        <h2 className="text-2xl font-bold text-center text-emerald-700 mb-4">Total CO₂ Emissions</h2>
                        <p className="text-xl font-semibold text-gray-800 text-center">
                            Total CO₂ Emitted by Company:{" "}
                            <span className="text-emerald-700">{totalCO2} kg</span>
                        </p>
                    </div>
                </div> */}
            {/* </div> */}

            <div className="p-6 bg-gray-100 min-h-screen">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Carbon Footprint Report 📊</h1>
                    <p className="text-sm text-gray-500">Generated from IPFS Data</p>
                    <div className="flex space-x-2">
                        <button className="px-4 py-2 bg-gray-200 rounded-lg">Refresh</button>
                        <button className="px-4 py-2 bg-gray-200 rounded-lg">Filter</button>
                        <button className="px-4 py-2 bg-black text-white rounded-lg">
                            Import Document
                        </button>
                    </div>
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ScoreCard title="Electricity" value="10,428 MWH" percentage="1.5" increase={true} icon="💰" />
                    <ScoreCard title="Fuel Consumption" value="1,439.83" percentage="5.5" increase={false} icon="💸" />
                    <ScoreCard title="Raw Material" value="10,837KG" percentage="0.6" increase={true} icon="📈" />
                    <ScoreCard title="Goods" value="259" percentage="5.8" increase={true} icon="🛒" />
                </div>

                {/* Recent Activity Table */}
                <div className="bg-white p-6 mt-6 rounded-lg shadow-md">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Electricity Data 📑</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700">
                                <th className="p-3 text-left">Date</th>
                                <th className="p-3 text-left">Electricity Consumed (MWh)</th>
                                <th className="p-3 text-left">Category</th>
                                <th className="p-3 text-left">Conversion Factor</th>
                                <th className="p-3 text-left">CO₂ Equivalent (kg)</th>
                                <th className="p-3 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [
                                    { date: "2024-11-01", quantity: "500 MWh", category: "Electricity", conversionFactor: "0.233", co2Equivalent: "116.5 kg", status: "Verified" },
                                    { date: "2024-11-02", quantity: "600 MWh", category: "Electricity", conversionFactor: "0.233", co2Equivalent: "139.8 kg", status: "On Hold" },
                                    { date: "2024-11-01", quantity: "200", category: "Fuel", conversionFactor: "2.7", co2Equivalent: "540 kg", status: "Processing" },
                                    { date: "2024-11-01", quantity: "1000", category: "Raw Material", conversionFactor: "0.8", co2Equivalent: "800 kg", status: "Pending" },
                                    { date: "2024-11-01", quantity: "300", category: "Waste", conversionFactor: "0.5", co2Equivalent: "150 kg", status: "Verified" },
                                    { date: "2024-11-01", quantity: "400", category: "Goods & Supply", conversionFactor: "1.2", co2Equivalent: "480 kg", status: "Verified" },
                                ]
                                    .map((item, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="p-3">{item.date}</td>
                                            <td className="p-3">{item.quantity}</td>
                                            <td className="p-3">{item.category}</td>
                                            <td className="p-3">{item.conversionFactor}</td>
                                            <td className="p-3">{item.co2Equivalent}</td>
                                            <td className="p-3">
                                                <span
                                                    className={`px-3 py-1 rounded-full text-white text-sm ${item.status === "Verified"
                                                        ? "bg-green-500"
                                                        : item.status === "On Hold"
                                                            ? "bg-yellow-500"
                                                            : item.status === "Processing"
                                                                ? "bg-blue-500"
                                                                : "bg-orange-500"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Report
