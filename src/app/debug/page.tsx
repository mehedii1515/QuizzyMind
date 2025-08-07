import { getAuthSession } from "@/lib/nextauth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function DebugPage() {
  const session = await getAuthSession();

  const envVars = {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'NOT SET',
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET ? 'SET (hidden)' : 'NOT SET',
    DATABASE_URL: process.env.DATABASE_URL ? 'SET (hidden)' : 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">🔍 QuizzyMind Debug Information</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
          </CardHeader>
          <CardContent>
            {session ? (
              <div>
                <p className="text-green-600 font-semibold">✅ User is authenticated</p>
                <div className="mt-2 text-sm">
                  <p><strong>User ID:</strong> {session.user?.id}</p>
                  <p><strong>Email:</strong> {session.user?.email}</p>
                  <p><strong>Name:</strong> {session.user?.name}</p>
                </div>
              </div>
            ) : (
              <p className="text-red-600 font-semibold">❌ No session found</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Environment Variables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between">
                  <span className="font-medium">{key}:</span>
                  <span className={value.includes('NOT SET') ? 'text-red-600' : 'text-green-600'}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>URL Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex flex-col">
                <span className="font-medium">Current URL:</span>
                <span className="text-blue-600">Check your browser URL</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium">Expected Production URL:</span>
                <span className="text-gray-600">https://your-app.vercel.app</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expected Behavior</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <p><strong>If you see this page:</strong></p>
              <ul className="list-disc ml-4 space-y-1">
                <li>Visit <code>/debug</code> on both local and production</li>
                <li>Compare the environment variables</li>
                <li>Check if NEXTAUTH_URL matches your domain</li>
                <li>Verify session is working properly</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">🚨 Common Issues:</h3>
        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <li>• NEXTAUTH_URL is still set to localhost:3000 in production</li>
          <li>• Environment variables not properly configured in Vercel</li>
          <li>• Database connection issues</li>
          <li>• Session cookies not working across domains</li>
        </ul>
      </div>
    </div>
  );
}
