'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import LoadingScreen from './LoadingScreen';

export interface WithAuthProps {
  requireAuth?: boolean;
  redirectTo?: string;
}

export default function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  { requireAuth = true, redirectTo = '/auth/signin' }: WithAuthProps = {}
) {
  return function ProtectedRoute(props: P) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
      if (!isLoading) {
        if (requireAuth && !isAuthenticated) {
          // Save the current path for redirecting back after login
          // Don't save login page as redirect
          if (pathname !== '/auth/signin') {
            sessionStorage.setItem('redirectAfterLogin', pathname);
          }
          router.replace(redirectTo);
        } else if (!requireAuth && isAuthenticated) {
          // If we're on an auth page and user is already authenticated,
          // redirect to saved path or default to profile
          const savedPath = sessionStorage.getItem('redirectAfterLogin');
          if (savedPath && savedPath !== '/auth/signin') {
            sessionStorage.removeItem('redirectAfterLogin');
            router.replace(savedPath);
          } else {
            router.replace('/profile');
          }
        }
      }
    }, [isAuthenticated, isLoading, router, pathname, requireAuth, redirectTo]);

    // Show loading screen while checking authentication
    if (isLoading) {
      return <LoadingScreen />;
    }

    // If authentication is required and user is not authenticated, return null
    // (redirect will happen in useEffect)
    if (requireAuth && !isAuthenticated) {
      return null;
    }

    // If we don't require authentication or user is authenticated, render the component
    return <WrappedComponent {...props} />;
  };
}
