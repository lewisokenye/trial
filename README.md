# Usana - Food Security Platform 🌱

A comprehensive web platform connecting donors, farmers, and communities to reduce food waste, improve nutrition, and build sustainable food systems.

![Usana Platform](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)

## 🌟 Features

### Core Modules

- **🎁 Donation Management** - Track food and monetary donations with real-time status updates
- **🌾 Farmer Portal** - Manage farms, crops, yields, and certifications
- **♻️ Waste Management** - Monitor food waste and track items expiring soon
- **🍎 Nutrition Planning** - Generate meal plans and nutrition recommendations
- **🚚 Supply Chain** - Optimize delivery routes and track shipments
- **🐛 Disease Analysis** - Crop disease detection and treatment recommendations

### Platform Capabilities

- Role-based authentication (Donor, Farmer, NGO, Admin)
- Real-time analytics and reporting
- Expiry item tracking with notifications
- Multi-currency support (KES, USD, EUR)
- Mobile payment integration (M-Pesa, Paystack)
- Responsive design for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd usana
```

2. **Set up Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

3. **Set up Frontend** (new terminal)
```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with your API URL
npm run dev
```

4. **Open your browser**
```
http://localhost:5173
```

## 📁 Project Structure

```
usana/
├── backend/              # Express.js REST API
│   ├── src/
│   │   ├── controllers/  # Route handlers
│   │   ├── models/       # MongoDB schemas
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & validation
│   │   └── utils/        # Helper functions
│   └── package.json
│
├── frontend/             # React + TypeScript UI
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API services
│   │   ├── context/      # React context
│   │   └── App.tsx       # Main app
│   └── package.json
│
└── DEPLOYMENT.md         # Deployment guide
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Express.js 5
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: express-validator
- **Security**: Helmet, CORS, Rate limiting

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts
- **Notifications**: React Toastify

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/usana
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📚 API Documentation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/updatedetails` - Update profile
- `PUT /api/auth/updatepassword` - Change password

### Donations
- `GET /api/donations` - List all donations
- `POST /api/donations` - Create donation
- `GET /api/donations/:id` - Get donation details
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Farmers
- `GET /api/farmers` - List all farmers
- `POST /api/farmers` - Register farmer
- `GET /api/farmers/:id` - Get farmer profile
- `POST /api/farmers/:id/yields` - Add yield data

### Waste Management
- `GET /api/waste` - List waste entries
- `POST /api/waste` - Log waste entry
- `GET /api/waste/analytics/overview` - Get analytics
- `GET /api/waste/expiry` - List expiring items

See full API documentation in `/backend/README.md`

## 🎨 UI Preview

### Landing Page
Clean, modern homepage with feature highlights and call-to-action.

### Dashboard
Comprehensive overview with statistics, recent activities, and quick actions.

### Donations
Intuitive interface for creating and managing food/money donations.

### Farmers
Grid view of registered farmers with verification status and farm details.

### Waste Management
Track waste entries and expiring items with analytics.

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Railway):**
1. Connect repository
2. Add environment variables
3. Deploy automatically

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📝 License

MIT License - feel free to use this project for learning or production.

## 👥 Team

Built with ❤️ for sustainable food security.

## 📧 Contact

For questions or support, please open an issue.

---

**Building a sustainable food future together** 🌱
