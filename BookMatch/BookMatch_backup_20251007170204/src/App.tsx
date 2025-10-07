import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { GlobalStyles } from './styles/GlobalStyles.tsx';
import { theme } from './styles/theme.ts';

// Screens
import WelcomeScreen from './screens/WelcomeScreen.tsx';
import LoginScreen from './screens/auth/LoginScreen.tsx';
import RegisterScreen from './screens/auth/RegisterScreen.tsx';
import VerificationScreen from './screens/auth/VerificationScreen.tsx';
import SwipeScreen from './screens/SwipeScreen.tsx';
import MapScreen from './screens/MapScreen.tsx';
import ChatListScreen from './screens/ChatListScreen.tsx';
import ChatScreen from './screens/ChatScreen.tsx';
import ProfileScreen from './screens/ProfileScreen.tsx';
import ProfileEditScreen from './screens/ProfileEditScreen.tsx';
import BookDetailScreen from './screens/BookDetailScreen.tsx';
import SubscriptionScreen from './screens/SubscriptionScreen.tsx';

// Context
import { AuthProvider, useAuth } from './context/AuthContext.tsx';
import { LocationProvider } from './context/LocationContext.tsx';

// Components
import MainNavigation from './components/MainNavigation.tsx';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Loading component
  }

  return user ? <>{children}</> : <Navigate to="/welcome" replace />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Loading component
  }

  return !user ? <>{children}</> : <Navigate to="/swipe" replace />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/welcome" element={
        <PublicRoute>
          <WelcomeScreen />
        </PublicRoute>
      } />
      <Route path="/login" element={
        <PublicRoute>
          <LoginScreen />
        </PublicRoute>
      } />
      <Route path="/register" element={
        <PublicRoute>
          <RegisterScreen />
        </PublicRoute>
      } />
      <Route path="/verification" element={
        <PublicRoute>
          <VerificationScreen />
        </PublicRoute>
      } />

      {/* Protected Routes */}
      <Route path="/swipe" element={
        <ProtectedRoute>
          <MainNavigation>
            <SwipeScreen />
          </MainNavigation>
        </ProtectedRoute>
      } />
      <Route path="/map" element={
        <ProtectedRoute>
          <MainNavigation>
            <MapScreen />
          </MainNavigation>
        </ProtectedRoute>
      } />
      <Route path="/chats" element={
        <ProtectedRoute>
          <MainNavigation>
            <ChatListScreen />
          </MainNavigation>
        </ProtectedRoute>
      } />
      <Route path="/chat/:chatId" element={
        <ProtectedRoute>
          <ChatScreen />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute>
          <MainNavigation>
            <ProfileScreen />
          </MainNavigation>
        </ProtectedRoute>
      } />
      <Route path="/profile/edit" element={
        <ProtectedRoute>
          <ProfileEditScreen />
        </ProtectedRoute>
      } />
      <Route path="/book/:bookId" element={
        <ProtectedRoute>
          <BookDetailScreen />
        </ProtectedRoute>
      } />
      <Route path="/subscription" element={
        <ProtectedRoute>
          <SubscriptionScreen />
        </ProtectedRoute>
      } />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/welcome" replace />} />
    </Routes>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <AuthProvider>
          <LocationProvider>
            <AppRoutes />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </LocationProvider>
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;

