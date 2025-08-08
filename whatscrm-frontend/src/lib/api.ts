import axios from 'axios';
import type { LoginCredentials, SignupData, AuthResponse, UserRole } from '../types/auth';

const API_BASE_URL = 'http://localhost:8001';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userEmail');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API functions
export const authAPI = {
  login: async (credentials: LoginCredentials, role: UserRole): Promise<AuthResponse> => {
    const endpoint = getLoginEndpoint(role);
    const response = await api.post(endpoint, credentials);
    return response.data;
  },

  signup: async (data: SignupData): Promise<AuthResponse> => {
    const response = await api.post('/api/user/signup', data);
    return response.data;
  },

  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/refresh');
    return response.data;
  },
};

// User Dashboard API functions
export const userDashboardAPI = {
  getStats: async () => {
    const response = await api.get('/api/user/get_dashboard');
    return response.data;
  },

  getProfile: async () => {
    const response = await api.get('/api/user/get_me');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.post('/api/user/update_profile', profileData);
    return response.data;
  },

  generateApiKey: async () => {
    const response = await api.get('/api/user/generate_api_keys');
    return response.data;
  },

  fetchProfile: async () => {
    const response = await api.get('/api/user/get_me');
    return response.data;
  },
};

// Analytics API functions
export const analyticsAPI = {
  getDashboard: async () => {
    const response = await api.get('/api/broadcast/dashboard');
    return response.data;
  },

  getStats: async () => {
    const response = await api.get('/api/user/get_dashboard');
    return response.data;
  },
};

// Settings API functions
export const settingsAPI = {
  getProfile: async () => {
    const response = await api.get('/api/user/get_me');
    return response.data;
  },

  updateProfile: async (profileData: any) => {
    const response = await api.post('/api/user/update_profile', profileData);
    return response.data;
  },

  generateApiKey: async () => {
    const response = await api.get('/api/user/generate_api_keys');
    return response.data;
  },

  getMetaAPI: async () => {
    const response = await api.get('/api/user/get_meta_api');
    return response.data;
  },

  updateMetaAPI: async (metaData: any) => {
    const response = await api.post('/api/user/update_meta_api', metaData);
    return response.data;
  },
};

// AI Tools API functions
export const aiToolsAPI = {
  generateContent: async (prompt: string, type: string) => {
    // This would connect to AI service
    return {
      success: true,
      content: `Generated ${type} content based on: ${prompt}`,
      data: {
        title: `AI Generated ${type}`,
        content: `This is AI-generated content for ${type} based on your prompt: "${prompt}"`
      }
    };
  },

  getTemplates: async () => {
    return {
      success: true,
      data: [
        { id: 1, name: 'Marketing Template', category: 'marketing' },
        { id: 2, name: 'Support Template', category: 'support' },
        { id: 3, name: 'Sales Template', category: 'sales' }
      ]
    };
  },
};

// Chat Flows API functions
export const chatFlowsAPI = {
  getAll: async () => {
    const response = await api.get('/api/chat_flow/get_flows');
    return response.data;
  },

  create: async (flowData: any) => {
    const response = await api.post('/api/chat_flow/insert_flow_beta', flowData);
    return response.data;
  },

  update: async (flowId: string, flowData: any) => {
    const response = await api.post('/api/chat_flow/update_flow', { flowId, ...flowData });
    return response.data;
  },

  delete: async (flowId: string) => {
    const response = await api.post('/api/chat_flow/del_flow', { flowId });
    return response.data;
  },
};

