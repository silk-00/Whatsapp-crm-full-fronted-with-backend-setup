import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  MessageSquare,
  Users,
  Clock,
  CheckCircle,
  Bell,
  LogOut,
  Menu,
  X,
  Headphones,
  BarChart3,
  Inbox,
  Send,
  Search,
  Filter,
  Star,
  AlertCircle,
  Activity,
  TrendingUp,
  Target,
  Award,
  Calendar,
  Eye,
  MessageCircle,
  Phone,
  Mail
} from 'lucide-react';
import { inboxAPI, agentAPI } from '../lib/api';
import type { Chat, Conversation } from '../types/api';

interface AgentStats {
  assignedChats: number;
  resolvedToday: number;
  avgResponseTime: string;
  customerSatisfaction: number;
  totalResolved: number;
  pendingChats: number;
}

export default function AgentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  // Agent dashboard data states
  const [stats, setStats] = useState<AgentStats>({
    assignedChats: 0,
    resolvedToday: 0,
    avgResponseTime: '0m',
    customerSatisfaction: 0,
    totalResolved: 0,
    pendingChats: 0,
  });
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const { user, logout } = useAuth();

  // Load agent dashboard data
  const loadAgentData = async () => {
    try {
      setIsLoading(true);

      // Load chats assigned to this agent
      const chatsResponse = await inboxAPI.getChats();
      if (chatsResponse.success) {
        const agentChats = chatsResponse.data?.filter((chat: Chat) =>
          chat.assignedAgent === user?.uid || chat.status === 'OPEN'
        ) || [];
        setChats(agentChats);

        // Calculate stats from chat data
        const resolvedToday = agentChats.filter(chat =>
          chat.status === 'RESOLVED' &&
          new Date(chat.createdAt).toDateString() === new Date().toDateString()
        ).length;

        const pendingChats = agentChats.filter(chat => chat.status === 'PENDING').length;
        const totalResolved = agentChats.filter(chat => chat.status === 'RESOLVED').length;

        setStats({
          assignedChats: agentChats.length,
          resolvedToday,
          avgResponseTime: '2.5m',
          customerSatisfaction: 4.8,
          totalResolved,
          pendingChats,
        });
      }

    } catch (error) {
      console.error('Error loading agent data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load conversation for selected chat
  const loadConversation = async (chatId: string) => {
    try {
      const response = await inboxAPI.getConversations(chatId);
      if (response.success) {
        setConversations(response.data || []);
      }
    } catch (error) {
      console.error('Error loading conversation:', error);
    }
  };

  useEffect(() => {
    loadAgentData();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      loadConversation(selectedChat.chatId);
    }
  }, [selectedChat]);

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'inbox', label: 'Inbox', icon: Inbox },
    { id: 'chats', label: 'My Chats', icon: MessageSquare },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  const statCards = [
    {
      title: 'Assigned Chats',
      value: stats.assignedChats.toString(),
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      description: 'Active conversations'
    },
    {
      title: 'Resolved Today',
      value: stats.resolvedToday.toString(),
      icon: CheckCircle,
      color: 'from-green-500 to-green-600',
      description: 'Successfully closed'
    },
    {
      title: 'Pending Chats',
      value: stats.pendingChats.toString(),
      icon: Clock,
      color: 'from-yellow-500 to-yellow-600',
      description: 'Awaiting response'
    },
    {
      title: 'Total Resolved',
      value: stats.totalResolved.toString(),
      icon: Award,
      color: 'from-purple-500 to-purple-600',
      description: 'All time resolved'
    },
    {
      title: 'Avg Response Time',
      value: stats.avgResponseTime,
      icon: Activity,
      color: 'from-indigo-500 to-indigo-600',
      description: 'Response speed'
    },
    {
      title: 'Satisfaction Score',
      value: stats.customerSatisfaction.toString(),
      icon: Star,
      color: 'from-orange-500 to-orange-600',
      description: 'Customer rating'
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Headphones className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">Agent Panel</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveItem(item.id)}
                className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeItem === item.id
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-500'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h1 className="ml-2 text-2xl font-bold text-gray-900">Agent Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.email || 'Agent'}
                  </p>
                  <p className="text-xs text-gray-500">Support Agent</p>
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
                <h2 className="text-2xl font-bold mb-2">Welcome back, Agent!</h2>
                <p className="text-primary-100">
                  Ready to help customers and provide excellent support today.
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{card.title}</p>
                        <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                        <p className="text-sm text-gray-500 mt-1">{card.description}</p>
                      </div>
                      <div className={`w-12 h-12 bg-gradient-to-r ${card.color} rounded-lg flex items-center justify-center`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Chats */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Recent Chats</h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">JD</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-500">Need help with billing...</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                        <p className="text-xs text-gray-500 mt-1">2 min ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">SM</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Sarah Miller</p>
                          <p className="text-sm text-gray-500">How to setup automation?</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Waiting
                        </span>
                        <p className="text-xs text-gray-500 mt-1">5 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other sections would be implemented here */}
          {activeItem !== 'dashboard' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {sidebarItems.find(item => item.id === activeItem)?.label}
              </h3>
              <p className="text-gray-600">This section is under development.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
