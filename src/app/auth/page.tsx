"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff, Brain } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login, register, user, loading: authLoading } = useAuth();
  const router = useRouter();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (!authLoading && user) {
      console.log('User detected, redirecting to dashboard:', user);
      // Use both router and window location for maximum reliability
      router.push('/dashboard');
      setTimeout(() => {
        window.location.replace('/dashboard');
      }, 100);
    }
  }, [user, authLoading, router]);

  // Also check periodically after login attempts
  useEffect(() => {
    if (!authLoading) {
      const checkAndRedirect = () => {
        // Re-check auth status
        fetch('/api/auth/me')
          .then(res => res.json())
          .then(data => {
            if (data.user) {
              console.log('Auth check passed, redirecting:', data.user);
              window.location.href = '/dashboard';
            }
          })
          .catch(err => console.log('Auth check failed:', err));
      };

      // Check after a delay to catch post-login state
      const timeoutId = setTimeout(checkAndRedirect, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [authLoading]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name.trim()) {
          toast({
            title: 'Error',
            description: 'Name is required',
            variant: 'destructive',
          });
          setLoading(false);
          return;
        }
        result = await register(formData.name, formData.email, formData.password);
      }

      if (result.success) {
        toast({
          title: 'Success',
          description: isLogin ? 'Successfully logged in!' : 'Account created successfully!',
        });
        
        // Force a small delay and then redirect
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
        
        // Simple redirect
        router.push('/dashboard');
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Network error. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-sm mx-auto shadow-lg">
          <CardContent className="p-6 sm:p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 text-sm">Loading...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-sm mx-auto shadow-lg">
        <CardHeader className="text-center space-y-3 px-4 py-6">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-2.5 sm:p-3 rounded-full">
              <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>
          </div>
          <div>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
              {isLogin ? 'Welcome Back!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground text-sm mt-2">
              {isLogin 
              ? 'Sign in to your QuizzyMind account' 
              : 'Join QuizzyMind and start creating quizzes'
              }
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-4 sm:pb-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  className="w-full h-11 text-base"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full h-11 text-base"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full h-11 text-base pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center touch-manipulation"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-base font-medium touch-manipulation"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  <span className="text-sm sm:text-base">
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </span>
                </div>
              ) : (
                <span className="text-sm sm:text-base">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </span>
              )}
            </Button>
          </form>
          
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin);
                setFormData({ name: '', email: '', password: '' });
              }}
              className="text-blue-600 hover:text-blue-500 text-sm font-medium touch-manipulation p-2"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"
              }
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
