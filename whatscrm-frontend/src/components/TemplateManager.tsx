import { useState, useEffect } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Edit, 
  Trash2,
  Eye,
  MessageSquare,
  Image,
  Video,
  File,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { templateAPI } from '../lib/api';
import type { Template } from '../types/api';

interface TemplateManagerProps {
  onClose?: () => void;
}

export default function TemplateManager({ onClose }: TemplateManagerProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCreateTemplate, setShowCreateTemplate] = useState(false);
  const [selectedTemplates, setSelectedTemplates] = useState<number[]>([]);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    type: 'text' as 'text' | 'media' | 'interactive',
    content: {
      text: '',
      media: {
        type: 'image',
        url: ''
      },
      buttons: []
    },
    language: 'en'
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load templates
  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const response = await templateAPI.getAll();
      if (response.success) {
        setTemplates(response.data || []);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setMessage({ type: 'error', text: 'Failed to load templates' });
    } finally {
      setIsLoading(false);
    }
  };

  // Create template
  const createTemplate = async () => {
    if (!newTemplate.title.trim()) return;
    
    try {
      setIsLoading(true);
      const response = await templateAPI.create(newTemplate);
      if (response.success) {
        setMessage({ type: 'success', text: 'Template created successfully!' });
        setNewTemplate({
          title: '',
          type: 'text',
          content: {
            text: '',
            media: {
              type: 'image',
              url: ''
            },
            buttons: []
          },
          language: 'en'
        });
        setShowCreateTemplate(false);
        loadTemplates();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to create template' });
      }
    } catch (error) {
      console.error('Error creating template:', error);
      setMessage({ type: 'error', text: 'Failed to create template' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete selected templates
  const deleteSelectedTemplates = async () => {
    if (selectedTemplates.length === 0) return;
    
    if (!confirm(`Are you sure you want to delete ${selectedTemplates.length} template(s)?`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await templateAPI.delete(selectedTemplates);
      if (response.success) {
        setMessage({ type: 'success', text: `${selectedTemplates.length} template(s) deleted successfully!` });
        setSelectedTemplates([]);
        loadTemplates();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to delete templates' });
      }
    } catch (error) {
      console.error('Error deleting templates:', error);
      setMessage({ type: 'error', text: 'Failed to delete templates' });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle template selection
  const toggleTemplateSelection = (templateId: number) => {
    setSelectedTemplates(prev => 
      prev.includes(templateId) 
        ? prev.filter(id => id !== templateId)
        : [...prev, templateId]
    );
  };

  // Select all templates
  const selectAllTemplates = () => {
    if (selectedTemplates.length === filteredTemplates.length) {
      setSelectedTemplates([]);
    } else {
      setSelectedTemplates(filteredTemplates.map(t => t.id));
    }
  };

  // Filter templates
  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || template.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Get template type icon
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'text': return <MessageSquare className="h-4 w-4" />;
      case 'media': return <Image className="h-4 w-4" />;
      case 'interactive': return <File className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Get template type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'text': return 'bg-blue-100 text-blue-800';
      case 'media': return 'bg-green-100 text-green-800';
      case 'interactive': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
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
          <h2 className="text-xl font-semibold text-gray-900">Template Manager</h2>
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
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="text">Text</option>
              <option value="media">Media</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>

          <div className="flex space-x-3">
            {selectedTemplates.length > 0 && (
              <button
                onClick={deleteSelectedTemplates}
                className="btn-secondary btn-md flex items-center text-red-600 border-red-300 hover:bg-red-50"
                disabled={isLoading}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete ({selectedTemplates.length})
              </button>
            )}
            <button
              onClick={() => setShowCreateTemplate(true)}
              className="btn-primary btn-md flex items-center"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Template
            </button>
          </div>
        </div>

        {/* Create Template Form */}
        {showCreateTemplate && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Template</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Title *
                </label>
                <input
                  type="text"
                  placeholder="Enter template title"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({...newTemplate, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Type
                </label>
                <select
                  value={newTemplate.type}
                  onChange={(e) => setNewTemplate({...newTemplate, type: e.target.value as 'text' | 'media' | 'interactive'})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="text">Text Message</option>
                  <option value="media">Media Message</option>
                  <option value="interactive">Interactive Message</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Language
                </label>
                <select
                  value={newTemplate.language}
                  onChange={(e) => setNewTemplate({...newTemplate, language: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="hi">Hindi</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message Content *
              </label>
              <textarea
                placeholder="Enter your message content"
                value={newTemplate.content.text}
                onChange={(e) => setNewTemplate({
                  ...newTemplate, 
                  content: {...newTemplate.content, text: e.target.value}
                })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">
                Use variables like &#123;&#123;name&#125;&#125;, &#123;&#123;company&#125;&#125;, &#123;&#123;var1&#125;&#125;, etc. for personalization
              </p>
            </div>

            {newTemplate.type === 'media' && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Media URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={newTemplate.content.media.url}
                  onChange={(e) => setNewTemplate({
                    ...newTemplate,
                    content: {
                      ...newTemplate.content,
                      media: {...newTemplate.content.media, url: e.target.value}
                    }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={createTemplate}
                disabled={isLoading || !newTemplate.title.trim() || !newTemplate.content.text.trim()}
                className="btn-primary btn-md"
              >
                Create Template
              </button>
              <button
                onClick={() => {
                  setShowCreateTemplate(false);
                  setNewTemplate({
                    title: '',
                    type: 'text',
                    content: {
                      text: '',
                      media: {
                        type: 'image',
                        url: ''
                      },
                      buttons: []
                    },
                    language: 'en'
                  });
                }}
                className="btn-secondary btn-md"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`bg-white rounded-lg border-2 transition-colors ${
                selectedTemplates.includes(template.id)
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedTemplates.includes(template.id)}
                      onChange={() => toggleTemplateSelection(template.id)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(template.type)}`}>
                      {getTypeIcon(template.type)}
                      <span className="ml-1 capitalize">{template.type}</span>
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 uppercase">{template.language}</span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.title}</h3>
                
                <div className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {typeof template.content === 'string' 
                    ? template.content 
                    : template.content?.text || 'No content'}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {new Date(template.created_at).toLocaleDateString()}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-primary-600">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => toggleTemplateSelection(template.id)}
                      className="p-2 text-gray-400 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500">
              {searchTerm || typeFilter !== 'all' 
                ? 'No templates found matching your filters' 
                : 'No templates created yet'}
            </p>
            {!searchTerm && typeFilter === 'all' && (
              <button
                onClick={() => setShowCreateTemplate(true)}
                className="mt-4 btn-primary btn-md"
              >
                Create Your First Template
              </button>
            )}
          </div>
        )}

        {/* Bulk Actions */}
        {templates.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={selectAllTemplates}
                className="text-sm text-primary-600 hover:text-primary-900"
              >
                {selectedTemplates.length === filteredTemplates.length ? 'Deselect All' : 'Select All'}
              </button>
              {selectedTemplates.length > 0 && (
                <span className="text-sm text-gray-500">
                  {selectedTemplates.length} template(s) selected
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">
              {filteredTemplates.length} of {templates.length} templates
            </span>
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
