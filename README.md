# WhatsCRM v5.0

A modern WhatsApp CRM platform built with React + Vite + TypeScript frontend and Node.js backend.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server running locally
- Database named `wcrm`

### Installation & Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd WhatsCRM-v5.0
   npm install
   ```

2. **Setup Database**
   - Make sure MySQL server is running
   - Create a database named `wcrm`
   - Run the database setup:
   ```bash
   node setup_database.js
   ```

3. **Configure Environment**
   - Update `.env` file with your database credentials:
   ```env
   DBHOST=localhost
   DBNAME=wcrm
   DBUSER=root
   DBPASS=your_password
   DBPORT=3306
   ```

4. **Start the Application**
   ```bash
   npm start
   ```

   This will:
   - Automatically build the React frontend (if needed)
   - Start the Node.js backend server
   - Serve the application on http://localhost:8001

## 🌟 Features

### ✅ Completed Features
- **Modern React Frontend** - Built with Vite + TypeScript + Tailwind CSS
- **Beautiful Landing Page** - Professional marketing page with features showcase
- **Multi-Role Authentication** - Support for Users, Admins, and Agents
- **Responsive Dashboard** - Modern sidebar navigation and dashboard layout
- **Database Integration** - Complete MySQL database setup with all required tables
- **CORS Configuration** - Proper cross-origin resource sharing setup
- **Automatic Frontend Building** - Frontend builds automatically when backend starts

### 🚧 In Development
- QR Code Management
- WhatsApp Campaign Creation
- Contact Management
- Chatbot Builder
- Analytics Dashboard
- Message Templates

## 🏗️ Architecture

### Frontend (React + Vite + TypeScript)
- **Location**: `whatscrm-frontend/`
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **HTTP Client**: Axios

### Backend (Node.js + Express)
- **Framework**: Express.js
- **Database**: MySQL with mysql2
- **Authentication**: JWT tokens
- **File Upload**: express-fileupload
- **CORS**: Configured for development and production

## 📁 Project Structure

```
WhatsCRM v5.0/
├── whatscrm-frontend/          # React frontend
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/             # Page components
│   │   ├── contexts/          # React contexts
│   │   ├── lib/               # Utilities and API client
│   │   └── types/             # TypeScript type definitions
│   ├── dist/                  # Built frontend (auto-generated)
│   └── package.json
├── routes/                    # Backend API routes
├── database/                  # Database configuration
├── server.js                 # Main server file
├── start.js                  # Startup script
├── setup_database.js         # Database setup script
├── package.json              # Backend dependencies
└── .env                      # Environment configuration
```

## 🔧 Development

### Frontend Development
```bash
# Start frontend in development mode (with hot reload)
npm run frontend:dev

# Build frontend for production
npm run frontend:build
```

### Backend Development
```bash
# Start only the backend server
npm run server
```

### Full Development Setup
```bash
# Build frontend and start backend
npm run dev
```

## 🌐 API Endpoints

### Authentication
- `POST /api/user/signup` - User registration
- `POST /api/user/login` - User login
- `POST /api/admin/login` - Admin login
- `POST /api/agent/login` - Agent login

### Campaigns
- `GET /api/campaign/get` - Get all campaigns
- `POST /api/campaign/create` - Create new campaign
- `DELETE /api/campaign/delete/:id` - Delete campaign

### Contacts
- `GET /api/contact/get` - Get all contacts
- `POST /api/contact/create` - Create new contact
- `DELETE /api/contact/delete/:id` - Delete contact

### Instances (QR Codes)
- `GET /api/instance/get` - Get all instances
- `POST /api/instance/create` - Create new instance
- `GET /api/instance/qr/:id` - Get QR code for instance

## 🎨 UI Components

The frontend includes a comprehensive set of reusable components:
- **Authentication Forms** - Login and signup with validation
- **Dashboard Layout** - Responsive sidebar and header
- **Landing Page** - Marketing page with features and pricing
- **Loading Spinners** - Various loading states
- **Protected Routes** - Route guards for authenticated users

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation with Zod
- Protected API routes
- Role-based access control

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Production Build
```bash
# Build frontend for production
npm run frontend:build

# Start production server
npm run server
```

### Environment Variables
Make sure to set proper environment variables for production:
- `DBHOST` - Database host
- `DBNAME` - Database name
- `DBUSER` - Database user
- `DBPASS` - Database password
- `JWTKEY` - JWT secret key
- `FRONTENDURI` - Frontend URL
- `BACKURI` - Backend URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify database connection
3. Ensure all dependencies are installed
4. Check the GitHub issues page

---

**WhatsCRM v5.0** - Transform your WhatsApp marketing with the most powerful CRM platform.
"# work" 
