# 🚀 WhatsEra CRM - Automatic Setup System

## ⚡ One-Command Setup

WhatsEra CRM now features **automatic setup** that handles everything on first run:

- ✅ **Database Creation**: Automatically creates and configures the database
- ✅ **Sample Data**: Inserts test users and sample data
- ✅ **Frontend Build**: Builds the React frontend automatically
- ✅ **Dependencies**: Installs missing dependencies
- ✅ **Configuration**: Creates .env file with default settings

## 🎯 Quick Start (New Users)

### Single Command Setup
```bash
npm start
```

That's it! The system will:
1. 🔍 Check if setup is needed
2. 📦 Install dependencies if missing
3. 🏗️ Build frontend if needed
4. 🗄️ Create database automatically
5. 🚀 Start the server

### First Run Experience
```bash
# Clone the project
git clone <repository-url>
cd whatsera-crm

# One command to rule them all
npm start
```

## 🛠️ Available Commands

| Command | Description | Use Case |
|---------|-------------|----------|
| `npm start` | **Complete auto-setup + start** | First time users |
| `npm run quick-start` | **Skip checks, just start** | When already set up |
| `npm run setup` | **Interactive database setup** | Manual configuration |
| `npm run verify` | **Test database connection** | Troubleshooting |
| `npm run server` | **Start server only** | Development |

## 🔄 How Auto-Setup Works

### 1. System Check
- ✅ Checks if setup was completed before
- ✅ Verifies database exists and has required tables
- ✅ Tests database connection

### 2. Interactive Setup (First Time)
If database connection fails, prompts for:
- Database host (default: localhost)
- Database port (default: 3306)
- Database user (default: root)
- Database password
- Database name (default: wcrm)

### 3. Automatic Database Creation
- 📊 Creates complete database schema (13 tables)
- 👥 Inserts test users for all roles
- 📋 Adds sample data (contacts, campaigns, etc.)
- ⚙️ Configures system settings

### 4. Configuration Generation
- 📄 Creates .env file with database settings
- 🔐 Generates secure JWT secret
- ⚙️ Sets default application configuration

### 5. Frontend Preparation
- 📦 Installs frontend dependencies if missing
- 🏗️ Builds React frontend if not built
- 🌐 Serves optimized production build

## 🎯 Test Credentials (Auto-Created)

After setup, use these accounts:

| Role | Email | Password | Dashboard |
|------|-------|----------|-----------|
| **👑 Admin** | admin@whatscrm.com | admin123 | Full system management |
| **👤 User** | user@test.com | admin123 | WhatsApp CRM features |
| **🎧 Agent** | agent@test.com | admin123 | Customer support |

## 📁 Auto-Generated Files

The setup creates these files:

```
📦 WhatsEra CRM
├── 📄 .env                    # Database & app configuration
├── 📄 .setup_complete         # Setup completion marker
├── 🗄️ wcrm (database)        # Complete CRM database
└── 📁 whatscrm-frontend/dist  # Built React frontend
```

## 🔧 Configuration Options

### Environment Variables (.env)
```env
# Database Configuration
DBHOST=localhost
DBPORT=3306
DBUSER=root
DBPASS=your_password
DBNAME=wcrm

# Application Configuration
PORT=8001
NODE_ENV=development
JWT_SECRET=auto_generated_secret

# Optional: Email & WhatsApp API
SMTP_HOST=localhost
SMTP_PORT=587
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
```

### Customization
- **Database Settings**: Modify .env file
- **Port**: Change PORT in .env (default: 8001)
- **Security**: Update JWT_SECRET for production

## 🚨 Troubleshooting

### Common Issues

**❌ "Cannot connect to database"**
```bash
# Check MySQL is running
# Windows: services.msc → MySQL
# Linux: sudo systemctl status mysql
# macOS: brew services list | grep mysql

# Try manual setup
npm run setup
```

**❌ "Frontend build failed"**
```bash
# Install frontend dependencies manually
cd whatscrm-frontend
npm install
npm run build
cd ..
npm start
```

**❌ "Permission denied"**
```bash
# Check database user permissions
# Grant privileges to your MySQL user
GRANT ALL PRIVILEGES ON *.* TO 'root'@'localhost';
```

**❌ "Port already in use"**
```bash
# Change port in .env file
echo "PORT=8002" >> .env
npm start
```

### Reset Setup
```bash
# Remove setup marker to force re-setup
rm .setup_complete

# Remove .env to reconfigure
rm .env

# Run setup again
npm start
```

### Manual Database Setup
```bash
# If auto-setup fails, use manual setup
npm run setup

# Or use SQL directly
mysql -u root -p < database_setup_complete.sql
```

## 🎉 Success Indicators

After successful setup, you'll see:

```
🎉 Setup completed successfully!

📋 Test Credentials:
👑 Admin: admin@whatscrm.com / admin123
👤 User: user@test.com / admin123
🎧 Agent: agent@test.com / admin123

🚀 Starting WhatsEra CRM...

🌟 WhatsEra CRM server is running on port 8001
🌐 Access your CRM at: http://localhost:8001
```

## 🔄 Development Workflow

### For Developers
```bash
# First time setup
npm start

# Daily development
npm run quick-start

# Frontend development
npm run frontend:dev

# Database changes
npm run verify
```

### For Production
```bash
# Initial deployment
npm start

# Update .env for production
# - Change JWT_SECRET
# - Set NODE_ENV=production
# - Configure SMTP settings
# - Add WhatsApp API credentials

# Restart
npm run quick-start
```

## 🎯 Next Steps

After successful setup:

1. **🌐 Access Dashboard**: http://localhost:8001
2. **🔐 Login**: Use test credentials above
3. **🎨 Customize**: Update branding and settings
4. **👥 Add Users**: Create real user accounts
5. **📱 Configure WhatsApp**: Set up WhatsApp API
6. **📧 Email Setup**: Configure SMTP for notifications

---

**🎉 Congratulations!** Your WhatsEra CRM is now ready for business use with zero manual configuration required!
