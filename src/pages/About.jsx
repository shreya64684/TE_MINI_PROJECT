import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen my-20'>

      <h1 class="mb-4 text-4xl text-center font-extrabold leading-none tracking-tight text-green-900 md:text-5xl lg:text-6xl dark:text-white mt-2">Leading the Path to Transparent Carbon Management.</h1>
      <p class="mb-6 text-lg font-normal text-center text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Empowering businesses to track, verify, and reduce their carbon footprint securely and transparently</p>

      <section class="bg-gradient-to-r from-green-300 to-green-50 py-16">
        <div class="max-w-2xl mx-auto text-center px-4">
          <h2 class="text-3xl font-bold text-teal-700 text-center">
            Our Mission: Addressing the Challenges in Carbon Management
          </h2>
          <p class="text-lg text-gray-600 mt-4">
            Our goal is to transform the carbon management landscape by utilizing blockchain technology
            to ensure data integrity and foster corporate accountability in reducing emissions.
          </p>
        </div>
        <div class="flex flex-wrap justify-center gap-6 mt-8">
          <div class="bg-white shadow-md p-6 rounded-lg max-w-xs text-center">
            <h3 class="text-xl font-semibold text-teal-700">Transparency</h3>
            <p class="text-gray-600 mt-2">Ensuring openness in carbon management practices.</p>
          </div>
          <div class="bg-white shadow-md p-6 rounded-lg max-w-xs text-center">
            <h3 class="text-xl font-semibold text-teal-700">Security</h3>
            <p class="text-gray-600 mt-2">Protecting data integrity through blockchain.</p>
          </div>
          <div class="bg-white shadow-md p-6 rounded-lg max-w-xs text-center">
            <h3 class="text-xl font-semibold text-teal-700">Accountability</h3>
            <p class="text-gray-600 mt-2">Encouraging responsible carbon practices.</p>
          </div>
        </div>
      </section>


      <h2 class="text-3xl font-bold text-teal-700 text-center my-5">
      Bridging the Gaps in Current Carbon Management Practices
          </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-5">

        <div class="bg-gray-100 rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-blue-200 p-3 rounded-full">
              <img src="transparency-icon.svg" alt="Transparency Icon" class="w-6 h-6"/>
            </div>
            <h3 class="ml-4 font-semibold text-xl">Lack of Transparency</h3>
          </div>
          <p class="text-gray-700 mt-2 text-sm">Current systems lack clarity on how emissions data is processed and stored, making it difficult for stakeholders to trust reported figures.</p>
        </div>

        <div class="bg-gray-100 rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-green-200 p-3 rounded-full">
              <img src="security-icon.svg" alt="Data Security Icon" class="w-6 h-6"/>
            </div>
            <h3 class="ml-4 font-semibold text-xl">Data Security Concerns</h3>
          </div>
          <p class="text-gray-700 mt-2 text-sm">Data in traditional systems can be manipulated or accidentally tampered with, posing risks for accurate carbon management.</p>
        </div>

        <div class="bg-gray-100 rounded-lg shadow-lg p-6">
          <div class="flex items-center">
            <div class="bg-green-200 p-3 rounded-full">
              <img src="security-icon.svg" alt="Data Security Icon" class="w-6 h-6"/>
            </div>
            <h3 class="ml-4 font-semibold text-xl">Absence of Verification</h3>
          </div>
          <p class="text-gray-700 mt-2 text-sm">Data in traditional systems can be manipulated or accidentally tampered with, posing risks for accurate carbon management.</p>
        </div>


      </div>



    </div>


  )
}

export default About
