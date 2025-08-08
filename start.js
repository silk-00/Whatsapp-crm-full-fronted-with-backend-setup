const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('🚀 Starting WhatsCRM v5.0...\n');

// Check if frontend dist exists
const frontendDistPath = path.join(__dirname, 'whatscrm-frontend', 'dist');
const frontendExists = fs.existsSync(frontendDistPath);

if (!frontendExists) {
  console.log('📦 Building frontend for the first time...');
  
  // Build frontend
  const buildProcess = spawn('npm', ['run', 'build'], {
    cwd: path.join(__dirname, 'whatscrm-frontend'),
    stdio: 'inherit',
    shell: true
  });

  buildProcess.on('close', (code) => {
    if (code === 0) {
      console.log('✅ Frontend built successfully!');
      startServer();
    } else {
      console.error('❌ Frontend build failed!');
      process.exit(1);
    }
  });
} else {
  console.log('✅ Frontend already built, starting server...');
  startServer();
}

function startServer() {
  console.log('\n🌟 Starting WhatsCRM server...');
  
  // Start the main server
  const serverProcess = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
  });

  serverProcess.on('close', (code) => {
    console.log(`Server process exited with code ${code}`);
  });

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down WhatsCRM...');
    serverProcess.kill('SIGINT');
    process.exit(0);
  });

  process.on('SIGTERM', () => {
    console.log('\n🛑 Shutting down WhatsCRM...');
    serverProcess.kill('SIGTERM');
    process.exit(0);
  });
}
