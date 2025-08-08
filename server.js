require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const { initCampaign } = require("./loops/campaignBeta.js");
const { runCampaign } = require("./loops/campaignLoop.js");
const nodeCleanup = require("node-cleanup");
const { init, cleanup } = require("./helper/addon/qr");
const AutoSetup = require("./auto_setup");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use(express.urlencoded({ extended: true }));

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:8001',
    'http://127.0.0.1:8001',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTENDURI || 'http://localhost:8001'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(express.json());
app.use(fileUpload());

// routers
const userRoute = require("./routes/user");
app.use("/api/user", userRoute);

const webRoute = require("./routes/web");
app.use("/api/web", webRoute);

const adminRoute = require("./routes/admin");
app.use("/api/admin", adminRoute);

const phonebookRoute = require("./routes/phonebook");
app.use("/api/phonebook", phonebookRoute);

const chat_flowRoute = require("./routes/chatFlow");
app.use("/api/chat_flow", chat_flowRoute);

const inboxRoute = require("./routes/inbox");
app.use("/api/inbox", inboxRoute);

const templetRoute = require("./routes/templet");
app.use("/api/templet", templetRoute);

const chatbotRoute = require("./routes/chatbot");
app.use("/api/chatbot", chatbotRoute);

const broadcastRoute = require("./routes/broadcast");
app.use("/api/broadcast", broadcastRoute);

const apiRoute = require("./routes/apiv2");
app.use("/api/v1", apiRoute);

const agentRoute = require("./routes/agent");
app.use("/api/agent", agentRoute);

const qrRoute = require("./routes/qr");
app.use("/api/qr", qrRoute);

const aiRoute = require("./routes/ai");
app.use("/api/ai", aiRoute);

const path = require("path");
const { warmerLoopInit } = require("./helper/addon/qr/warmer/index.js");

const currentDir = process.cwd();

// Serve the new React frontend
const frontendDistPath = path.resolve(currentDir, "./whatscrm-frontend/dist");

if (require('fs').existsSync(frontendDistPath)) {
  console.log('Serving React frontend from:', frontendDistPath);
  app.use(express.static(frontendDistPath));

  // Serve the React app for all other routes (SPA routing)
  app.get("*", function (request, response) {
    response.sendFile(path.resolve(frontendDistPath, "index.html"));
  });
} else {
  console.log('❌ Frontend not built! Please run: npm run frontend:build');
  app.get("*", function (request, response) {
    response.status(500).send(`
      <html>
        <head><title>WhatsCRM - Setup Required</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h1>🚀 WhatsCRM v5.0</h1>
          <h2>Frontend Setup Required</h2>
          <p>Please build the frontend first:</p>
          <code style="background: #f5f5f5; padding: 10px; border-radius: 5px;">npm run frontend:build</code>
          <p>Then restart the server:</p>
          <code style="background: #f5f5f5; padding: 10px; border-radius: 5px;">npm start</code>
        </body>
      </html>
    `);
  });
}

// Auto-setup function
async function startServer() {
  console.log('\n🚀 Starting WhatsEra CRM v5.0...\n');

  // Initialize auto-setup
  const autoSetup = new AutoSetup();

  // Run automatic setup if needed
  const setupSuccess = await autoSetup.run();

  if (!setupSuccess) {
    console.log('\n❌ Setup failed! Please check the errors above.');
    console.log('💡 You can try manual setup: node setup_database_interactive.js');
    process.exit(1);
  }

  // Start the server after successful setup
  const server = app.listen(process.env.PORT || 8001, () => {
    console.log(`🌟 WhatsEra CRM server is running on port ${process.env.PORT || 8001}`);
    console.log(`🌐 Access your CRM at: http://localhost:${process.env.PORT || 8001}`);
    console.log('\n📋 Test Credentials:');
    console.log('👑 Admin: admin@whatscrm.com / admin123');
    console.log('👤 User: user@test.com / admin123');
    console.log('🎧 Agent: agent@test.com / admin123\n');

    // Initialize WhatsApp and other services
    init();
    setTimeout(() => {
      runCampaign();
      warmerLoopInit();
      initCampaign();
    }, 1000);
  });

  // Initialize Socket.IO after server is running
  const io = require("./socket").initializeSocket(server);

  // Cleanup handler
  nodeCleanup(cleanup);

  return io;
}

// Start the server with auto-setup
startServer().catch(error => {
  console.error('\n❌ Failed to start server:', error.message);
  process.exit(1);
});
