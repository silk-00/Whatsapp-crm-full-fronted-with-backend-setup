import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

interface AuthPageProps {
  mode: 'login' | 'signup';
}

export default function AuthPage({ mode }: AuthPageProps) {
  const [currentMode, setCurrentMode] = useState(mode);
  const { isAuthenticated, isLoading, role } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    // Redirect based on user role
    const redirectPath = role === 'admin' ? '/admin' : role === 'agent' ? '/agent' : '/dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  const handleSuccess = () => {
    if (currentMode === 'signup') {
      setCurrentMode('login');
    } else {
      // Redirect based on user role after successful login
      const redirectPath = role === 'admin' ? '/admin' : role === 'agent' ? '/agent' : '/dashboard';
      navigate(redirectPath);
    }
  };

  const handleModeSwitch = () => {
    const newMode = currentMode === 'login' ? 'signup' : 'login';
    setCurrentMode(newMode);
    navigate(`/${newMode}`, { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {currentMode === 'login' ? (
          <LoginForm
            onSuccess={handleSuccess}
            onSignupClick={handleModeSwitch}
          />
        ) : (
          <SignupForm
            onSuccess={handleSuccess}
            onLoginClick={handleModeSwitch}
          />
        )}
      </div>
    </div>
  );
}
