// Phonebook and Contact Types
export interface Phonebook {
  id: number;
  name: string;
  uid: string;
  contactCount: number;
  createdAt: string;
}

export interface Contact {
  id: number;
  uid: string;
  phonebook_id: number;
  phonebook_name: string;
  name: string;
  mobile: string;
  var1?: string;
  var2?: string;
  var3?: string;
  var4?: string;
  var5?: string;
  createdAt: string;
}

// Campaign Types
export interface Campaign {
  id: number;
  uid: string;
  title: string;
  phonebook_id: number;
  phonebook_name: string;
  template_name?: string;
  template_language?: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  sent_count: number;
  delivered_count: number;
  read_count: number;
  failed_count: number;
  schedule?: string;
  createdAt: string;
}

// Template Types
export interface Template {
  id: number;
  uid: string;
  title: string;
  type: 'text' | 'media' | 'interactive';
  content: any;
  createdAt: string;
}

// Chatbot Types
export interface Chatbot {
  id: number;
  uid: string;
  title: string;
  for_all: boolean;
  chats: any[];
  flow: any;
  flow_id: string;
  active: boolean;
  origin: any;
  createdAt: string;
}

// Chat Flow Types
export interface ChatFlow {
  id: number;
  uid: string;
  flow_id: string;
  name: string;
  title?: string;
  data: any;
  source: 'wa_chatbot' | 'webhook_flow';
  createdAt: string;
}

// QR Instance Types
export interface QRInstance {
  id: number;
  uid: string;
  title: string;
  uniqueId: string;
  status: 'GENERATING' | 'ACTIVE' | 'INACTIVE' | 'DISCONNECTED';
  other?: any;
  createdAt: string;
}

// Chat Types
export interface Chat {
  id: number;
  uid: string;
  chatId: string;
  name: string;
  mobile: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  status: 'OPEN' | 'PENDING' | 'RESOLVED';
  assignedAgent?: string;
  createdAt: string;
}

export interface Conversation {
  id: number;
  chatId: string;
  type: string;
  metaChatId: string;
  msgContext: any;
  reaction: string;
  timestamp: string;
  senderName: string;
  senderMobile: string;
  status: 'sent' | 'delivered' | 'read' | 'failed';
  star: boolean;
  route: 'INCOMING' | 'OUTGOING';
  createdAt: string;
}

// Agent Types
export interface Agent {
  id: number;
  uid: string;
  owner_uid: string;
  name: string;
  email: string;
  mobile: string;
  comments?: string;
  is_active: boolean;
  logs?: any;
  createdAt: string;
}

// User Types
export interface User {
  id: number;
  uid: string;
  name: string;
  email: string;
  mobile_with_country_code: string;
  timezone?: string;
  plan?: string;
  plan_expire?: string;
  trial?: boolean;
  api_key?: string;
  role: 'user' | 'admin' | 'agent';
  createdAt: string;
}

// Dashboard Stats Types
export interface UserDashboardStats {
  totalChats: number;
  totalChatbots: number;
  totalContacts: number;
  totalFlows: number;
  totalBroadcast: number;
  totalTemplets: number;
  opened: number;
  pending: number;
  resolved: number;
  activeBot: number;
  dActiveBot: number;
}

export interface AdminDashboardStats {
  userLength: number;
  orderLength: number;
  contactLength: number;
  chatLength: number;
  agentLength: number;
  flowsLength: number;
  paid: any[];
  unpaid: any[];
  orders: any[];
  recentUsers: User[];
  recentTransactions: any[];
  chatsByMonth: any[];
  messagesByMonth: any[];
  messageTypes: any;
  agentPerformance: any[];
  activeInstances: number;
  systemMetrics: any;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  msg?: string;
  error?: string;
}

// Form Data Types
export interface ContactFormData {
  id?: number;
  phonebook_name: string;
  mobile: string;
  name: string;
  var1?: string;
  var2?: string;
  var3?: string;
  var4?: string;
  var5?: string;
}

export interface CampaignFormData {
  title: string;
  templet: any;
  phonebook: any;
  scheduleTimestamp: string;
  example?: any;
}

export interface TemplateFormData {
  title: string;
  type: 'text' | 'media' | 'interactive';
  content: any;
}

export interface ChatbotFormData {
  title: string;
  for_all: boolean;
  chats: any[];
  flow: any;
  origin: any;
}

export interface AgentFormData {
  name: string;
  email: string;
  mobile: string;
  password: string;
  comments?: string;
}

// AI Types
export interface TranslateRequest {
  text: string;
  targetLanguage: string;
  provider: 'openai' | 'gemini' | 'deepseek';
  apiKey: string;
}

export interface ReplyRequest {
  chatId: string;
  provider: 'openai' | 'gemini' | 'deepseek';
  apiKey: string;
}

// Order/Payment Types
export interface Order {
  id: number;
  uid: string;
  payment_mode: string;
  amount: number;
  data: any;
  s_token: string;
  createdAt: string;
}

// System Types
export interface SystemConfig {
  apiBaseUrl: string;
  frontendUrl: string;
}

export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  appName: string;
  version: string;
}
