'use client'
import React from 'react'
import Image from 'next/image'

const ProfileCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
      <div className="relative w-32 h-32 mx-auto">
        <Image
          src="/Images/pp1.jpg"
          alt="Profile"
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-xl font-semibold">John Doe</h3>
        <p className="text-gray-600">New York, USA</p>
      </div>
      <div className="flex justify-around text-center pt-4">
        <div>
          <p className="font-semibold">80%</p>
          <p className="text-sm text-gray-600">Profile</p>
        </div>
        <div className="border-l border-gray-200"></div>
        <div>
          <p className="font-semibold">45</p>
          <p className="text-sm text-gray-600">Matches</p>
        </div>
      </div>
      <button className="w-full bg-[#6666FF] text-white py-2 rounded-full hover:bg-[#5555ee] transition-colors">
        Edit Profile
      </button>
    </div>
  )
}

const Rsidebar = () => {
  return (
    <div className="fixed top-0 right-0 h-screen w-64 bg-white shadow-xl p-4 overflow-y-auto hidden lg:block">
      <div className="space-y-6">
        <ProfileCard />
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Suggested Matches</h2>
          {/* Add suggested matches content here */}
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="relative w-12 h-12">
                  <Image
                    src="/Images/pp2.jpg"
                    alt="Suggested Match"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Jane Doe</h3>
                  <p className="text-sm text-gray-600">90% Match</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileCard, Rsidebar as default }
