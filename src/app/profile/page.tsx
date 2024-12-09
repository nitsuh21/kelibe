'use client'

import React from 'react'
import Sidebar from '@/components/Side-bar'
import Rsidebar, { ProfileCard } from '@/components/Rside-bar'
import Homecard from '@/components/Home-card'
import { IoEyeSharp, IoHeartSharp, IoPeopleSharp } from "react-icons/io5";
import Image from 'next/image'

const page = () => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        {/* Profile Card for Mobile */}
        <div className="lg:hidden mb-6">
          <ProfileCard />
        </div>

        {/* Main content */}
        <div className="space-y-6">
          <div className="relative">
            <input 
              type="search" 
              placeholder='Search here' 
              className='w-full border border-gray-200 text-gray-700 rounded-full p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition-all' 
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          <Homecard/>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[
            { label: 'Profile Views', icon: <IoEyeSharp />, color: 'bg-blue-100', count: 45 },
            { label: 'Likes', icon: <IoHeartSharp />, color: 'bg-red-100', count: 30 },
            { label: 'Matches', icon: <IoPeopleSharp />, color: 'bg-green-100', count: 15 },
          ].map((item, index) => (
            <div
              key={index}
              className='flex items-center p-6 space-x-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow'
            >
              <div className={`p-3 ${item.color} rounded-full`}>
                <div className='text-2xl text-[#6666FF]'>{item.icon}</div>
              </div>
              <div className='flex flex-col'>
                <p className='text-2xl font-semibold'>{item.count}</p>
                <p className='text-gray-600'>{item.label}</p>
              </div>
            </div>
          ))}
        </div>


          <div className='space-y-6'>
            <h2 className='text-2xl font-semibold text-center'>Continue Building ...</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[
              {
                id: 1,
                image: '/Images/core-values.webp',
                tag: 'Core Values and Identity',
                description: 'Your personality, beliefs, and values that define who you are.',
                progressColor: 'bg-[#6666FF]',
                progressWidth: 'w-[45%]',
              },
              {
                id: 2,
                image: '/Images/mindset.webp',
                tag: 'Growth Mindset',
                description: 'Your ability to learn, adapt, and thrive in changing environments.',
                progressColor: 'bg-[#FF6666]',
                progressWidth: 'w-[75%]',
              },
              {
                id: 3,
                image: '/Images/aspirations.png',
                tag: 'Achieving Goals',
                description: 'The determination and effort you put into reaching your milestones.',
                progressColor: 'bg-[#66FF66]',
                progressWidth: 'w-[60%]',
              },
            ].map((item) => (
              <div
                key={item.id}
                className='flex flex-col bg-white p-6 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl'
              >
                <div className='relative aspect-video mb-4 overflow-hidden rounded-xl'>
                  <Image src={item.image} fill alt={item.tag} className='object-cover' />
                </div>
                <div className='space-y-4'>
                  <span className={`inline-block px-4 py-1 rounded-full text-sm text-white ${item.progressColor}`}>
                    {item.tag}
                  </span>
                  <p className='text-sm text-gray-600'>{item.description}</p>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className={`${item.progressColor} h-2 rounded-full transition-all duration-300 ${item.progressWidth}`}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          </div>

          {/* Table Section */}
          <div className='w-full bg-white rounded-2xl shadow-lg p-6'>
            <div className="flex items-center justify-between mb-6">
              <h2 className='text-2xl font-semibold'>Recent Matches</h2>
              <button className="text-[#6666FF] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match Level</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10">
                          <Image 
                            src="/Images/pp2.jpg"
                            alt="Profile"
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="text-sm text-gray-900">John Doe</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">High</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className='bg-[#6666FF] hover:bg-[#5555ee] text-white px-4 py-2 rounded-full transition-colors'>
                        View Profile
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Rsidebar />
    </div>
  )
}

export default page
