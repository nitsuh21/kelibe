'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Sidebar from '@/components/Side-bar';
import Rsidebar from '@/components/Rside-bar';
import { Category, categories } from './data';
import { useAuth } from '@/context/AuthContext';
import AuthDebug from '@/components/AuthDebug';

export default function ProfilePage() {
  const { user, isLoading, error, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        <AuthDebug />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="text-red-600">{error}</div>
        <AuthDebug />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    // Add a small delay before redirecting to ensure state is properly updated
    setTimeout(() => {
      window.location.href = '/auth/signin';
    }, 100);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        <AuthDebug />
      </div>
    );
  }

  const userFullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Anonymous';
  const userEmail = user.email || 'Email not set';
  const userProfileImage = user.profile?.profile_image || '/placeholder-avatar.jpg';
  const userLocation = user.profile?.location || 'Location not set';
  const userBio = user.profile?.bio || 'No bio yet';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64">
        <div className="max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="flex items-center gap-6">
              <div className="relative w-24 h-24">
                <Image
                  src={userProfileImage}
                  alt={`${userFullName}'s profile`}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">{userFullName}</h1>
                <p className="text-gray-500 mt-1">{userEmail}</p>
                <p className="text-gray-500 mt-1">{userLocation}</p>
                <p className="text-gray-600 mt-2">{userBio}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {Array.isArray(categories) && categories.map((category: Category) => (
              <Link key={category.id} href={`/profile/category/${category.id}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </motion.div>
        </div>
      </main>
      <div className="hidden lg:block">
        <Rsidebar />
      </div>
      <AuthDebug />
    </div>
  );
}
