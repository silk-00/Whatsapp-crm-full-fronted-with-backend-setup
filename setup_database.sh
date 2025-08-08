#!/bin/bash

# =====================================================
# WhatsEra CRM - Database Setup Script
# Version: 2.0
# Description: Automated database setup for new systems
# =====================================================

echo "=========================================="
echo "WhatsEra CRM - Database Setup"
echo "=========================================="

# Default values
DB_HOST="localhost"
DB_PORT="3306"
DB_USER="root"
DB_PASS=""
DB_NAME="wcrm"

# Function to prompt for database credentials
get_db_credentials() {
    echo ""
    echo "Please enter your database credentials:"
    echo ""
    
    read -p "Database Host [$DB_HOST]: " input_host
    DB_HOST=${input_host:-$DB_HOST}
    
    read -p "Database Port [$DB_PORT]: " input_port
    DB_PORT=${input_port:-$DB_PORT}
    
    read -p "Database User [$DB_USER]: " input_user
    DB_USER=${input_user:-$DB_USER}
    
    read -s -p "Database Password: " DB_PASS
    echo ""
    
    read -p "Database Name [$DB_NAME]: " input_name
    DB_NAME=${input_name:-$DB_NAME}
}

# Function to test database connection
test_connection() {
    echo ""
    echo "Testing database connection..."
    
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" -e "SELECT 1;" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        echo "✓ Database connection successful!"
        return 0
    else
        echo "✗ Database connection failed!"
        echo "Please check your credentials and try again."
        return 1
    fi
}

# Function to run the database setup
setup_database() {
    echo ""
    echo "Setting up WhatsEra CRM database..."
    echo ""
    
    # Check if SQL file exists
    if [ ! -f "database_setup_complete.sql" ]; then
        echo "✗ Error: database_setup_complete.sql file not found!"
        echo "Please make sure the SQL file is in the same directory as this script."
        exit 1
    fi
    
    # Run the SQL script
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" < database_setup_complete.sql
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✓ Database setup completed successfully!"
        echo ""
        echo "=========================================="
        echo "Setup Summary:"
        echo "=========================================="
        echo "Database Host: $DB_HOST"
        echo "Database Port: $DB_PORT"
        echo "Database Name: $DB_NAME"
        echo "Database User: $DB_USER"
        echo ""
        echo "Test Credentials Created:"
        echo "👑 Admin: admin@whatscrm.com / admin123"
        echo "👤 User: user@test.com / admin123"
        echo "🎧 Agent: agent@test.com / admin123"
        echo ""
        echo "You can now start your WhatsEra CRM application!"
        echo "=========================================="
    else
        echo "✗ Database setup failed!"
        echo "Please check the error messages above and try again."
        exit 1
    fi
}

# Function to create .env file
create_env_file() {
    echo ""
    read -p "Do you want to create/update .env file with database settings? (y/n): " create_env
    
    if [ "$create_env" = "y" ] || [ "$create_env" = "Y" ]; then
        echo ""
        echo "Creating .env file..."
        
        cat > .env << EOF
# Database Configuration
DBHOST=$DB_HOST
DBPORT=$DB_PORT
DBUSER=$DB_USER
DBPASS=$DB_PASS
DBNAME=$DB_NAME

# Application Configuration
PORT=8001
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (Optional)
SMTP_HOST=localhost
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# WhatsApp API Configuration (Optional)
WHATSAPP_API_URL=
WHATSAPP_API_TOKEN=
EOF
        
        echo "✓ .env file created successfully!"
        echo "Please update JWT_SECRET and other configuration as needed."
    fi
}

# Main execution
main() {
    echo "This script will set up the WhatsEra CRM database with sample data."
    echo ""
    
    # Get database credentials
    get_db_credentials
    
    # Test connection
    if ! test_connection; then
        echo ""
        read -p "Do you want to try again with different credentials? (y/n): " retry
        if [ "$retry" = "y" ] || [ "$retry" = "Y" ]; then
            main
        else
            echo "Setup cancelled."
            exit 1
        fi
        return
    fi
    
    # Confirm setup
    echo ""
    echo "Database connection successful!"
    echo ""
    echo "WARNING: This will create/recreate the '$DB_NAME' database."
    echo "All existing data will be lost!"
    echo ""
    read -p "Do you want to continue? (y/n): " confirm
    
    if [ "$confirm" = "y" ] || [ "$confirm" = "Y" ]; then
        setup_database
        create_env_file
    else
        echo "Setup cancelled."
        exit 0
    fi
}

# Run main function
main
