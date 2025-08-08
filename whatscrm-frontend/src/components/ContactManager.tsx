import { useState, useEffect } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Upload, 
  Edit, 
  Trash2, 
  Download,
  FileText,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { phonebookAPI } from '../lib/api';
import type { Phonebook, Contact } from '../types/api';

interface ContactManagerProps {
  onClose?: () => void;
}

export default function ContactManager({ onClose }: ContactManagerProps) {
  const [phonebooks, setPhonebooks] = useState<Phonebook[]>([]);
  const [selectedPhonebook, setSelectedPhonebook] = useState<Phonebook | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddPhonebook, setShowAddPhonebook] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newPhonebookName, setNewPhonebookName] = useState('');
  const [newContact, setNewContact] = useState({
    name: '',
    mobile: '',
    var1: '',
    var2: '',
    var3: '',
    var4: '',
    var5: ''
  });
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Load phonebooks
  const loadPhonebooks = async () => {
    try {
      setIsLoading(true);
      const response = await phonebookAPI.getAll();
      if (response.success) {
        setPhonebooks(response.data || []);
      }
    } catch (error) {
      console.error('Error loading phonebooks:', error);
      setMessage({ type: 'error', text: 'Failed to load phonebooks' });
    } finally {
      setIsLoading(false);
    }
  };

  // Load contacts for selected phonebook
  const loadContacts = async () => {
    try {
      setIsLoading(true);
      const response = await phonebookAPI.getContacts();
      if (response.success) {
        const allContacts = response.data || [];
        const filteredContacts = selectedPhonebook 
          ? allContacts.filter((contact: Contact) => contact.phonebook_id === selectedPhonebook.id)
          : allContacts;
        setContacts(filteredContacts);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
      setMessage({ type: 'error', text: 'Failed to load contacts' });
    } finally {
      setIsLoading(false);
    }
  };

  // Create new phonebook
  const createPhonebook = async () => {
    if (!newPhonebookName.trim()) {
      setMessage({ type: 'error', text: 'Please enter a phonebook name' });
      return;
    }

    try {
      setIsLoading(true);
      console.log('Creating phonebook:', newPhonebookName);
      const response = await phonebookAPI.create(newPhonebookName);
      console.log('Phonebook creation response:', response);

      if (response.success) {
        setMessage({ type: 'success', text: 'Phonebook created successfully!' });
        setNewPhonebookName('');
        setShowAddPhonebook(false);
        loadPhonebooks();
      } else {
        setMessage({ type: 'error', text: response.message || response.msg || 'Failed to create phonebook' });
      }
    } catch (error) {
      console.error('Error creating phonebook:', error);
      setMessage({ type: 'error', text: `Failed to create phonebook: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Add new contact
  const addContact = async () => {
    if (!newContact.name.trim() || !newContact.mobile.trim() || !selectedPhonebook) {
      setMessage({ type: 'error', text: 'Please fill in name, mobile, and select a phonebook' });
      return;
    }

    try {
      setIsLoading(true);
      const contactData = {
        ...newContact,
        phonebook_id: selectedPhonebook.id,
        phonebook_name: selectedPhonebook.name
      };

      console.log('Adding contact:', contactData);
      const response = await phonebookAPI.addContact(contactData);
      console.log('Add contact response:', response);

      if (response.success) {
        setMessage({ type: 'success', text: 'Contact added successfully!' });
        setNewContact({
          name: '',
          mobile: '',
          var1: '',
          var2: '',
          var3: '',
          var4: '',
          var5: ''
        });
        setShowAddContact(false);
        loadContacts();
      } else {
        setMessage({ type: 'error', text: response.message || response.msg || 'Failed to add contact' });
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      setMessage({ type: 'error', text: `Failed to add contact: ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete phonebook
  const deletePhonebook = async (phonebook: Phonebook) => {
    if (!confirm(`Are you sure you want to delete "${phonebook.name}"? This will also delete all contacts in this phonebook.`)) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await phonebookAPI.delete(phonebook.id);
      if (response.success) {
        setMessage({ type: 'success', text: 'Phonebook deleted successfully!' });
        if (selectedPhonebook?.id === phonebook.id) {
          setSelectedPhonebook(null);
          setContacts([]);
        }
        loadPhonebooks();
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to delete phonebook' });
      }
    } catch (error) {
      console.error('Error deleting phonebook:', error);
      setMessage({ type: 'error', text: 'Failed to delete phonebook' });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle CSV import
  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !selectedPhonebook) return;

    try {
      setIsLoading(true);
      const response = await phonebookAPI.importContacts(file, {
        id: selectedPhonebook.id,
        phonebook_name: selectedPhonebook.name
      });
      
      if (response.success) {
        setMessage({ type: 'success', text: `Imported ${response.imported || 0} contacts successfully!` });
        loadContacts();
        loadPhonebooks(); // Refresh to update contact counts
      } else {
        setMessage({ type: 'error', text: response.message || 'Failed to import contacts' });
      }
    } catch (error) {
      console.error('Error importing contacts:', error);
      setMessage({ type: 'error', text: 'Failed to import contacts' });
    } finally {
      setIsLoading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  // Filter contacts based on search
  const filteredContacts = contacts.filter(contact =>
    contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.mobile?.includes(searchTerm)
  );

  useEffect(() => {
    loadPhonebooks();
  }, []);

  useEffect(() => {
    if (selectedPhonebook) {
      loadContacts();
    }
  }, [selectedPhonebook]);

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
          <h2 className="text-xl font-semibold text-gray-900">Contact Manager</h2>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Phonebooks List */}
          <div className="lg:col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">Phonebooks</h3>
              <button
                onClick={() => setShowAddPhonebook(true)}
                className="btn-primary btn-sm flex items-center"
                disabled={isLoading}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </button>
            </div>

            {/* Add Phonebook Form */}
            {showAddPhonebook && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  placeholder="Phonebook name"
                  value={newPhonebookName}
                  onChange={(e) => setNewPhonebookName(e.target.value)}
                  className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex space-x-2">
                  <button
                    onClick={createPhonebook}
                    disabled={isLoading || !newPhonebookName.trim()}
                    className="btn-primary btn-sm"
                  >
                    Create
                  </button>
                  <button
                    onClick={() => {
                      setShowAddPhonebook(false);
                      setNewPhonebookName('');
                    }}
                    className="btn-secondary btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Phonebooks List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {phonebooks.map((phonebook) => (
                <div
                  key={phonebook.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedPhonebook?.id === phonebook.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPhonebook(phonebook)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{phonebook.name}</h4>
                      <p className="text-sm text-gray-500">{phonebook.contact_count || 0} contacts</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deletePhonebook(phonebook);
                      }}
                      className="text-gray-400 hover:text-red-600"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contacts Management */}
          <div className="lg:col-span-2">
            {selectedPhonebook ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Contacts in "{selectedPhonebook.name}"
                  </h3>
                  <div className="flex space-x-2">
                    <label className="btn-secondary btn-sm flex items-center cursor-pointer">
                      <Upload className="h-4 w-4 mr-1" />
                      Import CSV
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVImport}
                        className="hidden"
                        disabled={isLoading}
                      />
                    </label>
                    <button
                      onClick={() => setShowAddContact(true)}
                      className="btn-primary btn-sm flex items-center"
                      disabled={isLoading}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Contact
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Add Contact Form */}
                {showAddContact && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">Add New Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Name *"
                        value={newContact.name}
                        onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Mobile *"
                        value={newContact.mobile}
                        onChange={(e) => setNewContact({...newContact, mobile: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Custom Field 1"
                        value={newContact.var1}
                        onChange={(e) => setNewContact({...newContact, var1: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Custom Field 2"
                        value={newContact.var2}
                        onChange={(e) => setNewContact({...newContact, var2: e.target.value})}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex space-x-2 mt-3">
                      <button
                        onClick={addContact}
                        disabled={isLoading || !newContact.name.trim() || !newContact.mobile.trim()}
                        className="btn-primary btn-sm"
                      >
                        Add Contact
                      </button>
                      <button
                        onClick={() => {
                          setShowAddContact(false);
                          setNewContact({
                            name: '',
                            mobile: '',
                            var1: '',
                            var2: '',
                            var3: '',
                            var4: '',
                            var5: ''
                          });
                        }}
                        className="btn-secondary btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Contacts Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Mobile
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Custom Fields
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredContacts.map((contact) => (
                        <tr key={contact.id}>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{contact.name}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{contact.mobile}</div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {[contact.var1, contact.var2, contact.var3].filter(Boolean).join(', ') || '-'}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-primary-600 hover:text-primary-900">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button className="text-gray-400 hover:text-red-600">
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredContacts.length === 0 && (
                    <div className="text-center py-8">
                      <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-gray-500">
                        {searchTerm ? 'No contacts found matching your search' : 'No contacts in this phonebook'}
                      </p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500">Select a phonebook to view and manage contacts</p>
              </div>
            )}
          </div>
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
