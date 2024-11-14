import React from 'react'

const Report = () => {
  return (
    <div>
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
      </div>

    </div>
  )
}

export default Report
