import  { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { AssessmentProvider } from './contexts/AssessmentContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Recommendations from './pages/Recommendations';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import HospitalFinder from './pages/HospitalFinder';
import AdminPanel from './pages/AdminPanel';
import DoctorRecommendation from './pages/DoctorRecommendation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <AuthProvider>
      <AssessmentProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />
                <Route path="/hospitals" element={
                  <ProtectedRoute>
                    <HospitalFinder />
                  </ProtectedRoute>
                } />
                <Route path="/assessment" element={
                  <ProtectedRoute>
                    <Assessment />
                  </ProtectedRoute>
                } />
                <Route path="/results" element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                } />
                <Route path="/recommendations" element={
                  <ProtectedRoute>
                    <Recommendations />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin" element={
                  <ProtectedRoute requireAdmin>
                    <AdminPanel />
                  </ProtectedRoute>
                } />
                <Route path="/doctors" element={
                  <ProtectedRoute>
                    <DoctorRecommendation />
                  </ProtectedRoute>
                } />
              </Routes>
              {/* Display message from backend */}
              <p>{message}</p>
            </main>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AssessmentProvider>
    </AuthProvider>
  );
}

export default App;