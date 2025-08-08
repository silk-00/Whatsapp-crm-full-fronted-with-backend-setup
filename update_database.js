const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function updateDatabase() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DBHOST || 'localhost',
      port: process.env.DBPORT || 3306,
      user: process.env.DBUSER || 'root',
      password: process.env.DBPASS || '',
      database: process.env.DBNAME || 'wcrm'
    });

    console.log('Connected to MySQL database successfully!');

    // Add missing columns to admin table
    try {
      await connection.execute('ALTER TABLE `admin` ADD COLUMN `name` varchar(255) NOT NULL DEFAULT "Admin"');
      console.log('✓ Added name column to admin table');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠ name column already exists in admin table');
      } else {
        console.error('✗ Error adding name column to admin:', err.message);
      }
    }

    // Add missing columns to agents table
    const agentColumns = [
      { name: 'owner_uid', type: 'varchar(50) NOT NULL DEFAULT ""' },
      { name: 'comments', type: 'text DEFAULT NULL' },
      { name: 'is_active', type: 'tinyint(1) DEFAULT 1' },
      { name: 'logs', type: 'json DEFAULT NULL' }
    ];

    for (const column of agentColumns) {
      try {
        await connection.execute(`ALTER TABLE \`agents\` ADD COLUMN \`${column.name}\` ${column.type}`);
        console.log(`✓ Added ${column.name} column to agents table`);
      } catch (err) {
        if (err.code === 'ER_DUP_FIELDNAME') {
          console.log(`⚠ ${column.name} column already exists in agents table`);
        } else {
          console.error(`✗ Error adding ${column.name} column to agents:`, err.message);
        }
      }
    }

    // Create password hashes
    const passwordHash = await bcrypt.hash('admin123', 10);
    console.log('Generated password hash for admin123:', passwordHash);

    // Insert/Update default admin user
    try {
      await connection.execute(`
        INSERT INTO \`admin\` (\`uid\`, \`name\`, \`email\`, \`password\`) 
        VALUES (?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        \`name\` = VALUES(\`name\`), 
        \`password\` = VALUES(\`password\`)
      `, ['admin_uid_001', 'Admin User', 'admin@whatscrm.com', passwordHash]);
      console.log('✓ Created/Updated default admin user');
    } catch (err) {
      console.error('✗ Error creating admin user:', err.message);
    }

    // Insert test user
    try {
      await connection.execute(`
        INSERT IGNORE INTO \`user\` (\`uid\`, \`name\`, \`email\`, \`password\`, \`mobile_with_country_code\`) 
        VALUES (?, ?, ?, ?, ?)
      `, ['user_uid_001', 'Test User', 'user@test.com', passwordHash, '+1234567890']);
      console.log('✓ Created test user');
    } catch (err) {
      console.error('✗ Error creating test user:', err.message);
    }

    // Insert test agent
    try {
      await connection.execute(`
        INSERT IGNORE INTO \`agents\` (\`uid\`, \`owner_uid\`, \`name\`, \`email\`, \`mobile\`, \`password\`, \`comments\`, \`is_active\`) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `, ['agent_uid_001', 'user_uid_001', 'Test Agent', 'agent@test.com', '+1234567890', passwordHash, 'Test agent account', 1]);
      console.log('✓ Created test agent');
    } catch (err) {
      console.error('✗ Error creating test agent:', err.message);
    }

    console.log('\n🎉 Database update completed successfully!');
    console.log('\n📋 Test Credentials:');
    console.log('👑 Admin: admin@whatscrm.com / admin123');
    console.log('👤 User: user@test.com / admin123');
    console.log('🎧 Agent: agent@test.com / admin123');

  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the update
updateDatabase();
