@echo off
setlocal enabledelayedexpansion

REM =====================================================
REM WhatsEra CRM - Database Setup Script (Windows)
REM Version: 2.0
REM Description: Automated database setup for new systems
REM =====================================================

echo ==========================================
echo WhatsEra CRM - Database Setup
echo ==========================================

REM Default values
set DB_HOST=localhost
set DB_PORT=3306
set DB_USER=root
set DB_PASS=
set DB_NAME=wcrm

echo.
echo This script will set up the WhatsEra CRM database with sample data.
echo.

REM Get database credentials
echo Please enter your database credentials:
echo.

set /p "input_host=Database Host [%DB_HOST%]: "
if not "%input_host%"=="" set DB_HOST=%input_host%

set /p "input_port=Database Port [%DB_PORT%]: "
if not "%input_port%"=="" set DB_PORT=%input_port%

set /p "input_user=Database User [%DB_USER%]: "
if not "%input_user%"=="" set DB_USER=%input_user%

set /p "DB_PASS=Database Password: "

set /p "input_name=Database Name [%DB_NAME%]: "
if not "%input_name%"=="" set DB_NAME=%input_name%

echo.
echo Testing database connection...

REM Test database connection
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% -e "SELECT 1;" >nul 2>&1

if %errorlevel% equ 0 (
    echo ✓ Database connection successful!
) else (
    echo ✗ Database connection failed!
    echo Please check your credentials and MySQL installation.
    echo.
    echo Make sure:
    echo 1. MySQL is installed and running
    echo 2. MySQL command line tools are in your PATH
    echo 3. Your credentials are correct
    echo.
    pause
    exit /b 1
)

echo.
echo Database connection successful!
echo.
echo WARNING: This will create/recreate the '%DB_NAME%' database.
echo All existing data will be lost!
echo.
set /p "confirm=Do you want to continue? (y/n): "

if /i not "%confirm%"=="y" (
    echo Setup cancelled.
    pause
    exit /b 0
)

echo.
echo Setting up WhatsEra CRM database...
echo.

REM Check if SQL file exists
if not exist "database_setup_complete.sql" (
    echo ✗ Error: database_setup_complete.sql file not found!
    echo Please make sure the SQL file is in the same directory as this script.
    echo.
    pause
    exit /b 1
)

REM Run the SQL script
mysql -h%DB_HOST% -P%DB_PORT% -u%DB_USER% -p%DB_PASS% < database_setup_complete.sql

if %errorlevel% equ 0 (
    echo.
    echo ✓ Database setup completed successfully!
    echo.
    echo ==========================================
    echo Setup Summary:
    echo ==========================================
    echo Database Host: %DB_HOST%
    echo Database Port: %DB_PORT%
    echo Database Name: %DB_NAME%
    echo Database User: %DB_USER%
    echo.
    echo Test Credentials Created:
    echo 👑 Admin: admin@whatscrm.com / admin123
    echo 👤 User: user@test.com / admin123
    echo 🎧 Agent: agent@test.com / admin123
    echo.
    echo You can now start your WhatsEra CRM application!
    echo ==========================================
) else (
    echo ✗ Database setup failed!
    echo Please check the error messages above and try again.
    echo.
    pause
    exit /b 1
)

echo.
set /p "create_env=Do you want to create/update .env file with database settings? (y/n): "

if /i "%create_env%"=="y" (
    echo.
    echo Creating .env file...
    
    (
        echo # Database Configuration
        echo DBHOST=%DB_HOST%
        echo DBPORT=%DB_PORT%
        echo DBUSER=%DB_USER%
        echo DBPASS=%DB_PASS%
        echo DBNAME=%DB_NAME%
        echo.
        echo # Application Configuration
        echo PORT=8001
        echo NODE_ENV=development
        echo.
        echo # JWT Configuration
        echo JWT_SECRET=your_jwt_secret_key_here
        echo.
        echo # Email Configuration (Optional^)
        echo SMTP_HOST=localhost
        echo SMTP_PORT=587
        echo SMTP_USER=
        echo SMTP_PASS=
        echo.
        echo # WhatsApp API Configuration (Optional^)
        echo WHATSAPP_API_URL=
        echo WHATSAPP_API_TOKEN=
    ) > .env
    
    echo ✓ .env file created successfully!
    echo Please update JWT_SECRET and other configuration as needed.
)

echo.
echo Setup completed! You can now run your WhatsEra CRM application.
echo.
pause
