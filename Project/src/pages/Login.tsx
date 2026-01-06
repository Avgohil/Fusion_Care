import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Mail, Lock, Eye, EyeOff, Sparkles, Zap, User, Stethoscope } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';


const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState<'patient' | 'doctor' | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (userType === 'patient') {
        await login(email, password);
        toast.success('Welcome back! 🎉');
        navigate('/dashboard');
      } else if (userType === 'doctor') {
        // For doctor, it should be blank for now
        toast.success('Doctor login selected. Functionality coming soon!');
        // Optionally navigate to a blank page or clear form
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-25 via-purple-25 to-pink-25 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8 relative"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center mb-6"
          >
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-4 rounded-3xl shadow-2xl">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-r from-pink-400 to-red-400 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-4xl font-display font-bold text-gray-900 mb-3">
              Welcome Back! 👋
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in to continue your cognitive health journey
            </p>
          </motion.div>
        </div>

        {!userType ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 space-y-6 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Are you a Patient or a Doctor?</h3>
            <div className="flex justify-center space-x-6">
              <button
                onClick={() => setUserType('patient')}
                className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <User className="h-12 w-12 text-blue-600 mb-3" />
                <span className="text-lg font-semibold text-gray-800">Patient</span>
              </button>
              <button
                onClick={() => setUserType('doctor')}
                className="flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft border border-white/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Stethoscope className="h-12 w-12 text-purple-600 mb-3" />
                <span className="text-lg font-semibold text-gray-800">Doctor</span>
              </button>
            </div>
          </motion.div>
        ) : userType === 'patient' ? (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50">
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-12 pr-12 w-full px-4 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-white/70 backdrop-blur-sm text-lg"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-6">
                <div className="text-sm">
                  <Link to="/forgot-password" className="text-blue-600 hover:text-blue-500 font-semibold transition-colors">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg hover:shadow-glow relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <span className="relative flex items-center justify-center">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Signing in...
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5 mr-2" />
                      Sign In
                    </>
                  )}
                </span>
              </button>

              <div className="text-center mt-6">
                <p className="text-gray-600">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-blue-600 hover:text-blue-500 font-bold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100"
            >
              <div className="flex items-center mb-3">
                <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
                <p className="text-sm text-blue-800 font-semibold">Demo Accounts:</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs text-blue-700">
                  <strong>Admin:</strong> admin@carecatalyst.com / password123
                </p>
                <p className="text-xs text-blue-700">
                  <strong>User:</strong> user@example.com / password123
                </p>
              </div>
            </motion.div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 space-y-6 text-center"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Doctor Portal</h3>
            <p className="text-gray-600">Doctor login functionality will be implemented soon.</p>
            <button
              onClick={() => setUserType(null)}
              className="mt-4 text-blue-600 hover:text-blue-500 font-semibold transition-colors"
            >
              Back to selection
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Login;