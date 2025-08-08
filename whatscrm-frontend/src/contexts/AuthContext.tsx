import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authAPI } from '../lib/api';
import type { 
  AuthState, 
  AuthContextType, 
  LoginCredentials, 
  SignupData, 
  UserRole,
  AuthResponse 
} from '../types/auth';

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  role: null,
  isAuthenticated: false,
  isLoading: true,
};

// Action types
type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOGIN_SUCCESS'; payload: { user: any; token: string; role: UserRole } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'REFRESH_SUCCESS'; payload: { user: any; token: string; role: UserRole } };

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: true,
        isLoading: false,
      };
    
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
      };
    
    case 'REFRESH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isAuthenticated: true,
        isLoading: false,
      };
    
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Login function
  const login = async (credentials: LoginCredentials, role: UserRole): Promise<AuthResponse> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      const response = await authAPI.login(credentials, role);
      
      if (response.success && response.token && response.user) {
        // Store in localStorage
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userEmail', credentials.email);
        
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: response.user,
            token: response.token,
            role,
          },
        });
        
        return response;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        return response;
      }
    } catch (error: any) {
      dispatch({ type: 'LOGIN_FAILURE' });
      return {
        success: false,
        msg: error.response?.data?.msg || 'Login failed. Please try again.',
      };
    }
  };

  // Signup function
  const signup = async (data: SignupData): Promise<AuthResponse> => {
    try {
      const response = await authAPI.signup(data);
      return response;
    } catch (error: any) {
      return {
        success: false,
        msg: error.response?.data?.msg || 'Signup failed. Please try again.',
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    dispatch({ type: 'LOGOUT' });
  };

  // Refresh auth function
  const refreshAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole') as UserRole;
      const email = localStorage.getItem('userEmail');

      if (!token || !role || !email) {
        dispatch({ type: 'LOGIN_FAILURE' });
        return;
      }

      // For now, we'll just validate the stored token
      // In a real app, you'd make an API call to refresh/validate the token
      dispatch({
        type: 'REFRESH_SUCCESS',
        payload: {
          user: { email }, // Minimal user data
          token,
          role,
        },
      });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  // Initialize auth on mount
  useEffect(() => {
    refreshAuth();
  }, []);

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
