const axios = require('axios');

const BASE_URL = 'http://localhost:8001';

const testDashboardDirect = async () => {
  console.log('🧪 Testing Dashboard Endpoint Directly...\n');
  
  try {
    // First login as admin
    console.log('🔐 Logging in as admin...');
    const adminLoginResponse = await axios.post(`${BASE_URL}/api/admin/login`, {
      email: 'admin@whatscrm.com',
      password: 'admin123'
    });
    
    if (!adminLoginResponse.data.success) {
      console.log('❌ Admin login failed');
      return;
    }
    
    const adminToken = adminLoginResponse.data.token;
    console.log('✅ Admin login successful');
    
    // Use admin auto-login to get user token
    console.log('\n🔄 Using admin auto-login for user...');
    const autoLoginResponse = await axios.post(`${BASE_URL}/api/admin/auto_login`, {
      uid: 'user_uid_001'
    }, {
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (!autoLoginResponse.data.success) {
      console.log('❌ Auto login failed');
      return;
    }
    
    const userToken = autoLoginResponse.data.token;
    console.log('✅ User token obtained via auto-login');
    
    // Test dashboard endpoint directly
    console.log('\n📊 Testing dashboard endpoint directly...');
    const dashboardResponse = await axios.get(`${BASE_URL}/api/user/get_dashboard`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Dashboard Response Status:', dashboardResponse.status);
    console.log('Dashboard Response Data:');
    console.log(JSON.stringify(dashboardResponse.data, null, 2));
    
    if (dashboardResponse.data.success) {
      console.log('\n✅ Dashboard endpoint is working');
      
      if (dashboardResponse.data.stats) {
        console.log('\n📊 Stats Structure:');
        console.log('Keys:', Object.keys(dashboardResponse.data.stats));
        console.log('Values:', dashboardResponse.data.stats);
      }
      
      if (dashboardResponse.data.user) {
        console.log('\n👤 User Structure:');
        console.log('Keys:', Object.keys(dashboardResponse.data.user));
        console.log('Values:', dashboardResponse.data.user);
      }
    } else {
      console.log('❌ Dashboard endpoint failed:', dashboardResponse.data.msg);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
};

testDashboardDirect();
