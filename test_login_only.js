const axios = require('axios');

const BASE_URL = 'http://localhost:8001';

// Test login function
const testLogin = async () => {
  console.log('🔐 Testing Login Process...');
  
  const credentials = {
    email: 'user@test.com',
    password: 'admin123'
  };
  
  try {
    console.log('📤 Sending login request...');
    console.log('URL:', `${BASE_URL}/api/user/login`);
    console.log('Credentials:', credentials);
    
    const response = await axios.post(`${BASE_URL}/api/user/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📥 Response received:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success && response.data.token) {
      console.log('✅ Login successful!');
      console.log('🔑 Token:', response.data.token.substring(0, 20) + '...');
      
      // Test authenticated request
      console.log('\n🔒 Testing authenticated request...');
      const dashboardResponse = await axios.get(`${BASE_URL}/api/user/get_dashboard`, {
        headers: {
          'Authorization': `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📊 Dashboard response:');
      console.log('Status:', dashboardResponse.status);
      console.log('Data:', JSON.stringify(dashboardResponse.data, null, 2));
      
      if (dashboardResponse.data && !dashboardResponse.data.logout) {
        console.log('✅ Authenticated request successful!');
      } else {
        console.log('❌ Authenticated request failed');
      }
      
    } else {
      console.log('❌ Login failed:', response.data);
    }
    
  } catch (error) {
    console.log('❌ Login error:');
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('Message:', error.message);
  }
};

// Test server connectivity
const testServer = async () => {
  console.log('🌐 Testing server connectivity...');
  
  try {
    const response = await axios.get(`${BASE_URL}/api/web/config`);
    console.log('✅ Server is responding');
    console.log('Config:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Server connectivity failed:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🧪 Starting Login Tests...\n');
  
  await testServer();
  console.log('\n' + '='.repeat(50) + '\n');
  await testLogin();
  
  console.log('\n🏁 Tests completed!');
};

runTests().catch(console.error);
