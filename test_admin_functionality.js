const axios = require('axios');

const BASE_URL = 'http://localhost:8001';
let authToken = '';

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
      status: error.response?.status 
    };
  }
};

// Test admin authentication
const testAdminAuth = async () => {
  console.log('\n🔐 Testing Admin Authentication...');
  
  const loginResult = await makeRequest('POST', '/api/admin/login', {
    email: 'admin@whatscrm.com',
    password: 'admin123'
  });
  
  if (loginResult.success && loginResult.data.success && loginResult.data.token) {
    authToken = loginResult.data.token;
    console.log('✅ Admin login successful');
    console.log('🔑 Token received:', authToken.substring(0, 20) + '...');
    return true;
  } else {
    console.log('❌ Admin login failed:', loginResult.error);
    return false;
  }
};

// Test user management
const testUserManagement = async () => {
  console.log('\n👥 Testing User Management...');
  
  // Get all users
  const getUsersResult = await makeRequest('GET', '/api/admin/get_users');
  if (getUsersResult.success && getUsersResult.data.success) {
    console.log(`✅ Get users successful - Found ${getUsersResult.data.data.length} users`);
  } else {
    console.log('❌ Get users failed:', getUsersResult.error);
    return false;
  }
  
  // Test user update (update the test user)
  const updateUserResult = await makeRequest('POST', '/api/admin/update_user', {
    uid: 'user_uid_001',
    name: 'Updated Test User',
    email: 'user@test.com',
    mobile_with_country_code: '+1234567890'
  });
  
  if (updateUserResult.success && updateUserResult.data.success) {
    console.log('✅ Update user successful');
  } else {
    console.log('❌ Update user failed:', updateUserResult.error);
  }
  
  return true;
};

// Test admin dashboard
const testAdminDashboard = async () => {
  console.log('\n📊 Testing Admin Dashboard...');

  const dashboardResult = await makeRequest('GET', '/api/admin/get_analytics');

  if (dashboardResult.success && dashboardResult.data.success) {
    console.log('✅ Admin dashboard loaded successfully');
    console.log('📈 Dashboard data keys:', Object.keys(dashboardResult.data.data));
    return true;
  } else {
    console.log('❌ Admin dashboard failed:', dashboardResult.error);
    return false;
  }
};

// Test orders management
const testOrdersManagement = async () => {
  console.log('\n💰 Testing Orders Management...');
  
  const ordersResult = await makeRequest('GET', '/api/admin/get_orders');
  
  if (ordersResult.success && ordersResult.data.success) {
    console.log(`✅ Get orders successful - Found ${ordersResult.data.data.length} orders`);
    return true;
  } else {
    console.log('❌ Get orders failed:', ordersResult.error);
    return false;
  }
};

// Test admin profile
const testAdminProfile = async () => {
  console.log('\n👤 Testing Admin Profile...');
  
  const adminResult = await makeRequest('GET', '/api/admin/get_admin');
  
  if (adminResult.success && adminResult.data.success) {
    console.log('✅ Get admin profile successful');
    console.log('👑 Admin:', adminResult.data.data.name, '-', adminResult.data.data.email);
    return true;
  } else {
    console.log('❌ Get admin profile failed:', adminResult.error);
    return false;
  }
};

// Test plan management
const testPlanManagement = async () => {
  console.log('\n📋 Testing Plan Management...');
  
  // Get all plans
  const plansResult = await makeRequest('GET', '/api/admin/get_plans');
  
  if (plansResult.success) {
    console.log('✅ Get plans successful');
  } else {
    console.log('❌ Get plans failed:', plansResult.error);
  }
  
  // Try to create a test plan
  const createPlanResult = await makeRequest('POST', '/api/admin/add_plan', {
    title: 'Test Plan',
    short_description: 'Test plan for admin functionality',
    allow_tag: 1,
    allow_note: 1,
    allow_chatbot: 1,
    contact_limit: 1000,
    allow_api: 1,
    is_trial: 0,
    price: 29.99,
    price_strike: 39.99,
    plan_duration_in_days: 30,
    qr_account: 2,
    wa_warmer: 1,
    rest_api_qr: 1
  });
  
  if (createPlanResult.success && createPlanResult.data.success) {
    console.log('✅ Create plan successful');
    return true;
  } else {
    console.log('❌ Create plan failed:', createPlanResult.error);
    return false;
  }
};

// Test auto login (admin can login as any user)
const testAutoLogin = async () => {
  console.log('\n🔄 Testing Auto Login Feature...');
  
  const autoLoginResult = await makeRequest('POST', '/api/admin/auto_login', {
    uid: 'user_uid_001'
  });
  
  if (autoLoginResult.success && autoLoginResult.data.success) {
    console.log('✅ Auto login successful - Admin can login as user');
    return true;
  } else {
    console.log('❌ Auto login failed:', autoLoginResult.error);
    return false;
  }
};

// Main test function
const runAllAdminTests = async () => {
  console.log('🧪 Starting Comprehensive Admin Functionality Tests...');
  console.log('🌐 Testing WhatsEra CRM Admin Panel at:', BASE_URL);
  
  const tests = [
    { name: 'Admin Authentication', fn: testAdminAuth },
    { name: 'User Management', fn: testUserManagement },
    { name: 'Admin Dashboard', fn: testAdminDashboard },
    { name: 'Orders Management', fn: testOrdersManagement },
    { name: 'Admin Profile', fn: testAdminProfile },
    { name: 'Plan Management', fn: testPlanManagement },
    { name: 'Auto Login', fn: testAutoLogin }
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
  
  console.log('\n📊 Admin Test Results Summary:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  console.log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
  
  if (failed === 0) {
    console.log('\n🎉 ALL ADMIN TESTS PASSED! Admin panel is fully functional!');
  } else {
    console.log('\n⚠️  Some admin tests failed. Check the errors above for details.');
  }
};

// Run tests
runAllAdminTests().catch(console.error);
