"use client";
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function DebugAuth() {
  const { user, loading } = useAuth();
  const [cookieTest, setCookieTest] = useState<any>(null);

  useEffect(() => {
    // Test API auth endpoint
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setCookieTest(data))
      .catch(err => setCookieTest({ error: err.message }));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="font-bold">Auth Context:</h2>
          <p>Loading: {loading.toString()}</p>
          <p>User: {JSON.stringify(user, null, 2)}</p>
        </div>

        <div>
          <h2 className="font-bold">API Test:</h2>
          <pre>{JSON.stringify(cookieTest, null, 2)}</pre>
        </div>

        <div>
          <h2 className="font-bold">Client Cookies:</h2>
          <p>{typeof window !== 'undefined' ? (document.cookie || 'No cookies') : 'Server side'}</p>
        </div>
      </div>
    </div>
  );
}
