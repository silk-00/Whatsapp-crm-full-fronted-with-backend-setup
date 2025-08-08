const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function fixDatabase() {
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

    // Add the missing createdAt column
    try {
      await connection.execute('ALTER TABLE `beta_campaign` ADD COLUMN `createdAt` timestamp DEFAULT CURRENT_TIMESTAMP');
      console.log('✓ Added createdAt column to beta_campaign table');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('⚠ createdAt column already exists in beta_campaign table');
      } else {
        console.error('✗ Error adding createdAt column:', err.message);
      }
    }

    console.log('\n🎉 Database fix completed successfully!');

  } catch (error) {
    console.error('❌ Database fix failed:', error.message);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the fix
fixDatabase();
