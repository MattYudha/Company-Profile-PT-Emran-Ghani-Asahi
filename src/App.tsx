import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SocketProvider } from './contexts/SocketContext';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import TwoFactorSetupPage from './pages/auth/TwoFactorSetupPage';
import TwoFactorVerifyPage from './pages/auth/TwoFactorVerifyPage';

// Main App Pages
import DashboardPage from './pages/DashboardPage';
import ProfilePage from ./pages/ProfilePage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import ActivityLogPage from './pages/ActivityLogPage';
import GoalsPage from './pages/GoalsPage';

// Protected Route Component
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          <NotificationProvider>
            <Router>
              <Toaster
                position="top-right"
                toastOptions={{
                  className: 'toast',
                  duration: 4000,
                }}
              />
              <Routes>
                {/* Auth Routes */}
                <Route element={<AuthLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                  <Route path="/two-factor/setup" element={<TwoFactorSetupPage />} />
                  <Route path="/two-factor/verify" element={<TwoFactorVerifyPage />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<MainLayout />}>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/mood-tracker" element={<MoodTrackerPage />} />
                    <Route path="/activity-log" element={<ActivityLogPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </NotificationProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;