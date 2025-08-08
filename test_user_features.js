const axios = require('axios');

const BASE_URL = 'http://localhost:8001';

// Test all user features
const testUserFeatures = async () => {
  console.log('🧪 Testing User Features...\n');
  
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
    
    // Test user dashboard
    console.log('\n📊 Testing user dashboard...');
    const dashboardResponse = await axios.get(`${BASE_URL}/api/user/get_dashboard`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (dashboardResponse.data.success) {
      console.log('✅ Dashboard loaded successfully');
      console.log('📈 Stats:', JSON.stringify(dashboardResponse.data.stats, null, 2));
    } else {
      console.log('❌ Dashboard failed:', dashboardResponse.data.msg);
    }
    
    // Test QR code creation
    console.log('\n📱 Testing QR code creation...');
    const qrResponse = await axios.post(`${BASE_URL}/api/qr/gen_qr`, {
      title: 'Test QR Instance',
      uniqueId: 'test_qr_' + Date.now()
    }, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (qrResponse.data.success) {
      console.log('✅ QR instance created successfully');
    } else {
      console.log('❌ QR creation failed:', qrResponse.data.msg);
    }
    
    // Test getting QR instances
    console.log('\n📋 Testing get QR instances...');
    const getQrResponse = await axios.get(`${BASE_URL}/api/qr/get_all`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (getQrResponse.data.success) {
      console.log(`✅ QR instances retrieved: ${getQrResponse.data.data.length} found`);
    } else {
      console.log('❌ Get QR instances failed:', getQrResponse.data.msg);
    }
    
    // Test chat flows
    console.log('\n🔄 Testing chat flows...');
    const flowsResponse = await axios.get(`${BASE_URL}/api/chat_flow/get_flows`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (flowsResponse.data.success) {
      console.log(`✅ Chat flows retrieved: ${flowsResponse.data.data?.length || 0} found`);
    } else {
      console.log('❌ Get chat flows failed:', flowsResponse.data.msg);
    }
    
    // Test creating a simple flow
    console.log('\n➕ Testing flow creation...');
    const createFlowResponse = await axios.post(`${BASE_URL}/api/chat_flow/insert_flow_beta`, {
      title: 'Test Flow',
      description: 'A test flow for functionality testing',
      nodes: JSON.stringify([{
        id: '1',
        type: 'start',
        data: { label: 'Start' },
        position: { x: 100, y: 100 }
      }]),
      edges: JSON.stringify([])
    }, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (createFlowResponse.data.success) {
      console.log('✅ Flow created successfully');
    } else {
      console.log('❌ Flow creation failed:', createFlowResponse.data.msg);
    }
    
    // Test chatbots
    console.log('\n🤖 Testing chatbots...');
    const chatbotsResponse = await axios.get(`${BASE_URL}/api/chatbot/get_beta_chatbots?type=wa_chatbot`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (chatbotsResponse.data.success) {
      console.log(`✅ Chatbots retrieved: ${chatbotsResponse.data.data?.length || 0} found`);
    } else {
      console.log('❌ Get chatbots failed:', chatbotsResponse.data.msg);
    }
    
    // Test user profile
    console.log('\n👤 Testing user profile...');
    const profileResponse = await axios.get(`${BASE_URL}/api/user/get_me`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (profileResponse.data.success) {
      console.log('✅ User profile retrieved successfully');
      console.log('👤 User:', profileResponse.data.user.name, '-', profileResponse.data.user.email);
    } else {
      console.log('❌ Get user profile failed:', profileResponse.data.msg);
    }
    
    // Test templates
    console.log('\n📝 Testing templates...');
    const templatesResponse = await axios.get(`${BASE_URL}/api/templet/get_all`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (templatesResponse.data.success) {
      console.log(`✅ Templates retrieved: ${templatesResponse.data.data?.length || 0} found`);
    } else {
      console.log('❌ Get templates failed:', templatesResponse.data.msg);
    }
    
    // Test campaigns
    console.log('\n📢 Testing campaigns...');
    const campaignsResponse = await axios.get(`${BASE_URL}/api/broadcast/get_all`, {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (campaignsResponse.data.success) {
      console.log(`✅ Campaigns retrieved: ${campaignsResponse.data.campaigns?.length || 0} found`);
    } else {
      console.log('❌ Get campaigns failed:', campaignsResponse.data.msg);
    }
    
    console.log('\n🎉 User feature testing completed!');
    console.log('\n📋 Test User Credentials for frontend:');
    console.log('You can use admin auto-login or the user token for testing');
    console.log('Access URL: http://localhost:8001');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.response?.data || error.message);
  }
};

testUserFeatures();
