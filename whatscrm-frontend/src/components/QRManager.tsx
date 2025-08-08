import { useState, useEffect } from 'react';
import { 
  QrCode, 
  Plus, 
  Search, 
  Smartphone,
  Wifi,
  WifiOff,
  Trash2,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock,
  Eye,
  Settings
} from 'lucide-react';
import { qrAPI } from '../lib/api';
import type { QRInstance } from '../types/api';

interface QRManagerProps {
  onClose?: () => void;
}

export default function QRManager({ onClose }: QRManagerProps) {
  const [instances, setInstances] = useState<QRInstance[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showCreateInstance, setShowCreateInstance] = useState(false);
  const [newInstance, setNewInstance] = useState({
    title: '',
    uniqueId: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load instances
  const loadInstances = async () => {
    try {
      setIsLoading(true);
      const response = await qrAPI.getAll();
      if (response.success) {
        setInstances(response.data || []);
      }
    } catch (error) {
      console.error('Error loading instances:', error);
      setMessage({ type: 'error', text: 'Failed to load QR instances' });
    } finally {
      setIsLoading(false);
    }
  };

  // Create new instance
  const createInstance = async () => {
    if (!newInstance.title.trim() || !newInstance.uniqueId.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Creating QR instance:', newInstance);
      const response = await qrAPI.create(newInstance);
      console.log('QR creation response:', response);

      if (response.success) {
        setMessage({ type: 'success', text: 'QR instance created successfully!' });
        setNewInstance({ title: '', uniqueId: '' });
        setShowCreateInstance(false);
        loadInstances();
      } else {
        setMessage({ type: 'error', text: response.msg || response.message || 'Failed to create QR instance' });
      }
    } catch (error) {
      console.error('Error creating instance:', error);
      setMessage({ type: 'error', text: `Failed to create QR instance: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete instance
  const deleteInstance = async (uniqueId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await qrAPI.delete(uniqueId);
      if (response.success) {
        setMessage({ type: 'success', text: 'QR instance deleted successfully!' });
        loadInstances();
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to delete QR instance' });
      }
    } catch (error) {
      console.error('Error deleting instance:', error);
      setMessage({ type: 'error', text: 'Failed to delete QR instance' });
    } finally {
      setIsLoading(false);
    }
  };

  // Change instance status
  const changeInstanceStatus = async (instanceData: any) => {
    try {
      setIsLoading(true);
      const response = await qrAPI.changeStatus(instanceData);
      if (response.success) {
        setMessage({ type: 'success', text: 'Status updated successfully!' });
        loadInstances();
      } else {
        setMessage({ type: 'error', text: response.msg || 'Failed to update status' });
      }
    } catch (error) {
      console.error('Error changing status:', error);
      setMessage({ type: 'error', text: 'Failed to update status' });
    } finally {
      setIsLoading(false);
    }
  };

  // Generate unique ID
  const generateUniqueId = () => {
    const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    setNewInstance({ ...newInstance, uniqueId: randomId });
  };

  // Filter instances
  const filteredInstances = instances.filter(instance => {
    const matchesSearch = instance.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         instance.uniqueId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || instance.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'GENERATING': return 'bg-yellow-100 text-yellow-800';
      case 'INACTIVE': return 'bg-red-100 text-red-800';
      case 'CONNECTING': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE': return <Wifi className="h-4 w-4" />;
      case 'GENERATING': return <Clock className="h-4 w-4" />;
      case 'INACTIVE': return <WifiOff className="h-4 w-4" />;
      case 'CONNECTING': return <RefreshCw className="h-4 w-4 animate-spin" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  useEffect(() => {
    loadInstances();
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
          <h2 className="text-xl font-semibold text-gray-900">QR Code Manager</h2>
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
                placeholder="Search instances..."
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
              <option value="ACTIVE">Active</option>
              <option value="GENERATING">Generating</option>
              <option value="INACTIVE">Inactive</option>
              <option value="CONNECTING">Connecting</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => loadInstances()}
              className="btn-secondary btn-md flex items-center"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={() => setShowCreateInstance(true)}
              className="btn-primary btn-md flex items-center"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Instance
            </button>
          </div>
        </div>

        {/* Create Instance Form */}
        {showCreateInstance && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New QR Instance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Instance Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter instance title"
                  value={newInstance.title}
                  onChange={(e) => setNewInstance({...newInstance, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unique ID *
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter unique ID"
                    value={newInstance.uniqueId}
                    onChange={(e) => setNewInstance({...newInstance, uniqueId: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={generateUniqueId}
                    className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Generate
                  </button>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={createInstance}
                disabled={isLoading || !newInstance.title.trim() || !newInstance.uniqueId.trim()}
                className="btn-primary btn-md"
              >
                Create Instance
              </button>
              <button
                onClick={() => {
                  setShowCreateInstance(false);
                  setNewInstance({ title: '', uniqueId: '' });
                }}
                className="btn-secondary btn-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Instances Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInstances.map((instance) => (
            <div
              key={instance.id}
              className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <QrCode className="h-6 w-6 text-primary-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{instance.title}</h3>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(instance.status)}`}>
                    {getStatusIcon(instance.status)}
                    <span className="ml-1">{instance.status}</span>
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Smartphone className="h-4 w-4 mr-2" />
                    <span>ID: {instance.uniqueId}</span>
                  </div>
                  {instance.number && (
                    <div className="flex items-center text-sm text-gray-600">
                      <span>Number: {instance.number}</span>
                    </div>
                  )}
                  <div className="text-xs text-gray-500">
                    Created: {new Date(instance.created_at).toLocaleDateString()}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <button 
                      className="p-2 text-gray-400 hover:text-primary-600"
                      title="View QR Code"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button 
                      className="p-2 text-gray-400 hover:text-gray-600"
                      title="Settings"
                    >
                      <Settings className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => deleteInstance(instance.uniqueId, instance.title)}
                    className="p-2 text-gray-400 hover:text-red-600"
                    title="Delete Instance"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredInstances.length === 0 && (
          <div className="text-center py-12">
            <QrCode className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'No instances found matching your filters' 
                : 'No QR instances created yet'}
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <button
                onClick={() => setShowCreateInstance(true)}
                className="mt-4 btn-primary btn-md"
              >
                Create Your First Instance
              </button>
            )}
          </div>
        )}

        {/* Summary */}
        {instances.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              {filteredInstances.length} of {instances.length} instances
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">
                Active: {instances.filter(i => i.status === 'ACTIVE').length}
              </span>
              <span className="text-yellow-600">
                Generating: {instances.filter(i => i.status === 'GENERATING').length}
              </span>
              <span className="text-red-600">
                Inactive: {instances.filter(i => i.status === 'INACTIVE').length}
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
