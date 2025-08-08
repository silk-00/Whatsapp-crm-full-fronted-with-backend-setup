const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// =====================================================
// WhatsEra CRM - Automatic Setup System
// Version: 2.0
// Description: Auto-setup database on first run
// =====================================================

class AutoSetup {
  constructor() {
    this.config = {
      host: process.env.DBHOST || 'localhost',
      port: process.env.DBPORT || 3306,
      user: process.env.DBUSER || 'root',
      password: process.env.DBPASS || '',
      database: process.env.DBNAME || 'wcrm'
    };
    
    this.setupCompleteFile = path.join(__dirname, '.setup_complete');
    this.envFile = path.join(__dirname, '.env');
  }

  // Check if setup has been completed before
  isSetupComplete() {
    return fs.existsSync(this.setupCompleteFile);
  }

  // Check if database exists and has required tables
  async checkDatabaseExists() {
    try {
      const connection = await mysql.createConnection({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password
      });

      // Check if database exists
      const [databases] = await connection.execute(
        'SHOW DATABASES LIKE ?', 
        [this.config.database]
      );

      if (databases.length === 0) {
        await connection.end();
        return false;
      }

      // Check if required tables exist
      await connection.execute(`USE ${this.config.database}`);
      const [tables] = await connection.execute('SHOW TABLES');
      
      const requiredTables = ['admin', 'user', 'agents', 'phonebook', 'contacts'];
      const existingTables = tables.map(row => Object.values(row)[0]);
      const hasRequiredTables = requiredTables.every(table => 
        existingTables.includes(table)
      );

      await connection.end();
      return hasRequiredTables;
      
    } catch (error) {
      console.log('Database check failed:', error.message);
      return false;
    }
  }

