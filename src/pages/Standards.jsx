import React from 'react'
import Card from '../components/Card'

const Standards = () => {
  return (
    <div>
      <section className='w-full my-12'>
        <div className="relative w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
          <a href="#">
            <img className="w-full" src="https://www.green-e.org/files/styles/690x250/public/images/news/green-e-wind-2_0.jpg?itok=gqANAfh8" alt="image description" />
          </a>
          <figcaption className="absolute px-8 text-[4rem] text-white bottom-6">
            <p>Standards & Guidances</p>
          </figcaption>
        </div>
      </section>

      <section class="bg-gradient-to-r from-green-200 to-green-50 py-8">
        <div className="max-w-2xl mx-auto text-center px-4">

          <p class="text-3xl font-bold text-teal-700 text-center">GHG Protocol supplies the world's most widely used greenhouse gas accounting standards and guidance.</p>
          <p class="text-lg text-gray-600 mt-4">The standards and guidance below are designed to provide a framework for businesses, governments, and other entities to measure and report their greenhouse gas emissions in ways that support their missions and goals.</p>

        </div>
      </section>


      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Scope 1 Emission" description="Scope 1 covers emissions from sources that an organisation owns or controls directly – for example from burning fuel in our fleet of vehicles (if they’re not electrically-powered)." />
          <Card title="Scope 2 Emission" description="Scope 2 are emissions that a company causes indirectly and come from where the energy it purchases and uses is produced. For example, the emissions caused when generating the electricity that we use in our buildings would fall into this category." />
          <Card title="Scope 3 Emission" description="Scope 3 encompasses emissions that are not produced by the company itself and are not the result of activities from assets owned or controlled by them, but by those that it’s indirectly responsible for up and down its value chain. An example of this is when we buy, use and dispose of products from suppliers. Scope 3 emissions include all sources not within the scope 1 and 2 boundaries." />
        </div>
      </div>
    </div>
  )
}

export default Standards
