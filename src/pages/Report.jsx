import React from 'react'
import ScoreCard from '../components/ScoreCard';
import GaugeMeter from '../components/UI/GaugeMeter';
import ScoreCard from '../components/ScoreCard';
import GaugeMeter from '../components/UI/GaugeMeter';

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
      <div className="bg-gray-100  flex justify-center py-10">
        <div className="bg-white shadow-lg rounded-lg border border-gray-300 max-w-5xl w-full p-8">
          <header className="text-center border-b border-gray-300 pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-700">Carbon Footprint Report</h1>
            <p className="text-sm text-gray-500">Generated from IPFS Data</p>
          </header>

          {/* {data ? (
          <div className="grid gap-6">
            <ScoreCard title="Total Emissions" value={data.totalEmissions} unit="kg CO₂" />
            <PercentageCard title="Renewable Energy Use" value={data.renewableEnergy} />
            <RangeCard title="Carbon Efficiency" value={data.efficiency} min={0} max={100} />
            <YesNoCard title="Compliance Met" value={data.complianceMet} />
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading data...</p>
        )} */}

          <h1 class="text-3xl font-semibold text-green-700 mb-6">Report Overview</h1>

          {/* Score Cards */}
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 class="text-xl font-semibold text-green-700">Scope 1</h2>
              <p class="text-4xl font-bold text-green-800">75%</p>
              <p class="text-sm text-gray-500">Description of Metric 1</p>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 class="text-xl font-semibold text-green-700">Scope 2</h2>
              <p class="text-4xl font-bold text-green-800">120</p>
              <p class="text-sm text-gray-500">Description of Metric 2</p>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 class="text-xl font-semibold text-green-700">Scope 3</h2>
              <p class="text-4xl font-bold text-green-800">50%</p>
              <p class="text-sm text-gray-500">Description of Metric 3</p>
            </div>
          </div>

          </div>
          </div>
      
      <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-center text-emerald-600 mb-6">
                    Company Carbon Footprint Report
                </h1>

                {/* Section: Electricity */}
                <section className="mb-8">
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
                </section>

                {/* Repeat similar sections for Fuel, Raw Material, Waste, and Goods */}
                {[fuel, rawMaterial, waste, goods].map((category, idx) => (
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
                ))}

                {/* Total CO₂ Emitted */}
                <div className="mt-10 bg-emerald-100 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-center text-emerald-700 mb-4">Total CO₂ Emissions</h2>
                    <p className="text-xl font-semibold text-gray-800 text-center">
                        Total CO₂ Emitted by Company:{" "}
                        <span className="text-emerald-700">{totalCO2} kg</span>
                    </p>
                </div>
            </div>
        </div>
      
      </div>
  )
}

export default Report