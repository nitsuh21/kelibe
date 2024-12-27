'use client'
import React, { useState } from 'react'
import { Menu, X, Compass, User, Heart, MessageSquare, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-xl bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        {isOpen ? <X className="text-gray-700" size={24} /> : <Menu className="text-gray-700" size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-screen w-72 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-40 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#6666FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#6666FF] to-[#8A8AFF] bg-clip-text text-transparent">
                KELIBE
              </h1>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 p-4">
            <div className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-[#6666FF] text-white shadow-md shadow-[#6666FF]/20'
                        : 'text-gray-700 hover:bg-[#6666FF]/10'
                    }`}
                  >
                    <item.icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={() => {/* Add logout logic */}}
              className="flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl w-full transition-all group"
            >
              <LogOut className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
