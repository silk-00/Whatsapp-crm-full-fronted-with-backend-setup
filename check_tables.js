const mysql = require('mysql2/promise');

const config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'wcrm'
};

const checkTables = async () => {
  console.log('🔍 Checking database tables...\n');
  
  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connected to database');
    
    // Get all tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log(`\n📊 Found ${tables.length} tables:`);
    
    tables.forEach((table, index) => {
      const tableName = Object.values(table)[0];
      console.log(`${index + 1}. ${tableName}`);
    });
    
    // Check specific tables that dashboard might need
    const requiredTables = [
      'user', 'agents', 'beta_chats', 'agent_task', 'instance', 
      'beta_conversation', 'chatbot', 'contacts', 'phonebook',
      'templets', 'broadcast', 'qr_instances', 'chats'
    ];
    
    console.log('\n🔍 Checking required tables:');
    
    for (const tableName of requiredTables) {
      try {
        const [result] = await connection.execute(`SELECT COUNT(*) as count FROM ${tableName} LIMIT 1`);
        console.log(`✅ ${tableName} - exists (${result[0].count} records)`);
      } catch (error) {
        console.log(`❌ ${tableName} - missing or error: ${error.message}`);
      }
    }
    
    await connection.end();
    
  } catch (error) {
    console.log('❌ Database error:', error.message);
  }
};

checkTables().catch(console.error);
