'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Heart, Users, Shield, MessageCircle } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white px-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Find Your Perfect Match</h1>
          <p className="text-xl md:text-2xl mb-8">Connect with like-minded people and start your journey to love</p>
          <Link href="/auth/signup" 
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all inline-flex items-center gap-2"
          >
            Get Started <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center p-6">
              <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meaningful Connections</h3>
              <p className="text-gray-600">Find genuine relationships based on shared interests and values</p>
            </div>
            <div className="text-center p-6">
              <Shield className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Safe & Secure</h3>
              <p className="text-gray-600">Your privacy and security are our top priority</p>
            </div>
            <div className="text-center p-6">
              <MessageCircle className="w-12 h-12 text-indigo-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real Conversations</h3>
              <p className="text-gray-600">Connect through meaningful conversations</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">About Us</h2>
            <p className="text-gray-600 mb-8">
              At Kelibe, we believe everyone deserves to find their perfect match. Our platform is designed 
              to create meaningful connections that last. With advanced matching algorithms and a focus on 
              genuine relationships, we help you find someone special.
            </p>
            <Link href="/about" 
              className="text-purple-600 font-semibold hover:text-purple-700 transition-colors inline-flex items-center gap-2"
            >
              Learn More <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Have questions or need support? Our team is here to help you on your journey to finding love.
            </p>
            <Link href="/contact" 
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              Contact Us <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}