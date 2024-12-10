'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AdjustmentsHorizontalIcon, SparklesIcon, HeartIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Side-bar';
import Rsidebar from '@/components/Rside-bar';

const filters = [
  { 
    id: 'basics', 
    label: 'Basics', 
    options: ['Age: 18-25', 'Age: 26-35', 'Age: 36-45', 'Height: 5\'0"-5\'6"', 'Height: 5\'7"-6\'0"', 'Height: 6\'0"+']
  },
  { 
    id: 'location', 
    label: 'Location', 
    options: ['Within 5km', '5-15km', '15-30km', 'Anywhere']
  },
  { 
    id: 'education', 
    label: 'Education', 
    options: ['High School', 'Bachelor\'s', 'Master\'s', 'PhD']
  },
  { 
    id: 'values', 
    label: ' Core Values', 
    options: ['Family-Oriented', 'Spirituality', 'Personal Growth', 'Community', 'Ambition']
  },
  { 
    id: 'mindset', 
    label: ' Mindset', 
    options: ['Growth-Oriented', 'Optimistic', 'Analytical', 'Creative', 'Practical']
  },
  { 
    id: 'goals', 
    label: ' Life Goals', 
    options: ['Career Growth', 'Family Building', 'World Travel', 'Social Impact']
  },
];

const profiles = [
  {
    id: 1,
    name: 'Sarah Chen',
    age: 28,
    location: 'New York',
    education: 'Master\'s',
    imageUrl: '/images/pp2.jpg',
    values: ['Personal Growth', 'Family-Oriented'],
    mindset: 'Growth-Oriented',
    vision: 'Building a sustainable future through technology and education',
    lifeGoals: ['Career Growth', 'Family Building'],
    compatibility: {
      values: 92,
      mindset: 88,
      goals: 95
    },
    about: "I believe in continuous learning and personal development."
  },
  {
    id: 2,
    name: 'James Wilson',
    age: 31,
    location: 'Brooklyn',
    education: 'Bachelor\'s',
    imageUrl: '/images/pp3.jpg',
    values: ['Spirituality', 'Community'],
    mindset: 'Creative',
    vision: 'Creating meaningful connections through art and community',
    lifeGoals: ['Social Impact', 'World Travel'],
    compatibility: {
      values: 85,
      mindset: 90,
      goals: 82
    },
    about: "Focused on building meaningful relationships and community."
  },
];

const ExplorePage = () => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative"
          >
            <input 
              type="text" 
              placeholder="Search by values or life goals..."
              className="w-full px-4 py-3 pl-12 bg-white rounded-xl border-none shadow-sm focus:ring-2 focus:ring-primary-500 transition-all"
            />
            <AdjustmentsHorizontalIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {filters.map((filter) => (
              <motion.div key={filter.id} variants={item} className="relative">
                <button
                  onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm ${
                    activeFilter === filter.id
                      ? 'bg-[#6666FF] text-white'
                      : 'bg-white hover:bg-gray-50'
                  } shadow-sm transition-all`}
                >
                  {filter.label}
                </button>
                
                {activeFilter === filter.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-2 p-2 bg-white rounded-xl shadow-lg z-10 min-w-[200px]"
                  >
                    <div className="grid grid-cols-1 gap-1">
                      {filter.options.map((option) => (
                        <button
                          key={option}
                          className="px-3 py-1.5 text-sm text-left rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            const current = selectedFilters[filter.id] || [];
                            setSelectedFilters({
                              ...selectedFilters,
                              [filter.id]: current.includes(option)
                                ? current.filter(item => item !== option)
                                : [...current, option]
                            });
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Profiles Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={item}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <img
                    src={profile.imageUrl}
                    alt={profile.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold truncate">{profile.name}, {profile.age}</h3>
                        <p className="text-sm text-gray-600">{profile.education} • {profile.location}</p>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-full hover:bg-gray-50">
                          <ChatBubbleLeftIcon className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-1.5 rounded-full hover:bg-pink-50">
                          <HeartIcon className="w-4 h-4 text-pink-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{profile.vision}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {profile.values.map((value, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs bg-purple-50 text-purple-700 rounded-md"
                    >
                      {value}
                    </span>
                  ))}
                  {profile.lifeGoals.map((goal, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 text-xs bg-blue-50 text-blue-700 rounded-md"
                    >
                      {goal}
                    </span>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <SparklesIcon className="w-3 h-3 text-[#6666FF]" />
                      <span>Match</span>
                    </div>
                    <div className="flex gap-3">
                      <span>Values {profile.compatibility.values}%</span>
                      <span>Goals {profile.compatibility.goals}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </main>

      <Rsidebar />
    </div>
  );
};

export default ExplorePage;
