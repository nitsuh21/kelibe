'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Edit3, MapPin, Award, Users } from 'lucide-react'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/slices/authSlice'


const ProfileCard = () => {
  const user = useAppSelector(selectUser);

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Image */}
      <div className="h-24 bg-gradient-to-r from-[#6666FF] to-[#8A8AFF] relative">
        <div className="absolute inset-0 bg-[url('/Images/pattern.png')] opacity-10" />
      </div>
      
      {/* Profile Content */}
      <div className="px-4 pb-6 -mt-12">
        {/* Profile Image */}
        <div className="relative">
          <div className="relative w-24 h-24 mx-auto ring-4 ring-white rounded-full overflow-hidden shadow-lg">
            <Image
              src="/Images/pp4.jpg"
              alt="Profile"
              fill
              className="object-cover"
            />
          </div>
          <button 
            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-100"
          >
            <Edit3 className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Profile Info */}
        <div className="text-center mt-4 space-y-2">
          <h3 className="text-xl font-semibold">{user as any}</h3>
          <div className="inline-flex items-center px-3 py-1 bg-gray-50 rounded-full text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            New York, USA
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#6666FF]/30 transition-colors">
            <div className="flex items-center justify-center gap-2">
              <Award className="w-5 h-5 text-[#6666FF]" />
              <span className="text-lg font-semibold">80%</span>
            </div>
            <p className="text-xs text-gray-600 text-center mt-1 font-medium">Profile Score</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#6666FF]/30 transition-colors">
            <div className="flex items-center justify-center gap-2">
              <Users className="w-5 h-5 text-[#6666FF]" />
              <span className="text-lg font-semibold">45</span>
            </div>
            <p className="text-xs text-gray-600 text-center mt-1 font-medium">Matches</p>
          </div>
        </div>

        {/* Action Button */}
        <Link
          href="/profile"
          className="mt-8 block w-full bg-[#6666FF] text-white py-3 rounded-xl font-medium hover:bg-[#5555ee] transition-colors text-center shadow-sm"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  )
}

const SuggestedMatch = ({ name, matchPercent, imageSrc }: { name: string; matchPercent: number; imageSrc: string }) => (
  <Link href="/profile">
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
      <div className="relative">
        <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-white shadow-sm">
          <Image
            src={imageSrc}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#6666FF] rounded-full flex items-center justify-center shadow-sm ring-2 ring-white">
          <span className="text-xs font-medium text-white">{matchPercent}%</span>
        </div>
      </div>
      <div className="flex-1 ml-4">
        <h3 className="font-medium group-hover:text-[#6666FF] transition-colors">{name}</h3>
        <p className="text-sm text-gray-500">View Profile</p>
      </div>
    </div>
  </Link>
)

const Rsidebar = () => {
  const suggestedMatches = [
    { name: 'Sarah Parker', matchPercent: 95, imageSrc: '/Images/pp3.jpg' },
    { name: 'Emma Wilson', matchPercent: 92, imageSrc: '/Images/pp3.jpg' },
    { name: 'Jane Smith', matchPercent: 88, imageSrc: '/Images/pp3.jpg' },
  ]

  return (
    <div className="fixed top-0 right-0 w-64 h-screen bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 space-y-6">
        <ProfileCard />
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Top Matches</h2>
              <Link href="/matches" className="text-sm text-[#6666FF] hover:underline font-medium">
                View All
              </Link>
            </div>
          </div>
          
          <div className="p-2">
            {suggestedMatches.map((match, index) => (
              <SuggestedMatch key={index} {...match} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProfileCard, Rsidebar as default }
