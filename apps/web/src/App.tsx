import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import TestCaseList from './pages/TestCaseList';
import TestCaseCreate from './pages/TestCaseCreate';
import TestSuiteList from './pages/TestSuiteList';
import TestRunList from './pages/TestRunList';
import TestExecution from './pages/TestExecution';
import BugList from './pages/BugList';
import BugDetail from './pages/BugDetail';
import Reports from './pages/Reports';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="test-cases" element={<TestCaseList />} />
              <Route path="test-cases/new" element={<TestCaseCreate />} />
              <Route path="test-suites" element={<TestSuiteList />} />
              <Route path="test-runs" element={<TestRunList />} />
              <Route path="executions/:id" element={<TestExecution />} />
              <Route path="bugs" element={<BugList />} />
              <Route path="bugs/:id" element={<BugDetail />} />
              <Route path="reports" element={<Reports />} />
              <Route index element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
