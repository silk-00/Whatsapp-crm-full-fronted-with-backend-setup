const { spawn, exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// =====================================================
// WhatsEra CRM - Complete Startup Script
// Version: 2.0
// Description: Handles frontend build + auto setup + server start
// =====================================================

class WhatsEraStarter {
  constructor() {
    this.frontendPath = path.join(__dirname, 'whatscrm-frontend');
    this.distPath = path.join(this.frontendPath, 'dist');
  }

  // Check if frontend is built
  isFrontendBuilt() {
    return fs.existsSync(this.distPath) && fs.existsSync(path.join(this.distPath, 'index.html'));
  }

  // Check if frontend dependencies are installed
  areFrontendDepsInstalled() {
    return fs.existsSync(path.join(this.frontendPath, 'node_modules'));
  }

  // Run command and return promise
  runCommand(command, cwd = __dirname, showOutput = true) {
    return new Promise((resolve, reject) => {
      console.log(`🔧 Running: ${command}`);
      
      const child = spawn(command, [], {
        shell: true,
        cwd: cwd,
        stdio: showOutput ? 'inherit' : 'pipe'
      });

      child.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Command failed with code ${code}`));
        }
      });

      child.on('error', (error) => {
        reject(error);
      });
    });
  }

  // Install frontend dependencies
  async installFrontendDeps() {
    console.log('\n📦 Installing frontend dependencies...');
    try {
      await this.runCommand('npm install', this.frontendPath);
      console.log('✓ Frontend dependencies installed successfully!');
    } catch (error) {
      console.error('❌ Failed to install frontend dependencies:', error.message);
      throw error;
    }
  }

  // Build frontend
  async buildFrontend() {
    console.log('\n🏗️  Building frontend...');
    try {
      await this.runCommand('npm run build', this.frontendPath);
      console.log('✓ Frontend built successfully!');
    } catch (error) {
      console.error('❌ Failed to build frontend:', error.message);
      throw error;
    }
  }

  // Check and install backend dependencies
  async checkBackendDeps() {
    if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
      console.log('\n📦 Installing backend dependencies...');
      try {
        await this.runCommand('npm install');
        console.log('✓ Backend dependencies installed successfully!');
      } catch (error) {
        console.error('❌ Failed to install backend dependencies:', error.message);
        throw error;
      }
    }
  }

  // Start the server
  async startServer() {
    console.log('\n🚀 Starting WhatsEra CRM server...');
    
    // Start server with auto-setup
    const serverProcess = spawn('node', ['server.js'], {
      stdio: 'inherit',
      cwd: __dirname
    });

    // Handle server process events
    serverProcess.on('error', (error) => {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    });

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down WhatsEra CRM...');
      serverProcess.kill('SIGINT');
      process.exit(0);
    });

    process.on('SIGTERM', () => {
      console.log('\n🛑 Shutting down WhatsEra CRM...');
      serverProcess.kill('SIGTERM');
      process.exit(0);
    });
  }

  // Main startup process
  async start() {
    try {
      console.log('\n🌟 WhatsEra CRM v5.0 - Complete Startup');
      console.log('=====================================\n');

      // Step 1: Check backend dependencies
      await this.checkBackendDeps();

      // Step 2: Check frontend dependencies
      if (!this.areFrontendDepsInstalled()) {
        await this.installFrontendDeps();
      } else {
        console.log('✓ Frontend dependencies already installed');
      }

      // Step 3: Build frontend if needed
      if (!this.isFrontendBuilt()) {
        console.log('📱 Frontend not built, building now...');
        await this.buildFrontend();
      } else {
        console.log('✓ Frontend already built');
      }

      // Step 4: Start server (with auto database setup)
      await this.startServer();

    } catch (error) {
      console.error('\n❌ Startup failed:', error.message);
      console.log('\n💡 Troubleshooting:');
      console.log('1. Make sure Node.js and npm are installed');
      console.log('2. Check if MySQL server is running');
      console.log('3. Verify database credentials in .env file');
      console.log('4. Try running: npm install');
      process.exit(1);
    }
  }

  // Quick start (skip checks, just start)
  async quickStart() {
    console.log('\n⚡ WhatsEra CRM - Quick Start');
    console.log('============================\n');
    await this.startServer();
  }
}

// Handle command line arguments
const args = process.argv.slice(2);
const starter = new WhatsEraStarter();

if (args.includes('--quick') || args.includes('-q')) {
  // Quick start mode
  starter.quickStart();
} else {
  // Full startup with checks
  starter.start();
}
