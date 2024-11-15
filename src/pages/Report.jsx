import React from 'react'

const Report = () => {
  return (
    <div>
      <div className="bg-gray-100 min-h-screen flex justify-center py-10">
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
              <h2 class="text-xl font-semibold text-green-700">Metric 1</h2>
              <p class="text-4xl font-bold text-green-800">75%</p>
              <p class="text-sm text-gray-500">Description of Metric 1</p>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 class="text-xl font-semibold text-green-700">Metric 2</h2>
              <p class="text-4xl font-bold text-green-800">120</p>
              <p class="text-sm text-gray-500">Description of Metric 2</p>
            </div>

            <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
              <h2 class="text-xl font-semibold text-green-700">Metric 3</h2>
              <p class="text-4xl font-bold text-green-800">50%</p>
              <p class="text-sm text-gray-500">Description of Metric 3</p>
            </div>
          </div>

          {/* Verification status Table */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-300 my-4">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">Category</th>
                  <th className="py-3 px-6 bg-gray-200 text-left text-gray-600 font-semibold uppercase text-sm">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-6 text-gray-700 font-medium">Category 1</td>
                  <td className="py-3 px-6">
                    <span
                      className={'*:first-line:py-1 px-3 rounded-full text-sm font-semibold bg-green-100 text-green-600'}
                    >
                      Verified
                    </span>
                    <span
                      className={'py-1 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-600'}
                    >
                      Not Verified
                    </span>
                  </td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="py-3 px-6 text-gray-700 font-medium">Category 2</td>
                  <td className="py-3 px-6">
                    <span
                      className={'py-1 px-3 rounded-full text-sm font-semibold bg-green-100 text-green-600'}
                    >
                      Verified
                    </span>
                    <span
                      className={'*:first-line:py-1 px-3 rounded-full text-sm font-semibold bg-red-100 text-red-600'}
                    >
                      Not Verified
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="min-h-screen bg-green-50 p-6">
        <h1 class="text-3xl font-semibold text-green-700 mb-6">Report Overview</h1>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
            <h2 class="text-xl font-semibold text-green-700">Metric 1</h2>
            <p class="text-4xl font-bold text-green-800">75%</p>
            <p class="text-sm text-gray-500">Description of Metric 1</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
            <h2 class="text-xl font-semibold text-green-700">Metric 2</h2>
            <p class="text-4xl font-bold text-green-800">120</p>
            <p class="text-sm text-gray-500">Description of Metric 2</p>
          </div>

          <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-green-500">
            <h2 class="text-xl font-semibold text-green-700">Metric 3</h2>
            <p class="text-4xl font-bold text-green-800">50%</p>
            <p class="text-sm text-gray-500">Description of Metric 3</p>
          </div>
        </div>

        <div class="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 gap-2 py-4">
          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Card</h2>
            <p className="text-2xl text-gray-800 font-bold">47</p>
            <p className="text-sm text-gray-500">Min-Max</p>
            <div className="mt-2 bg-gray-300 rounded-full h-2 w-full">
              <div
                className="bg-blue-500 h-2 rounded-full"
              ></div>
            </div>
          </div>


          <div className="border border-gray-300 bg-green-200 rounded-lg p-4 shadow-md flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 mr-4">Yes Card</h2>
            <div
              className={'text-2xl font-bold px-4 py-2 rounded-lg bg-white text-green-600'}
            >
              47
            </div>
          </div>

          <div className="border border-gray-300 bg-red-200 rounded-lg p-4 shadow-md flex items-center">
            <h2 className="text-lg font-semibold text-gray-700 mr-4">No Card</h2>
            <div
              className={'text-2xl font-bold px-4 py-2 rounded-lg bg-white text-red-600'}
            >
              78
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4 bg-gray-50 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Card</h2>
            <p className="text-3xl text-gray-800 font-bold">47%</p>
            <div className="mt-2 bg-gray-300 rounded-full h-2 w-full">
              <div
                style={{ width: `$47%` }}
                className="bg-green-500 h-2 rounded-full"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
