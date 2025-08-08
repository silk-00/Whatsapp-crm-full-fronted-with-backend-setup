import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, MessageCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { UserRole } from '../../types/auth';
import { cn } from '../../lib/utils';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSignupClick?: () => void;
}

const roleOptions = [
  { value: 'user' as UserRole, label: 'User', icon: '👤' },
  { value: 'admin' as UserRole, label: 'Admin', icon: '👑' },
  { value: 'agent' as UserRole, label: 'Agent', icon: '🎧' },
];

export default function LoginForm({ onSuccess, onSignupClick }: LoginFormProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { login } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await login(data, selectedRole);
      
      if (response.success) {
        onSuccess?.();
      } else {
        setError(response.msg || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <MessageCircle className="h-8 w-8 text-white mr-2" />
            <h1 className="text-2xl font-bold text-white">WhatsCRM</h1>
          </div>
          <p className="text-primary-100">Welcome back! Please sign in to your account</p>
        </div>

        {/* Form */}
        <div className="px-8 py-8">
          {/* Role Selector */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {roleOptions.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={cn(
                    'flex-1 flex items-center justify-center py-2 px-3 rounded-md text-sm font-medium transition-all',
                    selectedRole === role.value
                      ? 'bg-primary-500 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  <span className="mr-2">{role.icon}</span>
                  {role.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className={cn(
                  'input w-full',
                  errors.email && 'border-red-300 focus-visible:ring-red-500'
                )}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={cn(
                    'input w-full pr-10',
                    errors.password && 'border-red-300 focus-visible:ring-red-500'
                  )}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary btn-lg w-full"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center space-y-2">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500"
              onClick={() => alert('Password reset functionality coming soon!')}
            >
              Forgot your password?
            </button>
            
            {onSignupClick && (
              <div className="text-sm text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={onSignupClick}
                  className="text-primary-600 hover:text-primary-500 font-medium"
                >
                  Sign up here
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
