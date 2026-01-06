import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, BarChart3, Download, Settings, Brain, Leaf, TrendingUp, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for admin dashboard
  const userStats = {
    totalUsers: 1247,
    activeUsers: 892,
    newUsers: 156,
    assessmentsCompleted: 2341
  };

  const riskDistribution = [
    { name: 'Low Risk', value: 65, color: '#10B981' },
    { name: 'Medium Risk', value: 25, color: '#F59E0B' },
    { name: 'High Risk', value: 10, color: '#EF4444' }
  ];

  const prakritiDistribution = [
    { name: 'Vata', value: 35, color: '#8B5CF6' },
    { name: 'Pitta', value: 30, color: '#F59E0B' },
    { name: 'Kapha', value: 25, color: '#10B981' },
    { name: 'Mixed', value: 10, color: '#6B7280' }
  ];

  const monthlyAssessments = [
    { month: 'Jan', assessments: 145, newUsers: 67 },
    { month: 'Feb', assessments: 178, newUsers: 89 },
    { month: 'Mar', assessments: 234, newUsers: 112 },
    { month: 'Apr', assessments: 287, newUsers: 134 },
    { month: 'May', assessments: 312, newUsers: 156 },
    { month: 'Jun', assessments: 298, newUsers: 143 }
  ];

  const demographicData = [
    { ageGroup: '18-25', count: 234, percentage: 18.8 },
    { ageGroup: '26-35', count: 456, percentage: 36.6 },
    { ageGroup: '36-45', count: 345, percentage: 27.7 },
    { ageGroup: '46-55', count: 156, percentage: 12.5 },
    { ageGroup: '56+', count: 56, percentage: 4.4 }
  ];

  const recentAssessments = [
    { id: 1, user: 'John Doe', email: 'john@example.com', date: '2024-01-15', risk: 'Low', prakriti: 'Vata' },
    { id: 2, user: 'Jane Smith', email: 'jane@example.com', date: '2024-01-15', risk: 'Medium', prakriti: 'Pitta' },
    { id: 3, user: 'Mike Johnson', email: 'mike@example.com', date: '2024-01-14', risk: 'Low', prakriti: 'Kapha' },
    { id: 4, user: 'Sarah Wilson', email: 'sarah@example.com', date: '2024-01-14', risk: 'High', prakriti: 'Mixed' },
    { id: 5, user: 'Tom Brown', email: 'tom@example.com', date: '2024-01-13', risk: 'Medium', prakriti: 'Vata' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'assessments', label: 'Assessments', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const exportData = (type: string) => {
    // Mock export functionality
    console.log(`Exporting ${type} data...`);
    alert(`${type} data exported successfully!`);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Monitor platform performance and user analytics
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+12% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Users</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.activeUsers.toLocaleString()}</p>
                  </div>
                  <Activity className="h-8 w-8 text-success-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+8% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Users</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.newUsers.toLocaleString()}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-accent-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+23% from last month</p>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Assessments</p>
                    <p className="text-2xl font-bold text-gray-900">{userStats.assessmentsCompleted.toLocaleString()}</p>
                  </div>
                  <Brain className="h-8 w-8 text-secondary-600" />
                </div>
                <p className="text-xs text-gray-500 mt-2">+18% from last month</p>
              </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Assessments</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyAssessments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="assessments" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="newUsers" stroke="#10B981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={riskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center space-x-4 mt-4">
                  {riskDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm text-gray-600">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">User Demographics</h3>
                  <button
                    onClick={() => exportData('users')}
                    className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </button>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={demographicData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="ageGroup" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prakriti Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={prakritiDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {prakritiDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-4">
                  {prakritiDistribution.map((entry, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-600">{entry.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Assessments Tab */}
        {activeTab === 'assessments' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Assessments</h3>
                <button
                  onClick={() => exportData('assessments')}
                  className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Risk Level
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prakriti Type
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentAssessments.map((assessment) => (
                      <tr key={assessment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{assessment.user}</div>
                            <div className="text-sm text-gray-500">{assessment.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {assessment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            assessment.risk === 'Low' ? 'bg-success-100 text-success-800' :
                            assessment.risk === 'Medium' ? 'bg-warning-100 text-warning-800' :
                            'bg-error-100 text-error-800'
                          }`}>
                            {assessment.risk}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <Leaf className="h-4 w-4 text-secondary-600 mr-2" />
                            <span className="text-sm text-gray-900">{assessment.prakriti}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Usage Trends</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyAssessments}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="assessments" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-primary-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Average Assessment Time</span>
                    <span className="text-lg font-bold text-primary-600">12.5 min</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Completion Rate</span>
                    <span className="text-lg font-bold text-secondary-600">87.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-accent-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">User Satisfaction</span>
                    <span className="text-lg font-bold text-accent-600">4.6/5</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-success-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Return Users</span>
                    <span className="text-lg font-bold text-success-600">64.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Settings</h3>
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Assessment Configuration</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Enable email notifications</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Require email verification</span>
                      <input type="checkbox" className="rounded" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">Allow anonymous assessments</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h4 className="text-md font-medium text-gray-900 mb-4">Data Management</h4>
                  <div className="space-y-4">
                    <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900">Export All Data</span>
                        <Download className="h-4 w-4 text-gray-500" />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Download complete dataset for analysis</p>
                    </button>
                    <button className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-red-900">Clear Old Data</span>
                        <Settings className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-xs text-red-500 mt-1">Remove data older than 2 years</p>
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="text-md font-medium text-gray-900 mb-4">System Information</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Version:</span>
                        <span className="ml-2 font-medium">v1.0.0</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Last Updated:</span>
                        <span className="ml-2 font-medium">Jan 15, 2024</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Database:</span>
                        <span className="ml-2 font-medium">Connected</span>
                      </div>
                      <div>
                        <span className="text-gray-500">API Status:</span>
                        <span className="ml-2 font-medium text-success-600">Healthy</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;