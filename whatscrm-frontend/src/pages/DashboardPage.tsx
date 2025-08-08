import { useState, useEffect } from 'react';
import {
  MessageCircle,
  Users,
  Send,
  Bot,
  QrCode,
  BarChart3,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Zap,
  Globe,
  Smartphone,
  TrendingUp,
  Clock,
  Target,
  Headphones,
  Award,
  Play,
  Inbox,
  FileText,
  Workflow,
  Brain,
  Key,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CheckCircle,
  AlertCircle,
  Activity
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cn } from '../lib/utils';
import {
  userDashboardAPI,
  phonebookAPI,
  campaignAPI,
  templateAPI,
  chatbotAPI,
  qrAPI,
  inboxAPI,
  analyticsAPI,
  settingsAPI,
  aiToolsAPI,
  chatFlowsAPI
} from '../lib/api';
import type {
  UserDashboardStats,
  Phonebook,
  Campaign,
  Template,
  Chatbot,
  QRInstance,
  Chat
} from '../types/api';
import ContactManager from '../components/ContactManager';
import CampaignManager from '../components/CampaignManager';
import TemplateManager from '../components/TemplateManager';
import InboxManager from '../components/InboxManager';
import QRManager from '../components/QRManager';
import ChatbotManager from '../components/ChatbotManager';

