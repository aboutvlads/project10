import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import DealPage from './pages/DealPage';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './pages/Welcome';
import AuthCallback from './pages/AuthCallback';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/" element={<Welcome />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard/:id"
              element={
                <ProtectedRoute>
                  <DealPage />
                </ProtectedRoute>
              }
            />
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
}