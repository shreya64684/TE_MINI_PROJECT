import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cards = [
  {
    "id": 1,
    "title": "Verified CO₂ Tracking",
    "icon": "check-circle", 
    "d": "M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z",
    "description": "Ensuring accurate and trustworthy carbon tracking."
  },
  {
    "id": 2,
    "title": "Blockchain Security",
    "icon": "database-lock", 
    "d": "M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125",
    "description": "Secure and transparent data storage with blockchain."
  },
  {
    "id": 3,
    "title": "Personalized Recommendations",
    "icon": "lightbulb",
    "d": "m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525",
    "description": "Tailored insights for optimized carbon credit usage."
  }
]

const CardCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
  };

  return (
    <div className="relative flex items-center justify-center w-full max-w-3xl mx-auto mt-10 overflow-hidden">
      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute left-0 z-10 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carousel Wrapper */}
      <div className="overflow-hidden w-full px-8">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {cards.map(({title, d}) => (
            <div className='shadow-md p-6 rounded-md bg-emerald-300 '>
            <div className='hover:animate-spin border rounded-full inline-block p-4 border-slate-800 mb-3'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d={d} />
              </svg>
            </div>
            <h1 className='text-3xl'>{title}</h1>
            <p></p>
          </div>
          ))}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute right-0 z-10 p-2 bg-gray-100 rounded-full shadow-md hover:bg-gray-200"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default CardCarousel;