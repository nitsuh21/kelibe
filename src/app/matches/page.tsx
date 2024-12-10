'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Side-bar';
import Rsidebar from '@/components/Rside-bar';

const matches = [
  {
    id: 1,
    name: 'Sarah Chen',
    lastActive: 'Just now',
    matchScore: 92,
    imageUrl: '/images/pp2.jpg',
    values: ['Growth', 'Innovation'],
    status: 'online',
    preview: 'Would love to discuss your thoughts on sustainable tech...'
  },
  {
    id: 2,
    name: 'James Wilson',
    lastActive: '2h ago',
    matchScore: 88,
    imageUrl: '/images/pp3.jpg',
    values: ['Creative', 'Community'],
    status: 'away',
    preview: 'The art exhibition this weekend sounds amazing!'
  },
  {
    id: 3,
    name: 'Emma Rodriguez',
    lastActive: '1d ago',
    matchScore: 85,
    imageUrl: '/images/pp4.jpg',
    values: ['Education', 'Empathy'],
    status: 'offline',
    preview: 'I completely agree with your perspective on...'
  }
];

export default function MatchesPage() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
            <h1 className="text-xl font-semibold text-gray-900">Your Matches</h1>
            <div className="flex gap-2 bg-gray-50 p-1 rounded-lg">
              <button 
                onClick={() => setFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' 
                    ? 'bg-[#6666FF] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Matches
              </button>
              <button 
                onClick={() => setFilter('new')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'new' 
                    ? 'bg-[#6666FF] text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                New Matches
              </button>
            </div>
          </div>

          {/* Matches List */}
          <div className="space-y-3">
            {matches.map((match) => (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="relative">
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img 
                      src={match.imageUrl} 
                      alt={match.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white
                    ${match.status === 'online' ? 'bg-green-400' : 
                      match.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'}`}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-medium text-gray-900">{match.name}</h3>
                      <p className="text-sm text-gray-500 truncate">{match.preview}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-indigo-50 px-2.5 py-1 rounded-lg">
                      <StarIcon className="w-4 h-4 text-[#6666FF]" />
                      <span className="text-sm font-medium text-[#6666FF]">{match.matchScore}%</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      {match.values.map((value, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-50 text-gray-600 rounded-md text-xs">
                          {value}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{match.lastActive}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      
      <Rsidebar />
    </div>
  );
}
