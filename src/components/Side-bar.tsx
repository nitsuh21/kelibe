'use client'
import React from 'react'

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-white shadow-md p-4">
      <div className="flex flex-col mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-purple-700">KELIBE</h1>
        
        <nav className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">Menu</h2>
          <ul className="space-y-2">
            <li>
              <a href="/profile" className="flex items-center text-gray-700 hover:text-purple-700">
                Profile
              </a>
            </li>
            <li>
              <a href="/matches" className="flex items-center text-gray-700 hover:text-purple-700">
                Matches
              </a>
            </li>
            <li>
              <a href="/messages" className="flex items-center text-gray-700 hover:text-purple-700">
                Messages
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