  // Test database connection
  async testConnection() {
    try {
      const connection = await mysql.createConnection({
        host: this.config.host,
        port: this.config.port,
        user: this.config.user,
        password: this.config.password
      });
      
      await connection.execute('SELECT 1');
      await connection.end();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Load .env file if exists
  loadEnvFile() {
    if (fs.existsSync(this.envFile)) {
      const envContent = fs.readFileSync(this.envFile, 'utf8');
      const envLines = envContent.split('\n');
      
      envLines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value && !process.env[key]) {
          process.env[key] = value.trim();
        }
      });
      
      // Update config with env values
      this.config = {
        host: process.env.DBHOST || this.config.host,
        port: process.env.DBPORT || this.config.port,
        user: process.env.DBUSER || this.config.user,
        password: process.env.DBPASS || this.config.password,
        database: process.env.DBNAME || this.config.database
      };
    }
  }

  // Create .env file with default values
  createEnvFile() {
    const envContent = `# Database Configuration
DBHOST=${this.config.host}
DBPORT=${this.config.port}
DBUSER=${this.config.user}
DBPASS=${this.config.password}
DBNAME=${this.config.database}

# Application Configuration
PORT=8001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=whatsera_jwt_secret_${Math.random().toString(36).substring(7)}

# Email Configuration (Optional)
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# WhatsApp API Configuration (Optional)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
`;

    fs.writeFileSync(this.envFile, envContent);
    console.log('✓ .env file created with default configuration');
  }

  // Run SQL setup script
  async runDatabaseSetup() {
    const sqlFile = path.join(__dirname, 'database_setup_complete.sql');
    
    if (!fs.existsSync(sqlFile)) {
      throw new Error('database_setup_complete.sql file not found!');
    }

    console.log('📊 Setting up database...');
    
    const sqlContent = fs.readFileSync(sqlFile, 'utf8');
    const connection = await mysql.createConnection({
      host: this.config.host,
      port: this.config.port,
      user: this.config.user,
      password: this.config.password
    });

    // Split and execute SQL statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--') && !stmt.startsWith('/*'));

    let completed = 0;
    for (const statement of statements) {
      if (statement.trim()) {
        try {
          await connection.execute(statement);
          completed++;
          if (completed % 10 === 0) {
            process.stdout.write('.');
          }
        } catch (error) {
          // Ignore "already exists" errors
          if (!error.message.includes('already exists')) {
            console.log(`\nWarning: ${error.message}`);
          }
        }
      }
    }

    await connection.end();
    console.log(`\n✓ Database setup completed! (${completed} statements executed)`);
  }

  // Mark setup as complete
  markSetupComplete() {
    const timestamp = new Date().toISOString();
    const content = `Setup completed at: ${timestamp}\nDatabase: ${this.config.database}\nHost: ${this.config.host}`;
    fs.writeFileSync(this.setupCompleteFile, content);
  }

  // Interactive setup for first-time users
  async interactiveSetup() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const prompt = (question) => new Promise(resolve => {
      rl.question(question, resolve);
    });

    console.log('\n🚀 Welcome to WhatsEra CRM!');
    console.log('This appears to be your first time running the application.');
    console.log('Let\'s set up your database...\n');

    // Check if user wants to use default settings
    const useDefaults = await prompt('Use default database settings? (localhost, root, no password) [Y/n]: ');
    
    if (useDefaults.toLowerCase() !== 'n') {
      console.log('Using default database configuration...');
    } else {
      console.log('\nPlease enter your database configuration:');
      this.config.host = await prompt(`Database Host [${this.config.host}]: `) || this.config.host;
      this.config.port = await prompt(`Database Port [${this.config.port}]: `) || this.config.port;
      this.config.user = await prompt(`Database User [${this.config.user}]: `) || this.config.user;
      this.config.password = await prompt('Database Password: ');
      this.config.database = await prompt(`Database Name [${this.config.database}]: `) || this.config.database;
    }

    rl.close();
  }

  // Main setup process
  async run() {
    try {
      console.log('\n🔍 Checking system setup...');

      // Load existing .env if available
      this.loadEnvFile();

      // Check if setup is already complete
      if (this.isSetupComplete()) {
        console.log('✓ Setup already completed, checking database...');
        
        if (await this.checkDatabaseExists()) {
          console.log('✓ Database is ready!');
          return true;
        } else {
          console.log('⚠️  Database missing, recreating...');
          // Remove setup marker to force re-setup
          if (fs.existsSync(this.setupCompleteFile)) {
            fs.unlinkSync(this.setupCompleteFile);
          }
        }
      }

      // Test database connection
      if (!(await this.testConnection())) {
        console.log('\n❌ Cannot connect to database with current settings.');
        
        // Try interactive setup
        await this.interactiveSetup();
        
        // Test again
        if (!(await this.testConnection())) {
          console.log('❌ Still cannot connect to database.');
          console.log('Please check your MySQL installation and credentials.');
          console.log('You can run setup manually: node setup_database_interactive.js');
          return false;
        }
      }

      console.log('✓ Database connection successful!');

      // Check if database exists
      if (!(await this.checkDatabaseExists())) {
        console.log('📊 Database not found, creating...');
        await this.runDatabaseSetup();
      } else {
        console.log('✓ Database already exists and is ready!');
      }

      // Create .env file if it doesn't exist
      if (!fs.existsSync(this.envFile)) {
        this.createEnvFile();
      }

      // Mark setup as complete
      this.markSetupComplete();

      console.log('\n🎉 Setup completed successfully!');
      console.log('\n📋 Test Credentials:');
      console.log('👑 Admin: admin@whatscrm.com / admin123');
      console.log('👤 User: user@test.com / admin123');
      console.log('🎧 Agent: agent@test.com / admin123');
      console.log('\n🚀 Starting WhatsEra CRM...\n');

      return true;

    } catch (error) {
      console.error('\n❌ Setup failed:', error.message);
      console.log('\n💡 You can try manual setup:');
      console.log('   node setup_database_interactive.js');
      return false;
    }
  }

  // Silent check (no console output)
  async silentCheck() {
    try {
      this.loadEnvFile();
      return this.isSetupComplete() && await this.checkDatabaseExists();
    } catch {
      return false;
    }
  }
}

module.exports = AutoSetup;
