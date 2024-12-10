'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  BellIcon,
  LockClosedIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import Sidebar from '@/components/Side-bar';
import Rsidebar from '@/components/Rside-bar';

type SettingSection = {
  title: string;
  icon: React.ElementType;
  items: {
    name: string;
    description: string;
    component?: React.ReactNode;
  }[];
};

const AccountSettings = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john@example.com');
  const [phone, setPhone] = useState('+1234567890');

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#6666FF] focus:outline-none focus:ring-1 focus:ring-[#6666FF]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#6666FF] focus:outline-none focus:ring-1 focus:ring-[#6666FF]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#6666FF] focus:outline-none focus:ring-1 focus:ring-[#6666FF]"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="rounded-lg bg-[#6666FF] px-4 py-2 text-white hover:bg-[#5555ee] focus:outline-none focus:ring-2 focus:ring-[#6666FF] focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};

const NotificationSettings = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);
  const [messageNotifs, setMessageNotifs] = useState(true);
  const [matchNotifs, setMatchNotifs] = useState(true);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {[
          { 
            title: 'Push Notifications',
            description: 'Receive notifications on your device',
            state: pushEnabled,
            setState: setPushEnabled
          },
          {
            title: 'Email Notifications',
            description: 'Receive updates via email',
            state: emailEnabled,
            setState: setEmailEnabled
          },
          {
            title: 'New Messages',
            description: 'Get notified when you receive new messages',
            state: messageNotifs,
            setState: setMessageNotifs
          },
          {
            title: 'New Matches',
            description: 'Get notified when you have new matches',
            state: matchNotifs,
            setState: setMatchNotifs
          }
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
            <button
              onClick={() => item.setState(!item.state)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6666FF] focus:ring-offset-2 ${
                item.state ? 'bg-[#6666FF]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  item.state ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrivacySettings = () => {
  const [profileVisibility, setProfileVisibility] = useState('everyone');
  const [messagePrivacy, setMessagePrivacy] = useState('matches');
  
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Visibility</label>
          <select
            value={profileVisibility}
            onChange={(e) => setProfileVisibility(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#6666FF] focus:outline-none focus:ring-1 focus:ring-[#6666FF]"
          >
            <option value="everyone">Everyone</option>
            <option value="matches">Matches Only</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Message Privacy</label>
          <select
            value={messagePrivacy}
            onChange={(e) => setMessagePrivacy(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-[#6666FF] focus:outline-none focus:ring-1 focus:ring-[#6666FF]"
          >
            <option value="everyone">Everyone</option>
            <option value="matches">Matches Only</option>
            <option value="none">No One</option>
          </select>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="rounded-lg bg-[#6666FF] px-4 py-2 text-white hover:bg-[#5555ee] focus:outline-none focus:ring-2 focus:ring-[#6666FF] focus:ring-offset-2"
        >
          Save Privacy Settings
        </button>
      </div>
    </div>
  );
};

const settingsSections: SettingSection[] = [
  {
    title: 'Account',
    icon: UserCircleIcon,
    items: [
      { 
        name: 'Profile Information',
        description: 'Update your personal details and preferences',
        component: <AccountSettings />
      },
      { 
        name: 'Values & Interests',
        description: 'Manage your core values and interests'
      },
      { 
        name: 'Email & Password',
        description: 'Change your login credentials'
      }
    ]
  },
  {
    title: 'Notifications',
    icon: BellIcon,
    items: [
      { 
        name: 'Notification Preferences',
        description: 'Control your notification settings',
        component: <NotificationSettings />
      }
    ]
  },
  {
    title: 'Privacy',
    icon: LockClosedIcon,
    items: [
      { 
        name: 'Privacy Settings',
        description: 'Control who can see your profile',
        component: <PrivacySettings />
      },
      { 
        name: 'Blocked Users',
        description: 'Manage your blocked users list'
      }
    ]
  },
  {
    title: 'Help & Support',
    icon: QuestionMarkCircleIcon,
    items: [
      { 
        name: 'FAQ',
        description: 'Find answers to common questions'
      },
      { 
        name: 'Contact Support',
        description: 'Get help from our support team'
      }
    ]
  }
];

export default function SettingsPage() {
  const [selectedItem, setSelectedItem] = useState<{section: string; item: string} | null>(null);

  const selectedComponent = selectedItem
    ? settingsSections
        .find(section => section.title === selectedItem.section)
        ?.items.find(item => item.name === selectedItem.item)
        ?.component
    : null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center gap-4">
              {selectedItem && (
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {selectedItem ? selectedItem.item : 'Settings'}
                </h1>
                <p className="text-gray-500 mt-1">
                  {selectedItem ? 'Manage your settings' : 'Manage your account settings and preferences'}
                </p>
              </div>
            </div>
          </div>

          {selectedComponent ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm p-6"
            >
              {selectedComponent}
            </motion.div>
          ) : (
            /* Settings Sections */
            settingsSections.map((section) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <section.icon className="w-6 h-6 text-[#6666FF]" />
                    <h2 className="text-lg font-medium text-gray-900">{section.title}</h2>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {section.items.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedItem({ section: section.title, item: item.name })}
                      className="p-6 hover:bg-gray-50 transition-colors cursor-pointer flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                      </div>
                      <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </motion.div>
            ))
          )}

          {/* Danger Zone */}
          {!selectedItem && (
            <div className="bg-red-50 rounded-xl p-6">
              <h3 className="text-red-600 font-medium">Danger Zone</h3>
              <p className="text-sm text-red-500 mt-1">Permanent actions that cannot be undone</p>
              <div className="mt-4 space-y-3">
                <button className="w-full text-left px-4 py-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  <div className="font-medium text-red-600">Deactivate Account</div>
                  <p className="text-sm text-red-500">Temporarily disable your account</p>
                </button>
                <button className="w-full text-left px-4 py-3 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  <div className="font-medium text-red-600">Delete Account</div>
                  <p className="text-sm text-red-500">Permanently delete your account and all data</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Rsidebar />
    </div>
  );
}
