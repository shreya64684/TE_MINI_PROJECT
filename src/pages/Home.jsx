import React from 'react'
import Hero from '../components/Hero Section/Hero'
import Features from '../components/Features'
import CardCarousel from '../components/UI/CardCarousel'
import HowItWorks from '../components/HowItWorks'

const Home = () => {
  return (
    <div className='mt-100'>
       <Hero/>
       <Features />
       {/* <CardCarousel /> */}
       <HowItWorks/>
    </div>
   

  )
}

export default Home