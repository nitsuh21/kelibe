'use client'
import React, { useState } from 'react'
import { Menu, X, Compass, User, Heart, MessageSquare, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { name: 'Explore', icon: Compass, href: '/explore' },
    { name: 'Profile', icon: User, href: '/profile' },
    { name: 'Matches', icon: Heart, href: '/matches' },
    { name: 'Messages', icon: MessageSquare, href: '/messages' },
    { name: 'Settings', icon: Settings, href: '/settings' },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-[#6666FF]">KELIBE</h1>
            <button onClick={() => setIsOpen(false)} className="lg:hidden">
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1">
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-[#6666FF] hover:text-white rounded-lg transition-colors"
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>

          <div className="border-t border-gray-200 pt-4">
            <button
              onClick={() => {/* Add logout logic */}}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg w-full transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
