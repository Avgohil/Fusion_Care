import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Brain, User, LogOut, UserCircle, Guitar as Hospital, Stethoscope, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-soft fixed w-full top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-2xl shadow-lg group-hover:shadow-glow transition-all duration-300 transform group-hover:scale-105">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="font-display font-bold text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Care Catalyst
                </span>
                <div className="flex items-center space-x-1 mt-1">
                  <Sparkles className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">AI Powered</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="relative text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            {user && (
              <>
                <Link to="/assessment" className="relative text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg group">
                  Assessment
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/dashboard" className="relative text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg group">
                  Dashboard
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                <Link to="/hospitals" className="relative text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg group flex items-center">
                  <Hospital className="h-5 w-5 mr-2" />
                  Hospitals
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
                {user.isAdmin && (
                  <Link to="/admin" className="relative text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg group">
                    Admin
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                )}
              </>
            )}
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 transition-colors group"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-2.5 rounded-xl group-hover:from-blue-200 group-hover:to-purple-200 transition-all duration-300">
                      <UserCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    {!user.profileCompleted && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                    )}
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{user.name}</span>
                    {!user.profileCompleted && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Complete Profile
                      </div>
                    )}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors group"
                >
                  <div className="p-2 rounded-xl group-hover:bg-red-50 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-semibold text-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="relative group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <span className="relative">Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-xl hover:bg-blue-50 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-soft">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              to="/"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {user && (
              <>
                <Link
                  to="/assessment"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Assessment
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/hospitals"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Hospital className="h-5 w-5 mr-3" />
                  Find Hospitals
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin
                  </Link>
                )}
              </>
            )}
            
            {user ? (
              <div className="px-4 py-4 border-t border-gray-200 mt-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 mb-4 text-gray-700 hover:text-blue-600 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-2.5 rounded-xl">
                    <UserCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <span className="font-semibold text-lg">{user.name}</span>
                    {!user.profileCompleted && (
                      <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium mt-1">
                        Complete Profile
                      </div>
                    )}
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <div className="p-2 rounded-xl hover:bg-red-50 transition-colors">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="px-4 py-4 border-t border-gray-200 mt-4 space-y-3">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl font-semibold text-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 text-center font-semibold text-lg transition-all duration-300 shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;