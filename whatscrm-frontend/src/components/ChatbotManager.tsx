import { useState, useEffect } from 'react';
import { 
  Bot, 
  Plus, 
  Search, 
  Play,
  Pause,
  Edit,
  Trash2,
  Settings,
  CheckCircle,
  AlertCircle,
  Clock,
  Workflow,
  MessageSquare,
  Users
} from 'lucide-react';
import { chatbotAPI, chatFlowAPI } from '../lib/api';
import type { Chatbot, ChatFlow } from '../types/api';

interface ChatbotManagerProps {
  onClose?: () => void;
}

export default function ChatbotManager({ onClose }: ChatbotManagerProps) {
  const [chatbots, setChatbots] = useState<Chatbot[]>([]);
  const [flows, setFlows] = useState<ChatFlow[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateChatbot, setShowCreateChatbot] = useState(false);
  const [newChatbot, setNewChatbot] = useState({
    title: '',
    flow: null as ChatFlow | null,
    origin: {
      title: 'Meta',
      code: 'META',
      data: {}
    }
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load chatbots
  const loadChatbots = async () => {
    try {
      setIsLoading(true);
      const response = await chatbotAPI.getBeta('wa_chatbot');
      if (response.success) {
        setChatbots(response.data || []);
      }
    } catch (error) {
      console.error('Error loading chatbots:', error);
      setMessage({ type: 'error', text: 'Failed to load chatbots' });
    } finally {
      setIsLoading(false);
    }
  };

  // Load flows
  const loadFlows = async () => {
    try {
      const response = await chatFlowAPI.getAll();
      if (response.success) {
        setFlows(response.data || []);
      }
    } catch (error) {
      console.error('Error loading flows:', error);
      setMessage({ type: 'error', text: 'Failed to load flows' });
    }
  };

  // Create new chatbot
  const createChatbot = async () => {
    if (!newChatbot.title.trim() || !newChatbot.flow) return;
    
    try {
      setIsLoading(true);
      const response = await chatbotAPI.createBeta({
        title: newChatbot.title,
        flow: newChatbot.flow,
        origin: newChatbot.origin
      });
      if (response.success) {
        setMessage({ type: 'success', text: 'Chatbot created successfully!' });
        setNewChatbot({
          title: '',
          flow: null,
          origin: {
            title: 'Meta',
            code: 'META',
            data: {}
          }
        });
        setShowCreateChatbot(false);
        loadChatbots();
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to create chatbot' });
      }
    } catch (error) {
      console.error('Error creating chatbot:', error);
      setMessage({ type: 'error', text: 'Failed to create chatbot' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete chatbot
  const deleteChatbot = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await chatbotAPI.delete(id);
      if (response.success) {
        setMessage({ type: 'success', text: 'Chatbot deleted successfully!' });
        loadChatbots();
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to delete chatbot' });
      }
    } catch (error) {
      console.error('Error deleting chatbot:', error);
      setMessage({ type: 'error', text: 'Failed to delete chatbot' });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle chatbot status
  const toggleChatbotStatus = async (id: number, currentStatus: boolean) => {
    try {
      setIsLoading(true);
      const response = await chatbotAPI.changeStatus({
        id,
        status: !currentStatus
      });
      if (response.success) {
        setMessage({ type: 'success', text: `Chatbot ${!currentStatus ? 'activated' : 'deactivated'} successfully!` });
        loadChatbots();
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to update chatbot status' });
      }
    } catch (error) {
      console.error('Error updating chatbot status:', error);
      setMessage({ type: 'error', text: 'Failed to update chatbot status' });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter chatbots
  const filteredChatbots = chatbots.filter(chatbot => {
    const matchesSearch = chatbot.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && chatbot.active) ||
                         (statusFilter === 'inactive' && !chatbot.active);
    return matchesSearch && matchesStatus;
  });

  // Get origin info
  const getOriginInfo = (origin: any) => {
    try {
      const originData = typeof origin === 'string' ? JSON.parse(origin) : origin;
      return originData || { title: 'Meta', code: 'META' };
    } catch {
      return { title: 'Meta', code: 'META' };
    }
  };

  useEffect(() => {
    loadChatbots();
    loadFlows();
  }, []);

  // Auto-hide messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Chatbot Manager</h2>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 border-b ${
          message.type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span className={`text-sm ${
              message.type === 'success' ? 'text-green-700' : 'text-red-700'
            }`}>
              {message.text}
            </span>
          </div>
        </div>
      )}

      <div className="p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search chatbots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateChatbot(true)}
            className="btn-primary btn-md flex items-center"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Chatbot
          </button>
        </div>

        {/* Create Chatbot Form */}
        {showCreateChatbot && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Chatbot</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chatbot Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter chatbot title"
                  value={newChatbot.title}
                  onChange={(e) => setNewChatbot({...newChatbot, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Flow *
                </label>
                <select
                  value={newChatbot.flow?.id || ''}
                  onChange={(e) => {
                    const selectedFlow = flows.find(f => f.id === parseInt(e.target.value));
                    setNewChatbot({...newChatbot, flow: selectedFlow || null});
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a flow</option>
                  {flows.map((flow) => (
                    <option key={flow.id} value={flow.id}>
                      {flow.title || flow.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origin Platform
                </label>
                <select
                  value={newChatbot.origin.code}
                  onChange={(e) => setNewChatbot({
                    ...newChatbot, 
                    origin: {
                      ...newChatbot.origin,
                      code: e.target.value,
                      title: e.target.value === 'META' ? 'Meta' : 'QR'
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="META">Meta (WhatsApp Business API)</option>
                  <option value="QR">QR Code Instance</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={createChatbot}
                disabled={isLoading || !newChatbot.title.trim() || !newChatbot.flow}
                className="btn-primary btn-md"
              >
                Create Chatbot
              </button>
              <button
                onClick={() => {
                  setShowCreateChatbot(false);
                  setNewChatbot({
                    title: '',
                    flow: null,
                    origin: {
                      title: 'Meta',
                      code: 'META',
                      data: {}
                    }
                  });
                }}
                className="btn-secondary btn-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Chatbots Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChatbots.map((chatbot) => {
            const originInfo = getOriginInfo(chatbot.origin);
            return (
              <div
                key={chatbot.id}
                className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-6 w-6 text-primary-600" />
                      <h3 className="text-lg font-semibold text-gray-900">{chatbot.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        chatbot.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {chatbot.active ? <Play className="h-3 w-3 mr-1" /> : <Pause className="h-3 w-3 mr-1" />}
                        {chatbot.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Workflow className="h-4 w-4 mr-2" />
                      <span>Flow ID: {chatbot.flow_id}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span>Platform: {originInfo.title}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Created: {new Date(chatbot.created_at).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleChatbotStatus(chatbot.id, chatbot.active)}
                        className={`p-2 rounded ${
                          chatbot.active 
                            ? 'text-red-600 hover:bg-red-50' 
                            : 'text-green-600 hover:bg-green-50'
                        }`}
                        title={chatbot.active ? 'Deactivate' : 'Activate'}
                      >
                        {chatbot.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-400 hover:text-gray-600"
                        title="Settings"
                      >
                        <Settings className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => deleteChatbot(chatbot.id, chatbot.title)}
                      className="p-2 text-gray-400 hover:text-red-600"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredChatbots.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'No chatbots found matching your filters' 
                : 'No chatbots created yet'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setShowCreateChatbot(true)}
                className="mt-4 btn-primary btn-md"
              >
                Create Your First Chatbot
              </button>
            )}
          </div>
        )}

        {/* Summary */}
        {chatbots.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {filteredChatbots.length} of {chatbots.length} chatbots
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">
                Active: {chatbots.filter(c => c.active).length}
              </span>
              <span className="text-gray-600">
                Inactive: {chatbots.filter(c => !c.active).length}
              </span>
            </div>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
}
