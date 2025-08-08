const axios = require('axios');

const BASE_URL = 'http://localhost:8001';
let authToken = '';

// Test credentials
const testCredentials = {
  admin: { email: 'admin@whatscrm.com', password: 'admin123' },
  user: { email: 'user@test.com', password: 'admin123' },
  agent: { email: 'agent@test.com', password: 'admin123' }
};

// Helper function to make authenticated requests
const makeRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {},
      data
    };
    
    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
      status: error.response?.status,
      fullError: error.response || error
    };
  }
};

// Test authentication
const testAuthentication = async () => {
  console.log('\n🔐 Testing Authentication...');

  // Test user login
  const loginResult = await makeRequest('POST', '/api/user/login', testCredentials.user);

  console.log('Login result:', JSON.stringify(loginResult, null, 2));

  if (loginResult.success && loginResult.data && loginResult.data.success && loginResult.data.token) {
    authToken = loginResult.data.token;
    console.log('✅ User login successful');
    console.log('🔑 Token received:', authToken.substring(0, 20) + '...');
    return true;
  } else {
    console.log('❌ User login failed:', loginResult.error || loginResult.data);
    return false;
  }
};

// Test dashboard stats
const testDashboard = async () => {
  console.log('\n📊 Testing Dashboard...');

  if (!authToken) {
    console.log('❌ Dashboard test skipped - no auth token');
    return false;
  }

  const result = await makeRequest('GET', '/api/user/get_dashboard');

  if (result.success && result.data && !result.data.logout) {
    console.log('✅ Dashboard stats loaded successfully');
    console.log('📈 Stats:', JSON.stringify(result.data, null, 2));
    return true;
  } else {
    console.log('❌ Dashboard stats failed:', result.error || result.data);
    return false;
  }
};

// Test phonebook operations
const testPhonebooks = async () => {
  console.log('\n📞 Testing Phonebook Operations...');

  // Get all phonebooks
  const getResult = await makeRequest('GET', '/api/phonebook/get_by_uid');
  if (getResult.success) {
    console.log('✅ Get phonebooks successful');
  } else {
    console.log('❌ Get phonebooks failed:', getResult.error);
    return false;
  }

  // Create a test phonebook
  const createResult = await makeRequest('POST', '/api/phonebook/add', { name: 'Test Phonebook' });
  console.log('Create phonebook result:', JSON.stringify(createResult, null, 2));

  if (createResult.success && createResult.data && createResult.data.success) {
    console.log('✅ Create phonebook successful');

    // Add a test contact
    const contactData = {
      name: 'Test Contact',
      mobile: '1234567890',
      id: 1, // Use a default phonebook ID
      phonebook_name: 'Test Phonebook'
    };

    const addContactResult = await makeRequest('POST', '/api/phonebook/add_single_contact', contactData);
    console.log('Add contact result:', JSON.stringify(addContactResult, null, 2));

    if (addContactResult.success && addContactResult.data && addContactResult.data.success) {
      console.log('✅ Add contact successful');
    } else {
      console.log('❌ Add contact failed:', addContactResult.error || addContactResult.fullError);
    }

    return true;
  } else {
    console.log('❌ Create phonebook failed:', createResult.error || createResult.fullError);
    return false;
  }
};

// Test template operations
const testTemplates = async () => {
  console.log('\n📝 Testing Template Operations...');

  // Get all templates
  const getResult = await makeRequest('GET', '/api/templet/get_templets');
  if (getResult.success) {
    console.log('✅ Get templates successful');
  } else {
    console.log('❌ Get templates failed:', getResult.error);
    return false;
  }

  // Create a test template
  const templateData = {
    title: 'Test Template',
    type: 'text',
    content: 'Hello {{name}}, welcome to WhatsEra CRM!',
    language: 'en'
  };

  const createResult = await makeRequest('POST', '/api/templet/add_new', templateData);
  console.log('Create template result:', JSON.stringify(createResult, null, 2));

  if (createResult.success && createResult.data && createResult.data.success) {
    console.log('✅ Create template successful');
    return true;
  } else {
    console.log('❌ Create template failed:', createResult.error || createResult.fullError);
    return false;
  }
};