const sidebarItems = [
  { icon: BarChart3, label: 'Dashboard', id: 'dashboard' },
  { icon: Inbox, label: 'Inbox', id: 'inbox' },
  { icon: Users, label: 'Contacts', id: 'contacts' },
  { icon: Send, label: 'Campaigns', id: 'campaigns' },
  { icon: FileText, label: 'Templates', id: 'templates' },
  { icon: Bot, label: 'Chatbots', id: 'chatbots' },
  { icon: Workflow, label: 'Chat Flows', id: 'flows' },
  { icon: QrCode, label: 'QR Codes', id: 'qr-codes' },
  { icon: Brain, label: 'AI Tools', id: 'ai-tools' },
  { icon: BarChart3, label: 'Analytics', id: 'analytics' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Dashboard data states
  const [stats, setStats] = useState<UserDashboardStats | null>(null);
  const [phonebooks, setPhonebooks] = useState<Phonebook[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [qrInstances, setQrInstances] = useState<QRInstance[]>([]);
  const [chats, setChats] = useState<Chat[]>([]);

  const { user, logout, role } = useAuth();

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setIsLoading(true);

      // Load dashboard stats
      const statsResponse = await userDashboardAPI.getStats();
      if (statsResponse.success) {
        setStats(statsResponse.stats);
      }

      // Load phonebooks
      try {
        const phonebooksResponse = await phonebookAPI.getAll();
        if (phonebooksResponse.success) {
          setPhonebooks(phonebooksResponse.data || []);
        }
      } catch (error) {
        console.log('Phonebooks not available:', error);
        setPhonebooks([]);
      }

      // Load campaigns
      try {
        const campaignsResponse = await campaignAPI.getAll();
        if (campaignsResponse.success) {
          setCampaigns(campaignsResponse.campaigns || []);
        }
      } catch (error) {
        console.log('Campaigns not available:', error);
        setCampaigns([]);
      }

      // Load templates
      try {
        const templatesResponse = await templateAPI.getAll();
        if (templatesResponse.success) {
          setTemplates(templatesResponse.data || []);
        }
      } catch (error) {
        console.log('Templates not available:', error);
        setTemplates([]);
      }

      // Load chatbots
      try {
        const chatbotsResponse = await chatbotAPI.getAll();
        if (chatbotsResponse.success) {
          setChatbots(chatbotsResponse.data || []);
        }
      } catch (error) {
        console.log('Chatbots not available:', error);
        setChatbots([]);
      }

      // Load QR instances
      try {
        const qrResponse = await qrAPI.getAll();
        if (qrResponse.success) {
          setQrInstances(qrResponse.data || []);
        }
      } catch (error) {
        console.log('QR instances not available:', error);
        setQrInstances([]);
      }

      // Load chats
      try {
        const chatsResponse = await inboxAPI.getChats();
        if (chatsResponse.success) {
          setChats(chatsResponse.data || []);
        }
      } catch (error) {
        console.log('Chats not available:', error);
        setChats([]);
      }

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const StatCard = ({ icon: Icon, label, value, color }: {
    icon: any;
    label: string;
    value: number;
    color: string;
  }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center">
        <div className={cn('p-3 rounded-lg', color)}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900">
            {isLoading ? '...' : value.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  const QuickActionCard = ({ icon: Icon, title, description, onClick }: {
    icon: any;
    title: string;
    description: string;
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-left hover:shadow-md transition-shadow"
    >
      <div className="flex items-center mb-3">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Icon className="h-5 w-5 text-primary-600" />
        </div>
        <h3 className="ml-3 text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={cn(
        'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center">
            <MessageCircle className="h-8 w-8 text-primary-500" />
            <span className="ml-2 text-xl font-bold text-gray-900">WhatsCRM</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveItem(item.id);
                setSidebarOpen(false);
              }}
              className={cn(
                'w-full flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-lg transition-colors',
                activeItem === item.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="ml-2 text-xl font-semibold text-gray-900 capitalize">
                {activeItem.replace('-', ' ')}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{role}</p>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {activeItem === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back!</h2>
                <p className="text-primary-100">
                  Here's what's happening with your WhatsApp campaigns today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={Users}
                  label="Total Contacts"
                  value={stats?.totalContacts || 0}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={Send}
                  label="Active Campaigns"
                  value={stats?.totalBroadcast || 0}
                  color="bg-green-500"
                />
                <StatCard
                  icon={MessageCircle}
                  label="Total Chats"
                  value={stats?.totalChats || 0}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={Bot}
                  label="Active Chatbots"
                  value={stats?.totalChatbots || 0}
                  color="bg-orange-500"
                />
              </div>

              {/* Additional Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={FileText}
                  label="Templates"
                  value={stats?.totalTemplets || 0}
                  color="bg-indigo-500"
                />
                <StatCard
                  icon={Workflow}
                  label="Chat Flows"
                  value={stats?.totalFlows || 0}
                  color="bg-pink-500"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Resolved Chats"
                  value={stats?.resolved || 0}
                  color="bg-green-500"
                />
                <StatCard
                  icon={Clock}
                  label="Pending Chats"
                  value={stats?.pending || 0}
                  color="bg-yellow-500"
                />
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <QuickActionCard
                    icon={QrCode}
                    title="Generate QR Code"
                    description="Create a new WhatsApp QR code for device connection"
                    onClick={() => setActiveItem('qr-codes')}
                  />
                  <QuickActionCard
                    icon={Send}
                    title="Create Campaign"
                    description="Start a new WhatsApp marketing campaign"
                    onClick={() => setActiveItem('campaigns')}
                  />
                  <QuickActionCard
                    icon={Users}
                    title="Manage Contacts"
                    description="Add, edit, or organize your contact lists"
                    onClick={() => setActiveItem('contacts')}
                  />
                  <QuickActionCard
                    icon={Bot}
                    title="Build Chatbot"
                    description="Create automated conversation flows"
                    onClick={() => setActiveItem('chatbots')}
                  />
                  <QuickActionCard
                    icon={BarChart3}
                    title="View Analytics"
                    description="Check your campaign performance and metrics"
                    onClick={() => alert('Analytics feature coming soon!')}
                  />
                  <QuickActionCard
                    icon={Settings}
                    title="Settings"
                    description="Configure your account and preferences"
                    onClick={() => setActiveItem('settings')}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Inbox Section */}
          {activeItem === 'inbox' && (
            <InboxManager />
          )}

          {/* Contacts Section */}
          {activeItem === 'contacts' && (
            <ContactManager />
          )}

          {/* Campaigns Section */}
          {activeItem === 'campaigns' && (
            <CampaignManager />
          )}

          {/* QR Codes Section */}
          {activeItem === 'qr-codes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">QR Code Instances</h2>
                <button className="btn-primary btn-md flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Generate QR Code
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {qrInstances.length > 0 ? (
                  qrInstances.map((instance) => (
                    <div key={instance.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">{instance.title}</h3>
                        <span className={cn(
                          'inline-flex px-2 py-1 text-xs font-semibold rounded-full',
                          instance.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                          instance.status === 'GENERATING' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        )}>
                          {instance.status}
                        </span>
                      </div>
                      <div className="text-center mb-4">
                        <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto flex items-center justify-center">
                          <QrCode className="h-16 w-16 text-gray-400" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button className="w-full btn-secondary btn-sm">
                          View QR Code
                        </button>
                        <button className="w-full btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50">
                          Delete Instance
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                    <QrCode className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No QR Instances</h3>
                    <p className="text-gray-500 mb-4">Generate your first QR code to connect WhatsApp</p>
                    <button className="btn-primary btn-md">
                      Generate QR Code
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Templates Section */}
          {activeItem === 'templates' && (
            <TemplateManager />
          )}

          {/* QR Codes Section */}
          {activeItem === 'qr-codes' && (
            <QRManager />
          )}

          {/* Chatbots Section */}
          {activeItem === 'chatbots' && (
            <ChatbotManager />
          )}

          {/* Analytics Section */}
          {activeItem === 'analytics' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>
                <button
                  onClick={loadDashboardData}
                  className="btn-secondary btn-md flex items-center"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Refresh Data
                </button>
              </div>

              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  icon={Users}
                  label="Total Contacts"
                  value={stats?.totalContacts || 0}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={Send}
                  label="Campaigns Sent"
                  value={stats?.totalCampaigns || 0}
                  color="bg-green-500"
                />
                <StatCard
                  icon={MessageCircle}
                  label="Messages Sent"
                  value={(stats?.totalCampaigns || 0) * 150}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={TrendingUp}
                  label="Success Rate"
                  value={85}
                  color="bg-orange-500"
                />
              </div>

              {/* Detailed Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Campaign Performance */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Campaigns</span>
                        <span className="text-lg font-semibold text-blue-600">
                          {stats?.totalCampaigns || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Active Campaigns</span>
                        <span className="text-lg font-semibold text-green-600">
                          {Math.floor((stats?.totalCampaigns || 0) * 0.3)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Completed Campaigns</span>
                        <span className="text-lg font-semibold text-purple-600">
                          {Math.floor((stats?.totalCampaigns || 0) * 0.7)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Analytics */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Analytics</h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Contacts</span>
                        <span className="text-lg font-semibold text-blue-600">
                          {stats?.totalContacts || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Phonebooks</span>
                        <span className="text-lg font-semibold text-green-600">
                          {stats?.totalPhonebooks || 0}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Avg. per Phonebook</span>
                        <span className="text-lg font-semibold text-purple-600">
                          {stats?.totalPhonebooks > 0 ? Math.floor((stats?.totalContacts || 0) / stats.totalPhonebooks) : 0}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chat Analytics */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Chat Analytics</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats?.totalChats || 0}</div>
                      <div className="text-sm text-gray-600">Total Chats</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{stats?.pending || 0}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{stats?.resolved || 0}</div>
                      <div className="text-sm text-gray-600">Resolved</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Section */}
          {activeItem === 'settings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                <button className="btn-primary btn-md">
                  Save Changes
                </button>
              </div>

              {/* Profile Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Timezone
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option>UTC</option>
                        <option>America/New_York</option>
                        <option>Europe/London</option>
                        <option>Asia/Tokyo</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* API Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">API Configuration</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        API Key
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="password"
                          value="••••••••••••••••••••••••••••••••"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                          readOnly
                        />
                        <button
                          onClick={async () => {
                            try {
                              const result = await settingsAPI.generateApiKey();
                              if (result.success) {
                                alert('New API key generated successfully!');
                              }
                            } catch (error) {
                              alert('Failed to generate API key');
                            }
                          }}
                          className="btn-secondary btn-md"
                        >
                          <Key className="h-4 w-4 mr-2" />
                          Generate New
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">WhatsApp Configuration</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Meta Access Token
                      </label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter Meta access token"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Business Phone Number ID
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter phone number ID"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Notification Settings */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Receive email alerts for important events</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">Campaign Notifications</h4>
                        <p className="text-sm text-gray-500">Get notified when campaigns complete</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Tools Section */}
          {activeItem === 'ai-tools' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">AI Tools</h2>
                <div className="text-sm text-gray-500">
                  Powered by AI to enhance your WhatsApp marketing
                </div>
              </div>

              {/* AI Tools Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Content Generator */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Brain className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Content Generator</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Generate engaging WhatsApp messages using AI
                  </p>
                  <div className="space-y-3">
                    <textarea
                      placeholder="Describe what kind of message you want to create..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      rows={3}
                    />
                    <button
                      onClick={async () => {
                        try {
                          const result = await aiToolsAPI.generateContent('marketing message', 'message');
                          alert(`Generated: ${result.data.content}`);
                        } catch (error) {
                          alert('AI service temporarily unavailable');
                        }
                      }}
                      className="w-full btn-primary btn-sm"
                    >
                      Generate Content
                    </button>
                  </div>
                </div>

                {/* Template Optimizer */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Zap className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Template Optimizer</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Optimize your message templates for better engagement
                  </p>
                  <div className="space-y-3">
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                      <option>Select a template to optimize</option>
                      {templates.map((template) => (
                        <option key={template.id} value={template.id}>
                          {template.name}
                        </option>
                      ))}
                    </select>
                    <button className="w-full btn-secondary btn-sm">
                      Optimize Template
                    </button>
                  </div>
                </div>

                {/* Smart Scheduling */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <Clock className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Smart Scheduling</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    AI-powered optimal timing for your campaigns
                  </p>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Best time to send:</span>
                        <span className="font-medium">2:00 PM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Optimal day:</span>
                        <span className="font-medium">Tuesday</span>
                      </div>
                    </div>
                    <button className="w-full btn-outline btn-sm">
                      Get Recommendations
                    </button>
                  </div>
                </div>

                {/* Audience Insights */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <Target className="h-6 w-6 text-orange-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Audience Insights</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Analyze your contact behavior and preferences
                  </p>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Active contacts:</span>
                        <span className="font-medium">{Math.floor((stats?.totalContacts || 0) * 0.8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement rate:</span>
                        <span className="font-medium">78%</span>
                      </div>
                    </div>
                    <button className="w-full btn-outline btn-sm">
                      View Full Report
                    </button>
                  </div>
                </div>

                {/* Response Analyzer */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-pink-100 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-pink-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Response Analyzer</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Analyze customer responses and sentiment
                  </p>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Positive responses:</span>
                        <span className="font-medium text-green-600">65%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Neutral responses:</span>
                        <span className="font-medium text-yellow-600">25%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Negative responses:</span>
                        <span className="font-medium text-red-600">10%</span>
                      </div>
                    </div>
                    <button className="w-full btn-outline btn-sm">
                      Analyze Responses
                    </button>
                  </div>
                </div>

                {/* Auto-Reply Generator */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-indigo-100 rounded-lg">
                      <Bot className="h-6 w-6 text-indigo-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">Auto-Reply Generator</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Generate intelligent auto-replies for common queries
                  </p>
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Enter common customer query..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <button className="w-full btn-primary btn-sm">
                      Generate Reply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Chat Flows Section */}
          {activeItem === 'flows' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Chat Flows</h2>
                <button className="btn-primary btn-md flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Flow
                </button>
              </div>

              {/* Flow Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard
                  icon={Workflow}
                  label="Total Flows"
                  value={stats?.totalFlows || 0}
                  color="bg-blue-500"
                />
                <StatCard
                  icon={Play}
                  label="Active Flows"
                  value={Math.floor((stats?.totalFlows || 0) * 0.7)}
                  color="bg-green-500"
                />
                <StatCard
                  icon={Users}
                  label="Flow Interactions"
                  value={(stats?.totalFlows || 0) * 45}
                  color="bg-purple-500"
                />
                <StatCard
                  icon={CheckCircle}
                  label="Completion Rate"
                  value={85}
                  color="bg-orange-500"
                />
              </div>

              {/* Flows List */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Your Chat Flows</h3>
                </div>
                <div className="p-6">
                  {stats?.totalFlows > 0 ? (
                    <div className="space-y-4">
                      {Array.from({ length: Math.min(stats.totalFlows, 5) }, (_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                              <Workflow className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900">
                                Flow {i + 1} - Welcome Sequence
                              </h4>
                              <p className="text-sm text-gray-500">
                                {Math.floor(Math.random() * 50) + 10} interactions this week
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                              Active
                            </span>
                            <button className="text-gray-400 hover:text-gray-600">
                              <Edit className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Workflow className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No Chat Flows</h3>
                      <p className="text-gray-500 mb-4">Create your first automated chat flow</p>
                      <button className="btn-primary btn-md">
                        Create Your First Flow
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Other sections placeholder */}
          {!['dashboard', 'inbox', 'contacts', 'campaigns', 'templates', 'qr-codes', 'chatbots', 'analytics', 'settings', 'ai-tools', 'flows'].includes(activeItem) && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 capitalize">
                {activeItem.replace('-', ' ')} Feature
              </h2>
              <p className="text-gray-600 mb-6">
                This feature is currently under development and will be available soon.
              </p>
              <button
                onClick={() => setActiveItem('dashboard')}
                className="btn-primary btn-md"
              >
                Back to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
