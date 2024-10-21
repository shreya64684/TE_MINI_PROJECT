import React from 'react'
import Card from '../components/Card'

const Standards = () => {
  return (
    <div>

      <figure class="relative max-w-full transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0">
        <a href="#">
          <img class="max-w-full w-[1355px] h-[526px]" src="https://ghgprotocol.org/sites/default/files/styles/hero_image/public/2024-04/olia-gozha-J4kK8b9Fgj8-unsplash.jpg?itok=0swuD_NH" alt="image description" />
        </a>
        <figcaption class="absolute px-8 text-[4rem] text-green-700 bottom-6">
          <p>Standards & Guidances</p>
        </figcaption>
      </figure>


      <div className="container my-4 py-4 px-8 bg-slate-100">

        <p class="mb-3 text-lg text-gray-800 md:text-xl dark:text-gray-600">GHG Protocol supplies the world's most widely used greenhouse gas accounting standards and guidance.</p>
        <p class="text-gray-500 dark:text-gray-400">The standards and guidance below are designed to provide a framework for businesses, governments, and other entities to measure and report their greenhouse gas emissions in ways that support their missions and goals.</p>

      </div>


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
