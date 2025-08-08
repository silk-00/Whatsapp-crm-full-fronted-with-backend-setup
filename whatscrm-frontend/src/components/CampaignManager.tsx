import { useState, useEffect } from 'react';
import { 
  Send, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2,
  Calendar,
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { campaignAPI, phonebookAPI, templateAPI } from '../lib/api';
import type { Campaign, Phonebook, Template } from '../types/api';

interface CampaignManagerProps {
  onClose?: () => void;
}

export default function CampaignManager({ onClose }: CampaignManagerProps) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [phonebooks, setPhonebooks] = useState<Phonebook[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    title: '',
    phonebook_id: '',
    phonebook_name: '',
    template_id: '',
    message: '',
    schedule: '',
    type: 'text' as 'text' | 'template'
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load campaigns
  const loadCampaigns = async () => {
    try {
      setIsLoading(true);
      const response = await campaignAPI.getAll();
      if (response.success) {
        setCampaigns(response.campaigns || []);
      }
    } catch (error) {
      console.error('Error loading campaigns:', error);
      setMessage({ type: 'error', text: 'Failed to load campaigns' });
    } finally {
      setIsLoading(false);
    }
  };

  // Load phonebooks
  const loadPhonebooks = async () => {
    try {
      const response = await phonebookAPI.getAll();
      if (response.success) {
        setPhonebooks(response.data || []);
      }
    } catch (error) {
      console.error('Error loading phonebooks:', error);
    }
  };

  // Load templates
  const loadTemplates = async () => {
    try {
      const response = await templateAPI.getAll();
      if (response.success) {
        setTemplates(response.data || []);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  // Create campaign
  const createCampaign = async () => {
    if (!newCampaign.title.trim() || !newCampaign.phonebook_id) return;
    
    try {
      setIsLoading(true);
      
      let response;
      if (newCampaign.type === 'template' && newCampaign.template_id) {
        // Create template campaign
        response = await campaignAPI.createTemplate({
          title: newCampaign.title,
          phonebook_id: parseInt(newCampaign.phonebook_id),
          phonebook_name: newCampaign.phonebook_name,
          template_id: parseInt(newCampaign.template_id),
          schedule: newCampaign.schedule || null
        });
      } else {
        // Create text campaign
        response = await campaignAPI.create({
          title: newCampaign.title,
          phonebook_id: parseInt(newCampaign.phonebook_id),
          phonebook_name: newCampaign.phonebook_name,
          message: newCampaign.message,
          schedule: newCampaign.schedule || null
        });
      }
      
      if (response.success) {
        setMessage({ type: 'success', text: 'Campaign created successfully!' });
        setNewCampaign({
          title: '',
          phonebook_id: '',
          phonebook_name: '',
          template_id: '',
          message: '',
          schedule: '',
          type: 'text'
        });
        setShowCreateCampaign(false);
        loadCampaigns();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to create campaign' });
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      setMessage({ type: 'error', text: 'Failed to create campaign' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete campaign
  const deleteCampaign = async (campaign: Campaign) => {
    if (!confirm(`Are you sure you want to delete "${campaign.title}"?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await campaignAPI.delete(campaign.id.toString());
      if (response.success) {
        setMessage({ type: 'success', text: 'Campaign deleted successfully!' });
        loadCampaigns();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to delete campaign' });
      }
    } catch (error) {
      console.error('Error deleting campaign:', error);
      setMessage({ type: 'error', text: 'Failed to delete campaign' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle phonebook selection
  const handlePhonebookChange = (phonebookId: string) => {
    const selectedPhonebook = phonebooks.find(p => p.id.toString() === phonebookId);
    setNewCampaign({
      ...newCampaign,
      phonebook_id: phonebookId,
      phonebook_name: selectedPhonebook?.name || ''
    });
  };

  // Filter campaigns
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.phonebook_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'RUNNING': return 'bg-blue-100 text-blue-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'FAILED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <CheckCircle className="h-4 w-4" />;
      case 'RUNNING': return <Clock className="h-4 w-4" />;
      case 'PENDING': return <Clock className="h-4 w-4" />;
      case 'FAILED': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    loadCampaigns();
    loadPhonebooks();
    loadTemplates();
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
          <h2 className="text-xl font-semibold text-gray-900">Campaign Manager</h2>
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
                placeholder="Search campaigns..."
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
              <option value="PENDING">Pending</option>
              <option value="RUNNING">Running</option>
              <option value="COMPLETED">Completed</option>
              <option value="FAILED">Failed</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateCampaign(true)}
            className="btn-primary btn-md flex items-center"
            disabled={isLoading}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Campaign
          </button>
        </div>

        {/* Create Campaign Form */}
        {showCreateCampaign && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Campaign</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter campaign title"
                  value={newCampaign.title}
                  onChange={(e) => setNewCampaign({...newCampaign, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phonebook *
                </label>
                <select
                  value={newCampaign.phonebook_id}
                  onChange={(e) => handlePhonebookChange(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select phonebook</option>
                  {phonebooks.map((phonebook) => (
                    <option key={phonebook.id} value={phonebook.id}>
                      {phonebook.name} ({phonebook.contact_count || 0} contacts)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Type
                </label>
                <select
                  value={newCampaign.type}
                  onChange={(e) => setNewCampaign({...newCampaign, type: e.target.value as 'text' | 'template'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="text">Text Message</option>
                  <option value="template">Template Message</option>
                </select>
              </div>

              {newCampaign.type === 'template' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Template
                  </label>
                  <select
                    value={newCampaign.template_id}
                    onChange={(e) => setNewCampaign({...newCampaign, template_id: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select template</option>
                    {templates.map((template) => (
                      <option key={template.id} value={template.id}>
                        {template.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={newCampaign.schedule}
                  onChange={(e) => setNewCampaign({...newCampaign, schedule: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>

            {newCampaign.type === 'text' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  placeholder="Enter your message"
                  value={newCampaign.message}
                  onChange={(e) => setNewCampaign({...newCampaign, message: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={createCampaign}
                disabled={isLoading || !newCampaign.title.trim() || !newCampaign.phonebook_id || 
                         (newCampaign.type === 'text' && !newCampaign.message.trim()) ||
                         (newCampaign.type === 'template' && !newCampaign.template_id)}
                className="btn-primary btn-md"
              >
                Create Campaign
              </button>
              <button
                onClick={() => {
                  setShowCreateCampaign(false);
                  setNewCampaign({
                    title: '',
                    phonebook_id: '',
                    phonebook_name: '',
                    template_id: '',
                    message: '',
                    schedule: '',
                    type: 'text'
                  });
                }}
                className="btn-secondary btn-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Campaigns Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Campaign
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phonebook
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Send className="h-5 w-5 text-gray-400 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{campaign.title}</div>
                        <div className="text-sm text-gray-500">ID: {campaign.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                      {getStatusIcon(campaign.status)}
                      <span className="ml-1">{campaign.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{campaign.phonebook_name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Send className="h-4 w-4 text-blue-500 mr-1" />
                          {campaign.sent_count || 0}
                        </span>
                        <span className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          {campaign.delivered_count || 0}
                        </span>
                        <span className="flex items-center">
                          <Eye className="h-4 w-4 text-purple-500 mr-1" />
                          {campaign.read_count || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(campaign.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => deleteCampaign(campaign)}
                        className="text-gray-400 hover:text-red-600"
                        disabled={isLoading}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <Send className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No campaigns found matching your filters' 
                  : 'No campaigns created yet'}
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <button
                  onClick={() => setShowCreateCampaign(true)}
                  className="mt-4 btn-primary btn-md"
                >
                  Create Your First Campaign
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      )}
    </div>
  );
}
