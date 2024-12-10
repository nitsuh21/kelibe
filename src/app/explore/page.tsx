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
    education: "Master's in Tech",
    imageUrl: '/images/pp2.jpg',
    values: ['Growth', 'Family-Oriented', 'Innovation'],
    mindset: 'Growth-Oriented',
    interests: ['Tech Startups', 'Yoga', 'Photography'],
    compatibility: {
      values: 92,
      mindset: 88,
      goals: 95
    },
    about: "Tech enthusiast with a passion for sustainable innovation. I believe in continuous learning and personal development."
  },
  {
    id: 2,
    name: 'James Wilson',
    age: 31,
    location: 'Brooklyn',
    education: "Bachelor's in Arts",
    imageUrl: '/images/pp3.jpg',
    values: ['Spirituality', 'Community', 'Creativity'],
    mindset: 'Creative',
    interests: ['Street Art', 'Music', 'Events'],
    compatibility: {
      values: 85,
      mindset: 90,
      goals: 82
    },
    about: "Artist and community organizer passionate about bringing people together through creative expression."
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    age: 27,
    location: 'Manhattan',
    education: 'PhD in Psychology',
    imageUrl: '/images/pp4.jpg',
    values: ['Mental Health', 'Education', 'Empathy'],
    mindset: 'Analytical',
    interests: ['Psychology', 'Writing', 'Mindfulness'],
    compatibility: {
      values: 88,
      mindset: 94,
      goals: 89
    },
    about: "Research psychologist focused on understanding human behavior and relationships."
  },
  {
    id: 4,
    name: 'Michael Chang',
    age: 33,
    location: 'Queens',
    education: 'MBA',
    imageUrl: '/images/pp5.jpg',
    values: ['Leadership', 'Innovation', 'Balance'],
    mindset: 'Strategic',
    interests: ['Startups', 'Climbing', 'Wine'],
    compatibility: {
      values: 87,
      mindset: 91,
      goals: 86
    },
    about: "Entrepreneur with a passion for sustainable business practices and work-life balance."
  }
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
            className="relative bg-white rounded-2xl shadow-sm p-2"
          >
            <input 
              type="text" 
              placeholder="Search by values or life goals..."
              className="w-full px-4 py-3 pl-12 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-[#6666FF] transition-all"
            />
            <AdjustmentsHorizontalIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </motion.div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-3 p-4 bg-white rounded-2xl shadow-sm"
          >
            {filters.map((filter) => (
              <motion.div key={filter.id} variants={item} className="relative">
                <button
                  onClick={() => setActiveFilter(activeFilter === filter.id ? null : filter.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    activeFilter === filter.id
                      ? 'bg-[#6666FF] text-white shadow-lg shadow-indigo-200'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  } transition-all duration-300`}
                >
                  {filter.label}
                  <SparklesIcon className="w-4 h-4" />
                </button>
                
                {activeFilter === filter.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-2 p-3 bg-white rounded-xl shadow-xl z-10 min-w-[220px] border border-gray-100"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {filter.options.map((option) => (
                        <button
                          key={option}
                          className="px-4 py-2 text-sm text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group"
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
                          <span>{option}</span>
                          {selectedFilters[filter.id]?.includes(option) && (
                            <span className="text-[#6666FF]">✓</span>
                          )}
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
        >
          {profiles.map((profile) => (
            <motion.div
              key={profile.id}
              variants={item}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
            >
              <div className="p-4">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={profile.imageUrl}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{profile.name}, {profile.age}</h3>
                    <p className="text-xs text-gray-500">{profile.mindset} • {profile.education}</p>
                  </div>
                </div>

                {/* Values */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {profile.values.map((value, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-[#6666FF] rounded-full text-xs font-medium">
                      {value}
                    </span>
                  ))}
                </div>

                {/* About */}
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{profile.about}</p>

                {/* Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    <span className="text-sm font-medium text-[#6666FF]">{profile.compatibility.values}% Match</span>
                  </div>
                  <button className="px-3 py-1.5 rounded-lg bg-indigo-50 text-[#6666FF] text-sm font-medium hover:bg-indigo-100 transition-colors">
                    Connect
                  </button>
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
