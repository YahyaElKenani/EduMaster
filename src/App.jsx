import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import SignupForm from './pages/signup';
import Forget from './pages/forget';
import Lessons from './pages/Lessons';
import VerifyPayment from './pages/VerifyPayment';
import PaymentFailed from './pages/PaymentFailed';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);
  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
  <>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path='/forget' element={<Forget/>} />
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/lessons" element={<ProtectedRoute><Lessons /></ProtectedRoute>} />
          <Route path="/verify-payment" element={<ProtectedRoute><VerifyPayment /></ProtectedRoute>} />
          <Route path="/payment-failed" element={<ProtectedRoute><PaymentFailed /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  </>
  )
}

export default App
