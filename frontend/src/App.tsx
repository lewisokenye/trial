import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Donations from './pages/Donations';
import Farmers from './pages/Farmers';
import WasteManagement from './pages/WasteManagement';
import Nutrition from './pages/Nutrition';
import SupplyChain from './pages/SupplyChain';
import Disease from './pages/Disease';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donations" element={<Donations />} />
          <Route path="/farmers" element={<Farmers />} />
          <Route path="/waste" element={<WasteManagement />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/supply-chain" element={<SupplyChain />} />
          <Route path="/disease" element={<Disease />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>
    </Router>
  );
}

export default App;
