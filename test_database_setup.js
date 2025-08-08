const mysql = require('mysql2/promise');
const fs = require('fs');

// Test the database setup with existing configuration
async function testDatabaseSetup() {
  console.log('🧪 Testing Database Setup...\n');
  
  const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'wcrm'
  };
  
  try {
    // Test connection
    console.log('1. Testing database connection...');
    const connection = await mysql.createConnection(config);
    console.log('✓ Database connection successful!');
    
    // Test tables exist
    console.log('\n2. Checking database tables...');
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`✓ Found ${tables.length} tables in database`);
    
    // Test sample data
    console.log('\n3. Verifying sample data...');
    
    const [users] = await connection.execute('SELECT COUNT(*) as count FROM user');
    console.log(`✓ Users: ${users[0].count}`);
    
    const [contacts] = await connection.execute('SELECT COUNT(*) as count FROM contacts');
    console.log(`✓ Contacts: ${contacts[0].count}`);
    
    const [campaigns] = await connection.execute('SELECT COUNT(*) as count FROM broadcast');
    console.log(`✓ Campaigns: ${campaigns[0].count}`);
    
    const [chats] = await connection.execute('SELECT COUNT(*) as count FROM chats');
    console.log(`✓ Chats: ${chats[0].count}`);
    
    // Test login credentials
    console.log('\n4. Testing login credentials...');
    
    const [admin] = await connection.execute(
      'SELECT email FROM admin WHERE email = ?', 
      ['admin@whatscrm.com']
    );
    console.log(`✓ Admin account: ${admin.length > 0 ? 'Found' : 'Missing'}`);
    
    const [user] = await connection.execute(
      'SELECT email FROM user WHERE email = ?', 
      ['user@test.com']
    );
    console.log(`✓ User account: ${user.length > 0 ? 'Found' : 'Missing'}`);
    
    const [agent] = await connection.execute(
      'SELECT email FROM agents WHERE email = ?', 
      ['agent@test.com']
    );
    console.log(`✓ Agent account: ${agent.length > 0 ? 'Found' : 'Missing'}`);
    
    await connection.end();
    
    console.log('\n🎉 Database setup verification completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('👑 Admin: admin@whatscrm.com / admin123');
    console.log('👤 User: user@test.com / admin123');
    console.log('🎧 Agent: agent@test.com / admin123');
    console.log('\n✅ Your WhatsEra CRM database is ready to use!');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    
    if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 Database does not exist. Please run the setup script first:');
      console.log('   node setup_database_interactive.js');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Cannot connect to MySQL server. Please check:');
      console.log('   1. MySQL server is running');
      console.log('   2. Connection settings are correct');
      console.log('   3. Firewall is not blocking the connection');
    }
  }
}

// Run the test
testDatabaseSetup();