// Test campaign operations
const testCampaigns = async () => {
  console.log('\n📢 Testing Campaign Operations...');
  
  // Get all campaigns
  const getResult = await makeRequest('GET', '/api/broadcast/get_beta_campaigns');
  if (getResult.success) {
    console.log('✅ Get campaigns successful');
  } else {
    console.log('❌ Get campaigns failed:', getResult.error);
    return false;
  }
  
  // Create a test campaign
  const campaignData = {
    title: 'Test Campaign',
    message: 'Test message for campaign',
    phonebook_id: 1,
    phonebook_name: 'Test Phonebook'
  };
  
  const createResult = await makeRequest('POST', '/api/broadcast/add_new', campaignData);
  if (createResult.success) {
    console.log('✅ Create campaign successful');
    return true;
  } else {
    console.log('❌ Create campaign failed:', createResult.error);
    return false;
  }
};

// Test QR operations
const testQRCodes = async () => {
  console.log('\n📱 Testing QR Code Operations...');
  
  // Get all QR instances
  const getResult = await makeRequest('GET', '/api/qr/get_all');
  if (getResult.success) {
    console.log('✅ Get QR instances successful');
  } else {
    console.log('❌ Get QR instances failed:', getResult.error);
    return false;
  }
  
  // Create a test QR instance
  const qrData = {
    title: 'Test QR Instance',
    uniqueId: 'test_qr_' + Date.now()
  };
  
  const createResult = await makeRequest('POST', '/api/qr/gen_qr', qrData);
  if (createResult.success && createResult.data.success) {
    console.log('✅ Create QR instance successful');
    return true;
  } else {
    console.log('❌ Create QR instance failed:', createResult.error);
    return false;
  }
};

// Test inbox operations
const testInbox = async () => {
  console.log('\n💬 Testing Inbox Operations...');
  
  // Get all chats
  const getResult = await makeRequest('GET', '/api/inbox/get_chats');
  if (getResult.success) {
    console.log('✅ Get chats successful');
    return true;
  } else {
    console.log('❌ Get chats failed:', getResult.error);
    return false;
  }
};

// Test chatbot operations
const testChatbots = async () => {
  console.log('\n🤖 Testing Chatbot Operations...');
  
  // Get all chatbots
  const getResult = await makeRequest('GET', '/api/chatbot/get_beta_chatbots?type=wa_chatbot');
  if (getResult.success) {
    console.log('✅ Get chatbots successful');
    return true;
  } else {
    console.log('❌ Get chatbots failed:', getResult.error);
    return false;
  }
};

// Main test function
const runAllTests = async () => {
  console.log('🧪 Starting Comprehensive Functionality Tests...');
  console.log('🌐 Testing WhatsEra CRM at:', BASE_URL);
  
  const tests = [
    { name: 'Authentication', fn: testAuthentication },
    { name: 'Dashboard', fn: testDashboard },
    { name: 'Phonebooks', fn: testPhonebooks },
    { name: 'Templates', fn: testTemplates },
    { name: 'Campaigns', fn: testCampaigns },
    { name: 'QR Codes', fn: testQRCodes },
    { name: 'Inbox', fn: testInbox },
    { name: 'Chatbots', fn: testChatbots }
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.log(`❌ ${test.name} test crashed:`, error.message);
      failed++;
    }
  }
  
  console.log('\n📊 Test Results Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL TESTS PASSED! WhatsEra CRM is fully functional!');
  } else {
    console.log('\n⚠️  Some tests failed. Check the errors above for details.');
  }
};

// Run tests
runAllTests().catch(console.error);
