import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import DealPage from './pages/DealPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import AuthCallback from './pages/AuthCallback';
import HowItWorks from './pages/HowItWorks';
import AirportSelection from './pages/AirportSelection';
import HomeAirport from './pages/HomeAirport';
import Preferences from './pages/Preferences';
import Notifications from './pages/Notifications';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/signin" element={<Welcome />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/dashboard/:id" element={<ProtectedRoute><DealPage /></ProtectedRoute>} />
            <Route path="/onboarding" element={<ProtectedRoute><HowItWorks /></ProtectedRoute>} />
            <Route path="/airport-selection" element={<ProtectedRoute><AirportSelection /></ProtectedRoute>} />
            <Route path="/home-airport" element={<ProtectedRoute><HomeAirport /></ProtectedRoute>} />
            <Route path="/preferences" element={<ProtectedRoute><Preferences /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}