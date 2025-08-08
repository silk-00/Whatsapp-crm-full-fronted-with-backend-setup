# WhatsEra CRM - Database Setup Guide

This guide provides multiple methods to set up the complete WhatsEra CRM database on any new system.

## 📋 Prerequisites

Before running any setup script, ensure you have:

1. **MySQL Server** installed and running
2. **MySQL Client** tools available in your system PATH
3. **Database credentials** with CREATE/DROP privileges
4. **Node.js** (for the interactive setup script)

## 🗄️ Database Structure

The setup will create a complete database with:

- **13 Tables**: All necessary tables for the CRM system
- **Sample Data**: Test users, contacts, campaigns, and more
- **Indexes**: Optimized for performance
- **Foreign Keys**: Data integrity constraints
- **Triggers**: Automatic data updates

## 🚀 Setup Methods

### Method 1: Interactive Node.js Script (Recommended)

**Best for**: Cross-platform setup with user-friendly interface

```bash
# Install dependencies (if not already installed)
npm install mysql2

# Run the interactive setup
node setup_database_interactive.js
```

**Features**:
- ✅ Cross-platform (Windows, macOS, Linux)
- ✅ Interactive credential input
- ✅ Connection testing
- ✅ Progress indicators
- ✅ Automatic .env file creation
- ✅ Error handling and validation

### Method 2: Linux/macOS Shell Script

**Best for**: Unix-based systems with bash

```bash
# Make the script executable
chmod +x setup_database.sh

# Run the setup
./setup_database.sh
```

### Method 3: Windows Batch Script

**Best for**: Windows systems

```cmd
# Run the batch file
setup_database.bat
```

### Method 4: Manual MySQL Import

**Best for**: Direct database import

```bash
# Using MySQL command line
mysql -u root -p < database_setup_complete.sql

# Or using MySQL Workbench
# File > Run SQL Script > Select database_setup_complete.sql
```

## 📁 Files Included

| File | Description |
|------|-------------|
| `database_setup_complete.sql` | Complete SQL script with all tables and data |
| `setup_database_interactive.js` | Interactive Node.js setup script |
| `setup_database.sh` | Linux/macOS shell script |
| `setup_database.bat` | Windows batch script |
| `DATABASE_SETUP_README.md` | This documentation |

## 🔧 Configuration

### Database Settings

| Setting | Default Value | Description |
|---------|---------------|-------------|
| Host | localhost | Database server host |
| Port | 3306 | MySQL server port |
| User | root | Database username |
| Password | (empty) | Database password |
| Database | wcrm | Database name |

### Test Credentials Created

After setup, you can use these test accounts:

| Role | Email | Password | Access Level |
|------|-------|----------|--------------|
| **👑 Admin** | admin@whatscrm.com | admin123 | Full system access |
| **👤 User** | user@test.com | admin123 | Standard user features |
| **🎧 Agent** | agent@test.com | admin123 | Customer support |

## 📊 Sample Data Included

The setup creates sample data for testing:

- **3 Users** with different plans
- **2 Agents** for customer support
- **4 Phonebooks** with contact organization
- **5 Contacts** with sample information
- **3 Message Templates** for campaigns
- **3 Broadcast Campaigns** with statistics
- **3 Chatbots** with AI flows
- **3 Chat Flows** for automation
- **3 QR Instances** for WhatsApp connection
- **3 Active Chats** with conversation history
- **3 Orders** with payment information
- **System Configuration** with default settings

## 🔍 Verification

After setup, verify the installation:

### 1. Check Database Creation
```sql
SHOW DATABASES;
USE wcrm;
SHOW TABLES;
```

### 2. Verify Sample Data
```sql
SELECT COUNT(*) as user_count FROM user;
SELECT COUNT(*) as contact_count FROM contacts;
SELECT COUNT(*) as campaign_count FROM broadcast;
```

### 3. Test Application Connection
Start your WhatsEra CRM application and try logging in with the test credentials.

## 🛠️ Troubleshooting

### Common Issues

**1. "Access denied" error**
- Check your MySQL credentials
- Ensure the user has CREATE/DROP privileges
- Verify MySQL server is running

**2. "Command not found: mysql"**
- Install MySQL client tools
- Add MySQL to your system PATH
- On Windows: Install MySQL Workbench or MySQL Shell

**3. "File not found" error**
- Ensure all setup files are in the same directory
- Check file permissions (Linux/macOS)
- Run from the correct directory

**4. "Connection refused" error**
- Check if MySQL server is running
- Verify host and port settings
- Check firewall settings

### Manual Recovery

If automated setup fails, you can:

1. **Drop existing database**:
   ```sql
   DROP DATABASE IF EXISTS wcrm;
   ```

2. **Run SQL script manually**:
   ```bash
   mysql -u root -p < database_setup_complete.sql
   ```

3. **Check error logs**:
   - MySQL error log
   - Application logs
   - System logs

## 🔄 Updating Database

To update an existing database:

1. **Backup current data**:
   ```bash
   mysqldump -u root -p wcrm > backup_$(date +%Y%m%d).sql
   ```

2. **Run setup script** (will recreate database)

3. **Restore specific data** if needed

## 📞 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Review MySQL error logs
4. Ensure proper file permissions

## 🎯 Next Steps

After successful database setup:

1. **Update .env file** with your specific configuration
2. **Change default passwords** for security
3. **Configure SMTP settings** for email functionality
4. **Set up WhatsApp API** credentials
5. **Start the application** and test functionality

---

**Note**: This setup creates a complete development environment. For production use, ensure proper security measures, backup strategies, and performance optimization.
