'use client';

import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { RiLockPasswordLine } from 'react-icons/ri';
import { authService } from '@/services/api/auth';
import { GoogleLogin } from '@react-oauth/google';

const SignUpPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (formData.password !== formData.password2) {
      setError("Passwords don't match");
      setIsLoading(false);
      return;
    }

    const response = await authService.register(formData);
    
    if (response.error) {
      // Handle different error formats from the API
      if (typeof response.error === 'string') {
        setError(response.error);
      } else if (typeof response.error === 'object') {
        // Handle error object with arrays of error messages
        const firstError = Object.values(response.error)[0]?.[0];
        setError(firstError || 'Registration failed');
      }
    } else {
      // Redirect to email verification page
      router.push(`/auth/verify?email=${encodeURIComponent(formData.email)}`);
    }
    
    setIsLoading(false);
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setIsLoading(true);
      setError(null);
      
      if (!credentialResponse?.credential) {
        throw new Error('No credential received from Google');
      }

      const response = await authService.googleAuth(credentialResponse.credential);
      
      if (response.error) {
        throw new Error(response.error as string);
      }
      
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError('Google sign in failed. Please try again.');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl"
      >
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-8 h-8 bg-[#6666FF] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">K</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-[#6666FF] to-[#8A8AFF] bg-clip-text text-transparent">
              KELIBE
            </h1>
          </div>
          <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
              sign in to your account
            </Link>
          </p>
        </motion.div>

        <motion.form variants={itemVariants} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <HiOutlineMail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Password"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <RiLockPasswordLine className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password2"
                name="password2"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password2}
                onChange={handleChange}
                className="appearance-none relative block w-full pl-10 pr-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm text-center bg-red-50 py-2 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.div variants={itemVariants}>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                'Sign up'
              )}
            </motion.button>
          </motion.div>
        </motion.form>

        <motion.div variants={itemVariants} className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="w-full flex justify-center">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                text="continue_with"
                shape="rectangular"
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
