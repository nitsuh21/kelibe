'use client'
import React from 'react'

const Homecard = () => {
  return (
    <div className='flex flex-col mx-auto rounded-2xl bg-[#6666FF] p-6 w-full max-w-5xl'>
      <p className='text-lg font-bold text-white'>Date to Marry</p>
      <p className='pt-3 text-xl md:text-2xl font-bold text-white max-w-md'>
        Improve your profile details to find your soul mate
      </p>
      <button className='flex font-bold text-white text-sm bg-black hover:bg-gray-800 rounded-full mt-4 items-center justify-center py-2.5 px-6 w-fit transition-colors'>
        Explore Now
      </button>
    </div>
  )
}

export default Homecard
