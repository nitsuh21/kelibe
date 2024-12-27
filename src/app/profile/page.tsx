'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import Sidebar from '@/components/Side-bar';
import profileService, { UserProfile, Category } from '@/services/api/profile';
import { 
  HomeIcon,
  UserIcon,
  ChatBubbleLeftIcon,
  BellIcon,
  HeartIcon,
  CameraIcon,
  PencilIcon,
  MapPinIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import withAuth from '@/components/withAuth';

function ProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileData, categoriesData] = await Promise.all([
          profileService.getProfile(),
          profileService.getCategories()
        ]);
        setProfile(profileData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="hidden md:block">
        <Sidebar />
      </div>

      <main className="flex-1 md:pl-64">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white">
                  <img 
                    src={profile?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"}
                    alt={`${profile?.first_name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                  <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center group">
                    <CameraIcon className="w-8 h-8 text-white transform group-hover:scale-110 transition-transform" />
                  </button>
                </div>
                <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white"></div>
              </div>
              
              <h1 className="mt-6 text-3xl font-bold text-gray-900">
                {profile?.first_name} {profile?.last_name}
              </h1>
              
              <p className="mt-2 text-lg text-gray-600">{profile?.bio || "No bio yet"}</p>
              
              <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500">
                <PencilIcon className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>

            {/* Profile Stats */}
            <div className="mt-10 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="grid grid-cols-3 divide-x divide-gray-200">
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      {profile?.completion_percentage || 0}%
                    </div>
                    <div className="text-sm text-gray-500">Profile Complete</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-500">Match Rate</div>
                  </div>
                  <div className="p-6 text-center">
                    <div className="text-2xl font-bold text-gray-900">142</div>
                    <div className="text-sm text-gray-500">Profile Views</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Complete Your Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((category) => (
              <Link 
                href={`/profile/category/${category.id}`}
                key={category.id}
              >
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl shadow-sm p-6 cursor-pointer border border-gray-100 hover:border-pink-200 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <div className="w-6 h-6" style={{ color: category.color }}>
                        {React.createElement(
                          require('@heroicons/react/24/outline')[category.icon],
                          { className: 'w-6 h-6' }
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium" style={{ color: category.color }}>
                        {category.completion_percentage}%
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400 ml-auto mt-1" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center h-16">
          <Link href="/dashboard" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <HomeIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-pink-600">
            <UserIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link href="/messages" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <ChatBubbleLeftIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link href="/notifications" className="flex flex-col items-center text-gray-600 hover:text-pink-600">
            <BellIcon className="w-6 h-6" />
            <span className="text-xs mt-1">Alerts</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default withAuth(ProfilePage);
