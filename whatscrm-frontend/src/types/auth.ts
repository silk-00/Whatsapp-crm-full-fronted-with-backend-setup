export interface User {
  id: string;
  uid: string;
  name: string;
  email: string;
  mobile_with_country_code?: string;
  plan?: string;
  plan_expire?: string;
  created_at: string;
}

export interface Admin {
  id: string;
  uid: string;
  email: string;
  created_at: string;
}

export interface Agent {
  id: string;
  uid: string;
  name: string;
  email: string;
  mobile: string;
  created_at: string;
}

export type UserRole = 'user' | 'admin' | 'agent';

export interface AuthState {
  user: User | Admin | Agent | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  mobile_with_country_code: string;
  acceptPolicy?: boolean;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User | Admin | Agent;
  msg?: string;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials, role: UserRole) => Promise<AuthResponse>;
  signup: (data: SignupData) => Promise<AuthResponse>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}
