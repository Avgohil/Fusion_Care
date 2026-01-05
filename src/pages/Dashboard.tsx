import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Leaf, Activity, TrendingUp, Users, Award, Clock, UserCircle, Guitar as Hospital, Sparkles, Zap, Star, Target } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAssessment } from '../contexts/AssessmentContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { result } = useAssessment();

  // Mock data for charts
  const progressData = [
    { date: '2024-01', cognitiveScore: 3.2, riskScore: 2.8 },
    { date: '2024-02', cognitiveScore: 3.1, riskScore: 2.6 },
    { date: '2024-03', cognitiveScore: 2.9, riskScore: 2.4 },
    { date: '2024-04', cognitiveScore: 2.8, riskScore: 2.2 },
    { date: '2024-05', cognitiveScore: 2.7, riskScore: 2.1 },
    { date: '2024-06', cognitiveScore: 2.6, riskScore: 2.0 },
  ];

  const activityData = [
    { day: 'Mon', meditation: 20, exercise: 45, sleep: 7.5 },
    { day: 'Tue', meditation: 15, exercise: 30, sleep: 8.0 },
    { day: 'Wed', meditation: 25, exercise: 60, sleep: 7.2 },
    { day: 'Thu', meditation: 20, exercise: 40, sleep: 7.8 },
    { day: 'Fri', meditation: 30, exercise: 35, sleep: 7.5 },
    { day: 'Sat', meditation: 35, exercise: 90, sleep: 8.5 },
    { day: 'Sun', meditation: 40, exercise: 75, sleep: 8.2 },
  ];

  const stats = [
    {
      title: 'Assessments Completed',
      value: result ? '1' : '0',
      icon: Brain,
      gradient: 'from-blue-500 to-purple-600',
      change: result ? '+1 this month' : 'Take your first assessment',
      bgColor: 'from-blue-50 to-purple-50'
    },
    {
      title: 'Current Risk Level',
      value: result ? result.alzheimerRisk : 'N/A',
      icon: Activity,
      gradient: result?.alzheimerRisk === 'Low' ? 'from-green-500 to-emerald-600' : 
             result?.alzheimerRisk === 'Medium' ? 'from-yellow-500 to-orange-600' : 'from-red-500 to-pink-600',
      change: result ? `Score: ${result.riskScore.toFixed(1)}/5.0` : 'Complete assessment',
      bgColor: result?.alzheimerRisk === 'Low' ? 'from-green-50 to-emerald-50' : 
               result?.alzheimerRisk === 'Medium' ? 'from-yellow-50 to-orange-50' : 'from-red-50 to-pink-50'
    },
    {
      title: 'Prakriti Type',
      value: result ? result.prakritiType : 'Unknown',
      icon: Leaf,
      gradient: 'from-green-500 to-teal-600',
      change: result ? `${result.dominantDosha} dominant` : 'Discover your type',
      bgColor: 'from-green-50 to-teal-50'
    },
    {
      title: 'Profile Status',
      value: user?.profileCompleted ? 'Complete' : 'Incomplete',
      icon: UserCircle,
      gradient: user?.profileCompleted ? 'from-emerald-500 to-green-600' : 'from-orange-500 to-red-600',
      change: user?.profileCompleted ? 'All information provided' : 'Complete your profile',
      bgColor: user?.profileCompleted ? 'from-emerald-50 to-green-50' : 'from-orange-50 to-red-50'
    }
  ];

  const achievements = [
    { title: 'First Assessment', description: 'Completed your first cognitive assessment', earned: !!result, icon: Award, color: 'text-blue-600' },
    { title: 'Profile Complete', description: 'Completed your health profile', earned: !!user?.profileCompleted, icon: UserCircle, color: 'text-green-600' },
    { title: 'Consistency Champion', description: '7 days of regular activity tracking', earned: false, icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Mindful Meditator', description: '30 days of meditation practice', earned: false, icon: Brain, color: 'text-pink-600' },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-25 via-purple-25 to-pink-25 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-2xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-3xl p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm"></div>
            <div className="absolute top-4 right-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
                <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <Sparkles className="h-8 w-8 mr-3 text-yellow-300" />
                <span className="text-yellow-300 font-semibold text-lg">Welcome back!</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Hello, {user?.name}! 🌟
              </h1>
              <p className="text-blue-100 text-xl leading-relaxed">
                {result 
                  ? 'Continue your cognitive health journey and track your amazing progress.'
                  : 'Ready to unlock the secrets of your cognitive health? Let\'s get started!'
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Profile Completion Alert */}
        {!user?.profileCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h2 className="text-2xl font-display font-bold mb-2 flex items-center">
                  <Target className="h-7 w-7 mr-3" />
                  Complete Your Health Profile
                </h2>
                <p className="text-orange-100 text-lg">
                  Unlock personalized insights by adding your medical history and personal details.
                </p>
              </div>
              <Link
                to="/profile"
                className="bg-white text-orange-600 px-8 py-4 rounded-2xl font-bold hover:bg-orange-50 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center"
              >
                <Zap className="h-5 w-5 mr-2" />
                Complete Now
              </Link>
            </div>
          </motion.div>
        )}

        {/* Quick Actions */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h2 className="text-3xl font-display font-bold mb-3 flex items-center">
                  <Brain className="h-8 w-8 mr-3" />
                  Start Your Health Journey
                </h2>
                <p className="text-blue-100 text-xl">
                  Take our revolutionary assessment combining AI and Ayurveda for personalized insights.
                </p>
              </div>
              <Link
                to="/assessment"
                className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-bold hover:bg-blue-50 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center text-xl"
              >
                <Sparkles className="h-6 w-6 mr-3" />
                Begin Assessment
              </Link>
            </div>
          </motion.div>
        )}

        {/* Doctor Recommendation Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 text-white rounded-2xl p-8 mb-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-display font-bold mb-3 flex items-center">
                <Hospital className="h-8 w-8 mr-3" />
                Find Your Perfect Doctor
              </h2>
              <p className="text-purple-100 text-xl">
                Connect with healthcare professionals tailored to your needs.
              </p>
            </div>
            <Link
              to="/doctors"
              className="bg-white text-purple-600 px-10 py-5 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center text-xl"
            >
              <Star className="h-6 w-6 mr-3" />
              Explore Doctors
            </Link>
          </div>
        </motion.div>

        {/* High Risk Alert */}
        {result?.alzheimerRisk === 'High' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <Activity className="h-7 w-7 mr-3" />
                  Medical Consultation Recommended
                </h3>
                <p className="text-red-100 text-lg">
                  Your assessment indicates elevated risk factors. Consider consulting with a healthcare professional.
                </p>
              </div>
              <Link
                to="/hospitals"
                className="bg-white text-red-600 px-8 py-4 rounded-2xl font-bold hover:bg-red-50 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center"
              >
                <Hospital className="h-5 w-5 mr-2" />
                Find Hospitals
              </Link>
            </div>
          </motion.div>
        )}

        {/* Doctor Recommendation */} 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl p-6 mb-8 shadow-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2 flex items-center">
                <Users className="h-7 w-7 mr-3" />
                Find Your Perfect Doctor
              </h3>
              <p className="text-purple-100 text-lg">
                Explore a curated list of healthcare professionals and find the right one for you.
              </p>
            </div>
            <Link
              to="/doctors"
              className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:bg-purple-50 transition-all duration-300 shadow-lg transform hover:scale-105 flex items-center"
            >
              <Star className="h-5 w-5 mr-2" />
              Find Doctors
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="group relative"
            >
              <div className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:scale-105 border border-white/50 backdrop-blur-sm`}>
                <div className="flex items-center justify-between mb-4">
                  <div className={`bg-gradient-to-br ${stat.gradient} p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <Star className="h-5 w-5 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-gray-700 text-sm font-medium mb-2">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Progress Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-white/50"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900 flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-blue-600" />
                Cognitive Health Progress
              </h2>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-600 rounded-full mr-2"></div>
                  <span className="text-gray-600 font-medium">Cognitive Score</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                  <span className="text-gray-600 font-medium">Risk Score</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" />
                  <YAxis domain={[0, 5]} stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Line type="monotone" dataKey="cognitiveScore" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }} />
                  <Line type="monotone" dataKey="riskScore" stroke="#EF4444" strokeWidth={3} dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-white/50"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
              <Clock className="h-6 w-6 mr-3 text-purple-600" />
              Recent Activity
            </h2>
            <div className="space-y-4">
              {result && (
                <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg mr-3">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Assessment Completed</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              )}
              {user?.profileCompleted && (
                <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg mr-3">
                    <UserCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Profile Completed</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
              )}
              <div className="flex items-center p-4 bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl border border-orange-100">
                <div className="bg-gradient-to-r from-orange-500 to-pink-600 p-2 rounded-lg mr-3">
                  <Leaf className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Account Created</p>
                  <p className="text-xs text-gray-500">3 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-white/50"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
              <Activity className="h-6 w-6 mr-3 text-green-600" />
              Weekly Wellness Activities
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="day" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                      border: 'none', 
                      borderRadius: '12px', 
                      boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' 
                    }} 
                  />
                  <Area type="monotone" dataKey="meditation" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="exercise" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.6} />
                  <Area type="monotone" dataKey="sleep" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Meditation (min)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Exercise (min)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-sm text-gray-600 font-medium">Sleep (hours)</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-soft p-6 border border-white/50"
          >
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-3 text-yellow-600" />
              Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className={`flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  achievement.earned 
                    ? 'border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm' 
                    : 'border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100'
                }`}>
                  <div className={`p-3 rounded-xl mr-4 ${
                    achievement.earned 
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    <achievement.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-bold ${
                      achievement.earned ? 'text-green-900' : 'text-gray-700'
                    }`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-green-700' : 'text-gray-500'
                    }`}>
                      {achievement.description}
                    </p>
                  </div>
                  {achievement.earned && (
                    <div className="text-green-600">
                      <Star className="h-6 w-6 fill-current" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-8 mt-8 border border-white/50 backdrop-blur-sm"
        >
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
            <Sparkles className="h-8 w-8 mr-3 text-purple-600" />
            Continue Your Wellness Journey
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {!user?.profileCompleted && (
              <Link
                to="/profile"
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-center group transform hover:scale-105 border border-orange-100"
              >
                <div className="bg-gradient-to-r from-orange-500 to-red-600 p-4 rounded-2xl mx-auto mb-4 w-fit group-hover:scale-110 transition-transform shadow-lg">
                  <UserCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">Complete Profile</h3>
                <p className="text-sm text-gray-600">Add your health information</p>
              </Link>
            )}
            <Link
              to="/assessment"
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-center group transform hover:scale-105 border border-blue-100"
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-2xl mx-auto mb-4 w-fit group-hover:scale-110 transition-transform shadow-lg">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">
                {result ? 'Retake Assessment' : 'Take Assessment'}
              </h3>
              <p className="text-sm text-gray-600">
                {result ? 'Update your cognitive health profile' : 'Start your health evaluation'}
              </p>
            </Link>
            {result && (
              <Link
                to="/recommendations"
                className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-center group transform hover:scale-105 border border-green-100"
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-600 p-4 rounded-2xl mx-auto mb-4 w-fit group-hover:scale-110 transition-transform shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">View Recommendations</h3>
                <p className="text-sm text-gray-600">Get personalized wellness guidance</p>
              </Link>
            )}
            <Link
              to="/hospitals"
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-soft hover:shadow-soft-lg transition-all duration-300 text-center group transform hover:scale-105 border border-red-100"
            >
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl mx-auto mb-4 w-fit group-hover:scale-110 transition-transform shadow-lg">
                <Hospital className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Find Hospitals</h3>
              <p className="text-sm text-gray-600">Locate nearby medical facilities</p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;