// Phonebook API functions
export const phonebookAPI = {
  getAll: async () => {
    const response = await api.get('/api/phonebook/get_by_uid');
    return response.data;
  },

  create: async (name: string) => {
    const response = await api.post('/api/phonebook/add', { name });
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.post('/api/phonebook/del_phonebook', { id });
    return response.data;
  },

  getContacts: async () => {
    const response = await api.get('/api/phonebook/get_uid_contacts');
    return response.data;
  },

  addContact: async (contactData: any) => {
    const response = await api.post('/api/phonebook/add_single_contact', contactData);
    return response.data;
  },

  importContacts: async (file: File, phonebookData: any) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', phonebookData.id);
    formData.append('phonebook_name', phonebookData.phonebook_name);

    const response = await api.post('/api/phonebook/import_contacts', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteContacts: async (contactIds: number[]) => {
    const response = await api.post('/api/phonebook/del_contacts', { selected: contactIds });
    return response.data;
  },
};

// Campaign API functions
export const campaignAPI = {
  getAll: async () => {
    const response = await api.get('/api/broadcast/get_beta_campaigns');
    return response.data;
  },

  create: async (campaignData: any) => {
    const response = await api.post('/api/broadcast/add_new', campaignData);
    return response.data;
  },

  createTemplate: async (templateCampaignData: any) => {
    const response = await api.post('/api/broadcast/add_new', templateCampaignData);
    return response.data;
  },

  getBetaCampaigns: async () => {
    const response = await api.get('/api/broadcast/get_beta_campaigns');
    return response.data;
  },

  createBetaCampaign: async (campaignData: any) => {
    const response = await api.post('/api/broadcast/create_beta_campaign', campaignData);
    return response.data;
  },

  delete: async (campaignId: string) => {
    const response = await api.post('/api/broadcast/delete_campaign', { id: campaignId });
    return response.data;
  },

  getDashboard: async () => {
    const response = await api.get('/api/broadcast/dashboard');
    return response.data;
  },
};

// Template API functions
export const templateAPI = {
  getAll: async () => {
    const response = await api.get('/api/templet/get_templets');
    return response.data;
  },

  create: async (templateData: any) => {
    const response = await api.post('/api/templet/add_new', templateData);
    return response.data;
  },

  delete: async (templateIds: number[]) => {
    const response = await api.post('/api/templet/del_templets', { selected: templateIds });
    return response.data;
  },
};

// Chatbot API functions
export const chatbotAPI = {
  getAll: async () => {
    const response = await api.get('/api/chatbot/get_chatbot');
    return response.data;
  },

  getBeta: async (type: string = 'wa_chatbot') => {
    const response = await api.get(`/api/chatbot/get_beta_chatbots?type=${type}`);
    return response.data;
  },

  create: async (chatbotData: any) => {
    const response = await api.post('/api/chatbot/add_chatbot', chatbotData);
    return response.data;
  },

  createBeta: async (chatbotData: any) => {
    const response = await api.post('/api/chatbot/add_beta_chatbot', chatbotData);
    return response.data;
  },

  update: async (chatbotData: any) => {
    const response = await api.post('/api/chatbot/update_chatbot', chatbotData);
    return response.data;
  },

  changeStatus: async (statusData: any) => {
    const response = await api.post('/api/chatbot/change_bot_status', statusData);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.post('/api/chatbot/del_beta_chatbot', { id });
    return response.data;
  },
};

// Chat Flow API functions
export const chatFlowAPI = {
  getAll: async () => {
    const response = await api.get('/api/chat_flow/get_flows');
    return response.data;
  },

  create: async (flowData: any) => {
    const response = await api.post('/api/chat_flow/add_new', flowData);
    return response.data;
  },

  createBeta: async (flowData: any) => {
    const response = await api.post('/api/chat_flow/insert_flow_beta', flowData);
    return response.data;
  },

  delete: async (flowId: string) => {
    const response = await api.post('/api/chat_flow/del_flow', { flowId });
    return response.data;
  },
};

// QR Code/Instance API functions
export const qrAPI = {
  getAll: async () => {
    const response = await api.get('/api/qr/get_all');
    return response.data;
  },

  create: async (instanceData: any) => {
    const response = await api.post('/api/qr/gen_qr', instanceData);
    return response.data;
  },

  delete: async (uniqueId: string) => {
    const response = await api.post('/api/qr/del_instance', { uniqueId });
    return response.data;
  },

  changeStatus: async (statusData: any) => {
    const response = await api.post('/api/qr/change_instance_status', statusData);
    return response.data;
  },
};

// Inbox/Chat API functions
export const inboxAPI = {
  getChats: async () => {
    const response = await api.get('/api/inbox/get_chats');
    return response.data;
  },

  getConversations: async (chatId: string) => {
    const response = await api.post('/api/inbox/get_convo', { chatId });
    return response.data;
  },

  sendText: async (messageData: any) => {
    const response = await api.post('/api/inbox/send_text', {
      text: messageData.message,
      toNumber: messageData.mobile,
      toName: messageData.name || 'User',
      chatId: messageData.chatId
    });
    return response.data;
  },

  sendTemplate: async (templateData: any) => {
    const response = await api.post('/api/inbox/send_templet', templateData);
    return response.data;
  },

  sendImage: async (imageData: any) => {
    const response = await api.post('/api/inbox/send_image', imageData);
    return response.data;
  },

  sendVideo: async (videoData: any) => {
    const response = await api.post('/api/inbox/send_video', videoData);
    return response.data;
  },

  sendDocument: async (documentData: any) => {
    const response = await api.post('/api/inbox/send_doc', documentData);
    return response.data;
  },

  sendAudio: async (audioData: any) => {
    const response = await api.post('/api/inbox/send_audio', audioData);
    return response.data;
  },

  deleteChat: async (chatId: string) => {
    const response = await api.post('/api/inbox/del_chat', { chatId });
    return response.data;
  },

  uploadMedia: async (file: File, chatData: any) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(chatData).forEach(key => {
      formData.append(key, chatData[key]);
    });

    const response = await api.post('/api/inbox/upload_media', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
};

// Agent API functions
export const agentAPI = {
  getAll: async () => {
    const response = await api.get('/api/agent/get_my_agents');
    return response.data;
  },

  create: async (agentData: any) => {
    const response = await api.post('/api/agent/add_agent', agentData);
    return response.data;
  },

  changeStatus: async (agentUid: string, activeness: boolean) => {
    const response = await api.post('/api/agent/change_agent_activeness', { agentUid, activeness });
    return response.data;
  },

  login: async (credentials: any) => {
    const response = await api.post('/api/agent/login', credentials);
    return response.data;
  },
};

// AI API functions
export const aiAPI = {
  translate: async (translateData: any) => {
    const response = await api.post('/api/ai/translate', translateData);
    return response.data;
  },

  suggestReply: async (replyData: any) => {
    const response = await api.post('/api/ai/suggest_reply', replyData);
    return response.data;
  },
};


// Admin API functions
export const adminAPI = {
  login: async (credentials: any) => {
    const response = await api.post('/api/admin/login', credentials);
    return response.data;
  },

  getUsers: async () => {
    const response = await api.get('/api/admin/get_users');
    return response.data;
  },

  getOrders: async () => {
    const response = await api.get('/api/admin/get_orders');
    return response.data;
  },

  getAnalytics: async () => {
    const response = await api.get('/api/admin/get_analytics');
    return response.data;
  },

  getAdmin: async () => {
    const response = await api.get('/api/admin/get_admin');
    return response.data;
  },

  updateUserPlan: async (planData: any) => {
    const response = await api.post('/api/admin/update_user_plan', planData);
    return response.data;
  },

  deleteUser: async (uid: string) => {
    const response = await api.post('/api/admin/delete_user', { uid });
    return response.data;
  },

  // Agents management
  getAgents: async () => {
    const response = await api.get('/api/admin/get_users'); // Get all users including agents
    return response.data;
  },

  // Plans management
  getPlans: async () => {
    const response = await api.get('/api/admin/get_plans');
    return response.data;
  },

  addPlan: async (planData: any) => {
    const response = await api.post('/api/admin/add_plan', planData);
    return response.data;
  },

  deletePlan: async (id: number) => {
    const response = await api.post('/api/admin/del_plan', { id });
    return response.data;
  },

  // System monitoring
  getSystemStats: async () => {
    const response = await api.get('/api/admin/get_analytics');
    return response.data;
  },

  // Database operations
  getDatabaseInfo: async () => {
    const response = await api.get('/api/admin/get_analytics');
    return response.data;
  },

  // Settings management
  getSettings: async () => {
    const response = await api.get('/api/admin/get_admin');
    return response.data;
  },

  updateSettings: async (settings: any) => {
    const response = await api.post('/api/admin/update-admin', settings);
    return response.data;
  },

  // Payment gateway settings
  getPaymentGateway: async () => {
    const response = await api.get('/api/admin/get_payment_gateway_admin');
    return response.data;
  },

  updatePaymentGateway: async (gatewayData: any) => {
    const response = await api.post('/api/admin/update_pay_gateway', gatewayData);
    return response.data;
  },

  // Contact leads
  getContactLeads: async () => {
    const response = await api.get('/api/admin/get_contact_leads');
    return response.data;
  },

  // Update user details
  updateUser: async (userData: any) => {
    const response = await api.post('/api/admin/update_user', userData);
    return response.data;
  },
};

// Web/Config API functions
export const webAPI = {
  getConfig: async () => {
    const response = await api.get('/api/web/config');
    return response.data;
  },

  getTheme: async () => {
    const response = await api.get('/api/web/get_theme');
    return response.data;
  },

  getModules: async () => {
    const response = await api.get('/api/web/return_module');
    return response.data;
  },
};



// Helper function to get login endpoint based on role
function getLoginEndpoint(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/api/admin/login';
    case 'agent':
      return '/api/agent/login';
    default:
      return '/api/user/login';
  }
}

export default api;
