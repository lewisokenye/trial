# Usana Frontend

Modern, responsive React frontend for the Usana food security platform built with Vite, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI** - Clean, green-themed interface with Tailwind CSS
- 🔐 **Authentication** - Secure login and registration system
- 🎯 **Role-based Access** - Support for donors, farmers, NGOs, and admins
- 📊 **Dashboard** - Comprehensive overview with real-time stats
- 🎁 **Donations** - Manage food and monetary donations
- 🌾 **Farmer Management** - Track farms, yields, and crops
- ♻️ **Waste Management** - Monitor and reduce food waste

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Toastify** - Notifications
- **date-fns** - Date formatting

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/         # React context providers
├── pages/           # Page components
├── services/        # API service layer
├── App.tsx          # Main app with routing
└── main.tsx         # App entry point
```

## License

MIT
