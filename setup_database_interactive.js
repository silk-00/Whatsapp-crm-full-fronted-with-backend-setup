const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// =====================================================
// WhatsEra CRM - Interactive Database Setup Script
// Version: 2.0
// Description: Cross-platform database setup with Node.js
// =====================================================

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Default configuration
const defaultConfig = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'wcrm'
};

// Utility function to prompt user input
function prompt(question, defaultValue = '') {
  return new Promise((resolve) => {
    const displayDefault = defaultValue ? ` [${defaultValue}]` : '';
    rl.question(`${question}${displayDefault}: `, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}

// Function to hide password input
function promptPassword(question) {
  return new Promise((resolve) => {
    process.stdout.write(`${question}: `);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    let password = '';
    process.stdin.on('data', function(char) {
      char = char + '';
      switch(char) {
        case '\n':
        case '\r':
        case '\u0004':
          process.stdin.setRawMode(false);
          process.stdin.pause();
          process.stdout.write('\n');
          resolve(password);
          break;
        case '\u0003':
          process.exit();
          break;
        case '\u007f': // Backspace
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

// Function to get database credentials
async function getDatabaseCredentials() {
  console.log('\n==========================================');
  console.log('WhatsEra CRM - Database Setup');
  console.log('==========================================\n');
  
  console.log('Please enter your database credentials:\n');
  
  const config = {
    host: await prompt('Database Host', defaultConfig.host),
    port: parseInt(await prompt('Database Port', defaultConfig.port.toString())),
    user: await prompt('Database User', defaultConfig.user),
    password: await promptPassword('Database Password'),
    database: await prompt('Database Name', defaultConfig.database)
  };
  
  return config;
}

// Function to test database connection
async function testConnection(config) {
  console.log('\nTesting database connection...');
  
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password
    });
    
    await connection.execute('SELECT 1');
    await connection.end();
    
    console.log('✓ Database connection successful!');
    return true;
  } catch (error) {
    console.log('✗ Database connection failed!');
    console.log('Error:', error.message);
    console.log('\nPlease check:');
    console.log('1. MySQL is installed and running');
    console.log('2. Your credentials are correct');
    console.log('3. The database server is accessible');
    return false;
  }
}

// Function to run SQL script
async function runSQLScript(config) {
  const sqlFile = path.join(__dirname, 'database_setup_complete.sql');
  
  if (!fs.existsSync(sqlFile)) {
    throw new Error('database_setup_complete.sql file not found!');
  }
  
  const sqlContent = fs.readFileSync(sqlFile, 'utf8');
  const connection = await mysql.createConnection(config);
  
  // Split SQL content by semicolons and execute each statement
  const statements = sqlContent
    .split(';')
    .map(stmt => stmt.trim())
    .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
  
  console.log(`\nExecuting ${statements.length} SQL statements...`);
  
  for (let i = 0; i < statements.length; i++) {
    const statement = statements[i];
    if (statement.trim()) {
      try {
        await connection.execute(statement);
        if (i % 10 === 0) {
          process.stdout.write('.');
        }
      } catch (error) {
        if (!error.message.includes('already exists')) {
          console.log(`\nWarning: ${error.message}`);
        }
      }
    }
  }
  
  await connection.end();
  console.log('\n✓ Database setup completed successfully!');
}

// Function to create .env file
async function createEnvFile(config) {
  const createEnv = await prompt('\nDo you want to create/update .env file with database settings? (y/n)', 'y');
  
  if (createEnv.toLowerCase() === 'y') {
    const envContent = `# Database Configuration
DBHOST=${config.host}
DBPORT=${config.port}
DBUSER=${config.user}
DBPASS=${config.password}
DBNAME=${config.database}

# Application Configuration
PORT=8001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here_${Math.random().toString(36).substring(7)}

# Email Configuration (Optional)
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# WhatsApp API Configuration (Optional)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
`;
    
    fs.writeFileSync('.env', envContent);
    console.log('✓ .env file created successfully!');
    console.log('Please update JWT_SECRET and other configuration as needed.');
  }
}

// Main function
async function main() {
  try {
    console.log('This script will set up the WhatsEra CRM database with sample data.\n');
    
    // Get database credentials
    const config = await getDatabaseCredentials();
    
    // Test connection
    if (!(await testConnection(config))) {
      const retry = await prompt('\nDo you want to try again with different credentials? (y/n)', 'n');
      if (retry.toLowerCase() === 'y') {
        return main();
      } else {
        console.log('Setup cancelled.');
        process.exit(1);
      }
    }
    
    // Confirm setup
    console.log('\nDatabase connection successful!');
    console.log(`\nWARNING: This will create/recreate the '${config.database}' database.`);
    console.log('All existing data will be lost!');
    
    const confirm = await prompt('\nDo you want to continue? (y/n)', 'n');
    
    if (confirm.toLowerCase() !== 'y') {
      console.log('Setup cancelled.');
      process.exit(0);
    }
    
    // Run database setup
    console.log('\nSetting up WhatsEra CRM database...');
    await runSQLScript(config);
    
    // Create .env file
    await createEnvFile(config);
    
    // Show summary
    console.log('\n==========================================');
    console.log('Setup Summary:');
    console.log('==========================================');
    console.log(`Database Host: ${config.host}`);
    console.log(`Database Port: ${config.port}`);
    console.log(`Database Name: ${config.database}`);
    console.log(`Database User: ${config.user}`);
    console.log('\nTest Credentials Created:');
    console.log('👑 Admin: admin@whatscrm.com / admin123');
    console.log('👤 User: user@test.com / admin123');
    console.log('🎧 Agent: agent@test.com / admin123');
    console.log('\nYou can now start your WhatsEra CRM application!');
    console.log('==========================================');
    
  } catch (error) {
    console.error('\n✗ Setup failed:', error.message);
    process.exit(1);
  } finally {
    rl.close();
  }
}

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n\nSetup cancelled by user.');
  rl.close();
  process.exit(0);
});

// Run the setup
main();
