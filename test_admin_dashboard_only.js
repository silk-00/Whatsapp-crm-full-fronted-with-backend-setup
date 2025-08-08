const axios = require('axios');

const BASE_URL = 'http://localhost:8001';

// Test admin dashboard endpoints
const testAdminDashboard = async () => {
  console.log('🧪 Testing Admin Dashboard Endpoints...\n');
  
  // First login as admin
  console.log('🔐 Logging in as admin...');
  const loginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
    email: 'admin@whatscrm.com',
    password: 'admin123'
  });
  
  if (!loginResponse.data.success) {
    console.log('❌ Admin login failed');
    return;
  }
  
  const token = loginResponse.data.token;
  console.log('✅ Admin login successful');
  
  // Test different dashboard endpoints
  const endpoints = [
    '/api/admin/get_dashboard_for_user',
    '/api/admin/get_analytics'
  ];
  
  for (const endpoint of endpoints) {
    console.log(`\n📊 Testing ${endpoint}...`);
    
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Status:', response.status);
      console.log('Response:', JSON.stringify(response.data, null, 2));
      
      if (response.data.success) {
        console.log('✅ Endpoint working successfully');
      } else {
        console.log('❌ Endpoint returned error:', response.data.msg || response.data.error);
      }
      
    } catch (error) {
      console.log('❌ Request failed:');
      console.log('Status:', error.response?.status);
      console.log('Error:', error.response?.data || error.message);
    }
  }
};

testAdminDashboard().catch(console.error);
