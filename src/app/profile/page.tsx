import React from 'react'
import Sidebar from '@/components/Side-bar'
import Rsidebar from '@/components/Rside-bar'

const page = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 mr-64">
        {/* Main content goes here */}
        <div className="p-6 text-gray-700">
          <input type="button" value="" placeholder='Search here' className='border border-gray-200 text-gray-700 rounded-full p-2 w-full ' />
        </div>
      </main>
      <Rsidebar />
    </div>
  )
}

export default page
