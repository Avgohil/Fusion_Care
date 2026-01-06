import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Leaf, AlertTriangle, CheckCircle, Info, ArrowRight, Guitar as Hospital, Stethoscope } from 'lucide-react';
import { useAssessment } from '../contexts/AssessmentContext';
import { useAuth } from '../contexts/AuthContext';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Results: React.FC = () => {
  const { result } = useAssessment();
  const { user } = useAuth();

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Assessment Results</h2>
          <p className="text-gray-600 mb-6">Please complete the assessment first to see your results.</p>
          <Link
            to="/assessment"
            className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Take Assessment
          </Link>
        </div>
      </div>
    );
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-success-600 bg-success-50 border-success-200';
      case 'Medium': return 'text-warning-600 bg-warning-50 border-warning-200';
      case 'High': return 'text-error-600 bg-error-50 border-error-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'Low': return CheckCircle;
      case 'Medium': return Info;
      case 'High': return AlertTriangle;
      default: return Info;
    }
  };

  const prakritiData = [
    { name: 'Vata', value: result.prakritiType === 'Vata' ? 60 : result.prakritiType === 'Mixed' ? 35 : 20, color: '#8B5CF6' },
    { name: 'Pitta', value: result.prakritiType === 'Pitta' ? 60 : result.prakritiType === 'Mixed' ? 35 : 25, color: '#F59E0B' },
    { name: 'Kapha', value: result.prakritiType === 'Kapha' ? 60 : result.prakritiType === 'Mixed' ? 30 : 20, color: '#10B981' },
  ];

  const scoreData = [
    { name: 'Cognitive Score', value: result.cognitiveScore, color: '#3B82F6' },
    { name: 'Risk Score', value: result.riskScore, color: '#EF4444' },
  ];

  const RiskIcon = getRiskIcon(result.alzheimerRisk);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
            <Brain className="h-16 w-16 mx-auto mb-4 text-blue-100" />
            <h1 className="text-4xl font-display font-bold mb-4">
              Your Assessment Results
            </h1>
            <p className="text-xl text-blue-100">
              Completed on {result.completedAt.toLocaleDateString()}
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Alzheimer's Risk Assessment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-primary-600 p-3 rounded-lg mr-4">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Cognitive Risk Assessment
              </h2>
            </div>

            <div className={`p-6 rounded-xl border-2 ${getRiskColor(result.alzheimerRisk)} mb-6`}>
              <div className="flex items-center mb-4">
                <RiskIcon className="h-8 w-8 mr-3" />
                <div>
                  <h3 className="text-2xl font-bold">
                    {result.alzheimerRisk} Risk
                  </h3>
                  <p className="text-sm opacity-75">
                    Risk Score: {result.riskScore.toFixed(1)}/5.0
                  </p>
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                <div
                  className={`h-3 rounded-full ${
                    result.alzheimerRisk === 'Low' ? 'bg-success-500' :
                    result.alzheimerRisk === 'Medium' ? 'bg-warning-500' : 'bg-error-500'
                  }`}
                  style={{ width: `${(result.riskScore / 5) * 100}%` }}
                />
              </div>
              
              <p className="text-sm">
                {result.alzheimerRisk === 'Low' && 'Your cognitive assessment indicates a low risk for Alzheimer\'s disease. Continue maintaining healthy lifestyle habits.'}
                {result.alzheimerRisk === 'Medium' && 'Your assessment shows moderate risk factors. Consider lifestyle modifications and regular monitoring.'}
                {result.alzheimerRisk === 'High' && 'Your assessment indicates elevated risk factors. We recommend consulting with a healthcare professional for further evaluation.'}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Cognitive Score Breakdown</h4>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>

          {/* Ayurvedic Prakriti Assessment */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <div className="flex items-center mb-6">
              <div className="bg-secondary-600 p-3 rounded-lg mr-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Ayurvedic Prakriti Type
              </h2>
            </div>

            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-secondary-50 px-6 py-3 rounded-full border-2 border-secondary-200">
                <Leaf className="h-6 w-6 text-secondary-600 mr-2" />
                <span className="text-2xl font-bold text-secondary-900">
                  {result.prakritiType}
                </span>
                {result.prakritiType !== 'Mixed' && (
                  <span className="text-sm text-secondary-600 ml-2">
                    ({result.dominantDosha} Dominant)
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-4 text-center">Dosha Distribution</h4>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={prakritiData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {prakritiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                {prakritiData.map((entry, index) => (
                  <div key={index} className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span className="text-sm text-gray-600">{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Constitutional Insights</h4>
              <p className="text-sm text-gray-600">
                {result.prakritiType === 'Vata' && 'Vata types are typically creative, energetic, and quick-thinking but may be prone to anxiety and irregular patterns. Focus on grounding practices and regular routines.'}
                {result.prakritiType === 'Pitta' && 'Pitta types are often organized, focused, and goal-oriented but may experience stress and inflammation. Emphasize cooling practices and stress management.'}
                {result.prakritiType === 'Kapha' && 'Kapha types are usually stable, compassionate, and steady but may tend toward stagnation. Benefit from stimulating activities and movement.'}
                {result.prakritiType === 'Mixed' && 'Mixed constitution indicates a balanced blend of doshas. Your recommendations will be tailored to address the dominant characteristics and imbalances.'}
              </p>
            </div>
          </motion.div>
        </div>

        {/* High Risk Alert with Hospital Finder */}
        {result.alzheimerRisk === 'High' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg"
          >
            <div className="flex items-start">
              <AlertTriangle className="h-6 w-6 text-red-600 mr-3 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-red-800 mb-2">
                  Immediate Medical Consultation Recommended
                </h3>
                <p className="text-red-700 mb-4">
                  Your assessment indicates elevated risk factors that require professional medical evaluation. 
                  We strongly recommend consulting with a neurologist or healthcare professional as soon as possible.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/hospitals"
                    className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <Hospital className="h-4 w-4 mr-2" />
                    Find Nearby Hospitals
                  </Link>
                  <a
                    href="tel:911"
                    className="bg-red-800 text-white px-6 py-3 rounded-lg hover:bg-red-900 transition-colors font-medium flex items-center justify-center"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Emergency: Call 911
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl p-8 mb-8"
        >
          <div className="text-center">
            <h3 className="text-2xl font-display font-bold mb-4">
              Integrated Health Profile
            </h3>
            <p className="text-lg mb-6 text-primary-100">
              Your {result.prakritiType} constitution combined with your {result.alzheimerRisk.toLowerCase()} cognitive risk profile 
              creates a unique foundation for personalized health recommendations.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{result.prakritiType}</div>
                <div className="text-sm text-primary-200">Prakriti Type</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{result.alzheimerRisk}</div>
                <div className="text-sm text-primary-200">Risk Level</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{result.riskScore.toFixed(1)}</div>
                <div className="text-sm text-primary-200">Overall Score</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/recommendations"
            className="bg-gradient-to-r from-accent-600 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-accent-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group shadow-lg"
          >
            View Personalized Recommendations
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          {result.alzheimerRisk === 'High' && (
            <Link
              to="/hospitals"
              className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center group shadow-lg"
            >
              <Hospital className="mr-2 h-5 w-5" />
              Find Medical Care
            </Link>
          )}
          <Link
            to="/dashboard"
            className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-600 hover:bg-primary-50 transition-all duration-300 flex items-center justify-center shadow-lg"
          >
            Go to Dashboard
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;