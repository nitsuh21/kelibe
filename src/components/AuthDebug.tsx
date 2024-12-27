'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function AuthDebug() {
  const auth = useAuth();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 p-4 bg-black/80 text-white rounded-lg max-w-md overflow-auto">
      <h3 className="font-bold mb-2">Auth Debug</h3>
      <pre className="text-xs">
        {JSON.stringify(
          {
            user: auth.user,
            isLoading: auth.isLoading,
            error: auth.error,
            isAuthenticated: auth.isAuthenticated,
          },
          null,
          2
        )}
      </pre>
    </div>
  );
}
