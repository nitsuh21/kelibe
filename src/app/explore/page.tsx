'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AdjustmentsHorizontalIcon, SparklesIcon, HeartIcon, ChatBubbleLeftIcon, MapPinIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Sidebar from '@/components/Side-bar';
import usersService, { User, UserFilters } from '@/services/api/users';
import categoriesService, { Category } from '@/services/api/categories';
import { debounce } from 'lodash';
import { useAuth } from '@/context/AuthContext';
import withAuth from '@/components/withAuth';

const ExplorePage = () => {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch categories
  const fetchCategories = async () => {
    if (!token) return;
    try {
      const data = await categoriesService.getCategories(token);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch users with current filters
  const fetchUsers = async (filters?: UserFilters) => {
    if (!token) return;
    try {
      setLoading(true);
      const response = await usersService.getUsers(token, filters);
      setUsers(response.results || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search handler
  const debouncedSearch = debounce((query: string) => {
    const filters: UserFilters = {
      search: query,
      ...selectedFilters
    };
    fetchUsers(filters);
  }, 300);

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Handle filter selection
  const handleFilterSelect = (filterId: string, option: string) => {
    const current = selectedFilters[filterId] || [];
    const updated = current.includes(option)
      ? current.filter(item => item !== option)
      : [...current, option];
    
    const newFilters = {
      ...selectedFilters,
      [filterId]: updated
    };
    
    setSelectedFilters(newFilters);
    setActiveFilter(null); // Close the filter dropdown after selection
    fetchUsers({ ...newFilters, search: searchQuery });
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchUsers();
    }
  }, [token]);

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

  if (!mounted) {
    return null; // Prevent hydration issues by not rendering until client-side
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 lg:pl-80">
        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Explore</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#6666FF] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <UserGroupIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#6666FF] text-white' : 'bg-gray-100 text-gray-600'}`}
              >
                <MapPinIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white rounded-2xl shadow-sm p-2"
          >
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name, values, or interests..."
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
            {categories?.map((category) => (
              <motion.div key={category.id} variants={item} className="relative">
                <button
                  onClick={() => setActiveFilter(activeFilter === category.title ? null : category.title)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 ${
                    activeFilter === category.title
                      ? 'bg-[#6666FF] text-white shadow-lg shadow-indigo-200'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  } transition-all duration-300`}
                >
                  {category.title}
                  <SparklesIcon className="w-4 h-4" />
                </button>
                
                {activeFilter === category.title && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute mt-2 p-3 bg-white rounded-xl shadow-xl z-10 min-w-[220px] border border-gray-100"
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {category.options?.map((option) => (
                        <button
                          key={option}
                          className="px-4 py-2 text-sm text-left rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-between group"
                          onClick={() => handleFilterSelect(category.title, option)}
                        >
                          <span>{option}</span>
                          {selectedFilters[category.title]?.includes(option) && (
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

        {/* Users Grid */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#6666FF] border-t-transparent"></div>
          </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className={`
              grid gap-5
              ${viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1'
              }
            `}
          >
            {users?.map((user) => (
              <motion.div
                key={user.id}
                variants={item}
                className={`
                  bg-white rounded-2xl shadow-sm overflow-hidden
                  ${viewMode === 'list' ? 'flex items-center p-4' : ''}
                `}
              >
                <div className={`${viewMode === 'list' ? 'flex-shrink-0 mr-4' : 'relative pb-[100%]'}`}>
                  <img
                    src={user.profile?.avatar || '/Images/default-avatar.jpg'}
                    alt={`${user.first_name}'s profile`}
                    className={`
                      ${viewMode === 'list'
                        ? 'w-20 h-20 rounded-xl object-cover'
                        : 'absolute inset-0 w-full h-full object-cover'
                      }
                    `}
                  />
                </div>

                <div className={`${viewMode === 'list' ? 'flex-1' : 'p-4'}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.first_name} {user.last_name}
                    </h3>
                    <div className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full ${
                        user.profile?.online_status === 'online' ? 'bg-green-400' : 'bg-gray-300'
                      }`} />
                      <span className="text-sm text-gray-500">
                        {user.profile?.online_status === 'online' ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{user.profile?.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {user.profile?.values?.slice(0, 3).map((value, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-indigo-50 text-[#6666FF] rounded-full text-xs font-medium">
                        {value}
                      </span>
                    ))}
                    {user.profile?.values?.length > 3 && (
                      <span className="px-2.5 py-1 bg-gray-50 text-gray-500 rounded-full text-xs font-medium">
                        +{user.profile?.values.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-[#6666FF]">
                        {user.profile?.compatibility?.overall ?? 0}% Match
                      </span>
                    </div>
                    <button className="px-3 py-1.5 rounded-lg bg-indigo-50 text-[#6666FF] text-sm font-medium hover:bg-indigo-100 transition-colors">
                      Connect
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default withAuth(ExplorePage);
