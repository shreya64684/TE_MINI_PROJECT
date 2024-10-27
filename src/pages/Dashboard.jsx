import React from 'react'
import Dashnavbar from '../components/Dashnavbar'

const Dashboard = () => {

  return (
    <div>
      <Dashnavbar />
      <h1 class="text-4xl font-bold text-center pb-10"><span class="text-green-300">Scope</span> Emissions</h1>
      <div className='justify-center items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 m-auto'>
        <div className="bg-green-100 dark:text-green-600 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-2xl text-green-600">Scope 1 Emission</p>
              <p className="text-2xl">63,448.78 tons</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9 text-green-300 bg-white hover:drop-shadow-xl rounded-xl  p-4"
            >
              CO2
            </button>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="text-1xl bg-green-500 opacity-0.9 rounded-2xl text-white p-2"
            >
              Learn More
            </button>
          </div>

        </div>
        <div className="bg-green-100 dark:text-green-600 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-2xl text-green-600">Scope 2 Emission</p>
              <p className="text-2xl">63,448.78 tons</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9 text-green-300 bg-white hover:drop-shadow-xl rounded-xl  p-4"
            >
              CO2
            </button>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="text-1xl bg-green-500 opacity-0.9 rounded-2xl text-white p-2"
            >
              Learn More
            </button>
          </div>

        </div>
        <div className="bg-green-100 dark:text-green-600 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-2xl text-green-600">Scope 3 Emission</p>
              <p className="text-2xl">63,448.78 tons</p>
            </div>
            <button
              type="button"
              className="text-2xl opacity-0.9 text-green-300 bg-white hover:drop-shadow-xl rounded-xl  p-4"
            >
              CO2
            </button>
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="text-1xl bg-green-500 opacity-0.9 rounded-2xl text-white p-2"
            >
              Learn More
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
