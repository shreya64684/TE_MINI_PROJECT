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

      <div className="container mx-auto p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card title="Scope 1 Emission" description="Desc1" />
          <Card title="Scope 2 Emission" description="Desc2" />
          <Card title="Scope 3 Emission" description="Desc3" />
        </div>
      </div>
    </div>
  )
}

export default Standards
