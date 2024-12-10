'use client'

import React from 'react'
import Sidebar from '@/components/Side-bar'
import Rsidebar from '@/components/Rside-bar'
import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  HeartIcon, 
  UserGroupIcon,
  PencilIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

const profileData = {
  name: "Sarah Chen",
  title: "Tech Innovator & Growth Enthusiast",
  image: "/images/pp4.jpg",
  categories: [
    {
      id: "core-values",
      name: "Core Values and Identity",
      description: "Your personality, beliefs, and values that define who you are",
      image: "/Images/core-values.webp",
      completionStatus: "4/5 questions answered"
    },
    {
      id: "growth-mindset",
      name: "Growth Mindset",
      description: "Your ability to learn, adapt, and thrive in changing environments",
      image: "/Images/mindset.webp",
      completionStatus: "3/5 questions answered"
    },
    {
      id: "aspirations",
      name: "Achieving Goals",
      description: "The determination and effort you put into reaching your milestones",
      image: "/Images/aspirations.png",
      completionStatus: "5/5 questions answered"
    }
  ],
  recentActivity: [
    { type: "match", name: "James Wilson", time: "2h ago" },
    { type: "like", name: "Emma Rodriguez", time: "5h ago" },
    { type: "view", name: "Michael Chang", time: "1d ago" }
  ]
}

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-gradient-to-r from-[#6666FF] to-[#8A8AFF] rounded-2xl p-6 text-white overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="none">
                <circle cx="90" cy="10" r="50" fill="white" />
                <circle cx="10" cy="90" r="30" fill="white" />
              </svg>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-white/20">
                <Image src={profileData.image} alt="Profile" fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                <p className="text-white/80">{profileData.title}</p>
                <div className="flex gap-4 mt-4">
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl flex items-center gap-2 transition-colors">
                    <PencilIcon className="w-4 h-4" />
                    Edit Profile
                  </button>
                  <button className="px-4 py-2 bg-white text-[#6666FF] rounded-xl hover:bg-white/90 transition-colors">
                    View Public Profile
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {profileData.categories.map((category) => (
              <Link href={`/profile/category/${category.id}`} key={category.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="relative aspect-video mb-4 overflow-hidden rounded-xl">
                    <Image src={category.image} fill alt={category.name} className="object-cover" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{category.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[#6666FF]">{category.completionStatus}</span>
                    <span className="text-sm text-[#6666FF]">View Details →</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <UserGroupIcon className="w-5 h-5 text-[#6666FF]" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {profileData.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl ${
                      activity.type === 'match' ? 'bg-green-100 text-green-600' :
                      activity.type === 'like' ? 'bg-pink-100 text-pink-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'match' ? <UserGroupIcon className="w-5 h-5" /> :
                       activity.type === 'like' ? <HeartIcon className="w-5 h-5" /> :
                       <BookOpenIcon className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.name}</p>
                      <p className="text-xs text-gray-500">
                        {activity.type === 'match' ? 'New match' :
                         activity.type === 'like' ? 'Liked your profile' :
                         'Viewed your profile'}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      <Rsidebar />
    </div>
  )
}
