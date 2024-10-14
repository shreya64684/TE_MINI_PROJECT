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
            


        </div>


    )
}

export default About
