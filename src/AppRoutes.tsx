import { Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
import HowItWorks from './pages/HowItWorks';
import AirportSelection from './pages/AirportSelection';
import HomeAirport from './pages/HomeAirport';
import Preferences from './pages/Preferences';
import Notifications from './pages/Notifications';
import AuthCallback from './pages/AuthCallback';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';

export default function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/auth/callback" element={<AuthCallback />} />
      <Route path="/" element={<Welcome />} />
      <Route
        path="/onboarding"
        element={
          <ProtectedRoute>
            <HowItWorks />
          </ProtectedRoute>
        }
      />
      <Route
        path="/airport-selection"
        element={
          <ProtectedRoute>
            <AirportSelection />
          </ProtectedRoute>
        }
      />
      <Route
        path="/home-airport"
        element={
          <ProtectedRoute>
            <HomeAirport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/preferences"
        element={
          <ProtectedRoute>
            <Preferences />
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
