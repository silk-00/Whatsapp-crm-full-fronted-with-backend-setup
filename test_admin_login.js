const axios = require('axios');

const BASE_URL = 'http://localhost:8001';

// Test admin login function
const testAdminLogin = async () => {
  console.log('🔐 Testing Admin Login Process...');
  
  const credentials = {
    email: 'admin@whatscrm.com',
    password: 'admin123'
  };
  
  try {
    console.log('📤 Sending admin login request...');
    console.log('URL:', `${BASE_URL}/api/admin/login`);
    console.log('Credentials:', credentials);
    
    const response = await axios.post(`${BASE_URL}/api/admin/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('📥 Response received:');
    console.log('Status:', response.status);
    console.log('Data:', JSON.stringify(response.data, null, 2));
    
    if (response.data.success && response.data.token) {
      console.log('✅ Admin login successful!');
      console.log('🔑 Token:', response.data.token.substring(0, 20) + '...');
      
      // Test authenticated admin request
      console.log('\n🔒 Testing authenticated admin request...');
      const adminResponse = await axios.get(`${BASE_URL}/api/admin/get_users`, {
        headers: {
          'Authorization': `Bearer ${response.data.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('👥 Get users response:');
      console.log('Status:', adminResponse.status);
      console.log('Data:', JSON.stringify(adminResponse.data, null, 2));
      
      if (adminResponse.data && adminResponse.data.success) {
        console.log('✅ Admin authenticated request successful!');
        console.log(`📊 Found ${adminResponse.data.data.length} users in system`);
      } else {
        console.log('❌ Admin authenticated request failed');
      }
      
    } else {
      console.log('❌ Admin login failed:', response.data);
    }
    
  } catch (error) {
    console.log('❌ Admin login error:');
    console.log('Status:', error.response?.status);
    console.log('Data:', error.response?.data);
    console.log('Message:', error.message);
  }
};

// Test admin table structure
const testAdminTable = async () => {
  console.log('🔍 Testing Admin Table Structure...');
  
  const mysql = require('mysql2/promise');
  const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wcrm'
  };
  
  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');
    
    // Check admin table structure
    const [columns] = await connection.execute('DESCRIBE admin');
    console.log('\n📋 Admin table structure:');
    columns.forEach(col => {
      console.log(`- ${col.Field}: ${col.Type} (${col.Null === 'YES' ? 'nullable' : 'not null'})`);
    });
    
    // Check admin records
    const [admins] = await connection.execute('SELECT * FROM admin');
    console.log(`\n👑 Found ${admins.length} admin records:`);
    admins.forEach(admin => {
      console.log(`- ID: ${admin.id}, UID: ${admin.uid}, Email: ${admin.email}, Name: ${admin.name}`);
      if (admin.role) {
        console.log(`  Role: ${admin.role}`);
      } else {
        console.log('  ⚠️  No role column found!');
      }
    });
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
};

// Run tests
const runTests = async () => {
  console.log('🧪 Starting Admin Tests...\n');
  
  await testAdminTable();
  console.log('\n' + '='.repeat(50) + '\n');
  await testAdminLogin();
  
  console.log('\n🏁 Tests completed!');
};

runTests().catch(console.error);
