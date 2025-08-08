const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: process.env.DBHOST || 'localhost',
      port: process.env.DBPORT || 3306,
      user: process.env.DBUSER || 'root',
      password: process.env.DBPASS || '',
      database: process.env.DBNAME || 'wcrm',
      multipleStatements: true
    });

    console.log('Connected to MySQL database successfully!');

    // Read the SQL file
    const sqlContent = fs.readFileSync('./database_schema.sql', 'utf8');

    // Remove comments and split SQL statements
    const cleanedSql = sqlContent
      .split('\n')
      .filter(line => !line.trim().startsWith('--') && line.trim().length > 0)
      .join('\n');

    // Split SQL statements by semicolon and filter out empty statements
    const statements = cleanedSql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`Found ${statements.length} SQL statements to execute...`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          console.log(`✓ Statement ${i + 1} executed successfully`);
        } catch (err) {
          if (err.code === 'ER_TABLE_EXISTS_ERROR' || err.code === 'ER_DUP_ENTRY') {
            console.log(`⚠ Statement ${i + 1}: ${err.message} (skipping)`);
          } else {
            console.error(`✗ Error in statement ${i + 1}:`, err.message);
          }
        }
      }
    }

    console.log('\n🎉 Database setup completed successfully!');
    console.log('You can now start the WhatsCRM application.');

  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    
    if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.log('\n💡 Suggestions:');
      console.log('1. Check your database credentials in the .env file');
      console.log('2. Make sure your MySQL server is running');
      console.log('3. Verify the database user has proper permissions');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Suggestions:');
      console.log('1. Make sure your MySQL server is running');
      console.log('2. Check if the host and port are correct in .env file');
    } else if (error.code === 'ER_BAD_DB_ERROR') {
      console.log('\n💡 The database "wcrm" does not exist. Creating it...');
      
      try {
        // Try to create the database
        const rootConnection = await mysql.createConnection({
          host: process.env.DBHOST || 'localhost',
          port: process.env.DBPORT || 3306,
          user: process.env.DBUSER || 'root',
          password: process.env.DBPASS || ''
        });
        
        await rootConnection.execute('CREATE DATABASE IF NOT EXISTS wcrm');
        console.log('✓ Database "wcrm" created successfully!');
        await rootConnection.end();
        
        console.log('Please run this script again to set up the tables.');
      } catch (createError) {
        console.error('❌ Failed to create database:', createError.message);
      }
    }
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();
