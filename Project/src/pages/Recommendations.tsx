import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Moon, Dumbbell, Heart, Leaf, Brain, Sun, Droplets } from 'lucide-react';
import { useAssessment } from '../contexts/AssessmentContext';

const Recommendations: React.FC = () => {
  const { result } = useAssessment();

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No Results Available</h2>
          <p className="text-gray-600">Please complete the assessment first to get personalized recommendations.</p>
        </div>
      </div>
    );
  }

  const getDietaryRecommendations = () => {
    const base = [
      'Include omega-3 rich foods (fish, walnuts, flaxseeds)',
      'Consume antioxidant-rich berries and dark leafy greens',
      'Stay hydrated with 8-10 glasses of water daily',
      'Limit processed foods and refined sugars'
    ];

    switch (result.prakritiType) {
      case 'Vata':
        return [
          ...base,
          'Favor warm, cooked, and oily foods',
          'Include sweet, sour, and salty tastes',
          'Eat at regular intervals to maintain stability',
          'Include ghee, nuts, and warm spices like ginger'
        ];
      case 'Pitta':
        return [
          ...base,
          'Favor cool, fresh, and less spicy foods',
          'Include sweet, bitter, and astringent tastes',
          'Avoid hot, spicy, and acidic foods',
          'Include cooling foods like cucumber, coconut, and mint'
        ];
      case 'Kapha':
        return [
          ...base,
          'Favor light, warm, and spicy foods',
          'Include pungent, bitter, and astringent tastes',
          'Avoid heavy, oily, and cold foods',
          'Include warming spices like turmeric, black pepper, and ginger'
        ];
      default:
        return [
          ...base,
          'Maintain a balanced diet with all six tastes',
          'Adjust according to seasons and your body\'s needs',
          'Focus on fresh, whole foods'
        ];
    }
  };

  const getLifestyleRecommendations = () => {
    const base = [
      'Maintain a consistent sleep schedule (7-9 hours)',
      'Engage in regular physical activity (30 min daily)',
      'Practice stress management techniques',
      'Stay socially connected with friends and family'
    ];

    switch (result.prakritiType) {
      case 'Vata':
        return [
          ...base,
          'Establish regular daily routines',
          'Practice calming activities like yoga and meditation',
          'Avoid excessive travel and overstimulation',
          'Keep warm and avoid cold, windy environments'
        ];
      case 'Pitta':
        return [
          ...base,
          'Avoid excessive heat and sun exposure',
          'Practice cooling activities like swimming',
          'Manage competitive tendencies and perfectionism',
          'Take breaks to prevent burnout'
        ];
      case 'Kapha':
        return [
          ...base,
          'Engage in vigorous and stimulating activities',
          'Wake up early and avoid daytime naps',
          'Vary your routine to prevent stagnation',
          'Seek energizing and motivating environments'
        ];
      default:
        return [
          ...base,
          'Adapt lifestyle practices to your current needs',
          'Listen to your body and adjust accordingly',
          'Maintain balance in all activities'
        ];
    }
  };

  const getExerciseRecommendations = () => {
    const base = [
      'Aim for 150 minutes of moderate aerobic activity weekly',
      'Include strength training 2-3 times per week',
      'Practice balance and coordination exercises',
      'Include flexibility and stretching routines'
    ];

    switch (result.prakritiType) {
      case 'Vata':
        return [
          ...base,
          'Prefer gentle, grounding exercises like yoga and walking',
          'Avoid excessive or irregular exercise',
          'Focus on consistency rather than intensity',
          'Include restorative practices'
        ];
      case 'Pitta':
        return [
          ...base,
          'Enjoy moderate, competitive activities',
          'Avoid exercising in hot weather',
          'Include swimming and water-based activities',
          'Practice moderation to avoid overexertion'
        ];
      case 'Kapha':
        return [
          ...base,
          'Engage in vigorous, energizing exercises',
          'Include cardio and high-intensity activities',
          'Vary your routine to maintain interest',
          'Exercise in the morning for best results'
        ];
      default:
        return [
          ...base,
          'Choose activities you enjoy for consistency',
          'Adjust intensity based on your energy levels',
          'Include both aerobic and anaerobic exercises'
        ];
    }
  };

  const getMentalWellnessRecommendations = () => {
    const base = [
      'Practice mindfulness meditation (10-20 minutes daily)',
      'Engage in cognitive stimulating activities',
      'Maintain social connections and community involvement',
      'Seek professional support when needed'
    ];

    if (result.alzheimerRisk === 'High') {
      return [
        ...base,
        'Consider cognitive training programs',
        'Engage in complex mental activities like puzzles and learning',
        'Monitor cognitive changes and discuss with healthcare providers',
        'Join support groups for cognitive health'
      ];
    } else if (result.alzheimerRisk === 'Medium') {
      return [
        ...base,
        'Increase cognitive challenges and new learning',
        'Practice memory exercises and brain games',
        'Consider preventive interventions',
        'Monitor lifestyle factors affecting cognition'
      ];
    } else {
      return [
        ...base,
        'Continue current healthy mental practices',
        'Engage in lifelong learning',
        'Maintain challenging hobbies and interests',
        'Practice stress reduction techniques'
      ];
    }
  };

  const recommendations = [
    {
      title: 'Dietary Recommendations',
      icon: Utensils,
      color: 'bg-green-500',
      items: getDietaryRecommendations()
    },
    {
      title: 'Lifestyle Modifications',
      icon: Sun,
      color: 'bg-yellow-500',
      items: getLifestyleRecommendations()
    },
    {
      title: 'Exercise & Movement',
      icon: Dumbbell,
      color: 'bg-blue-500',
      items: getExerciseRecommendations()
    },
    {
      title: 'Mental Wellness',
      icon: Brain,
      color: 'bg-purple-500',
      items: getMentalWellnessRecommendations()
    },
    {
      title: 'Sleep Optimization',
      icon: Moon,
      color: 'bg-indigo-500',
      items: [
        'Maintain consistent sleep-wake cycles',
        'Create a calming bedtime routine',
        'Optimize sleep environment (cool, dark, quiet)',
        'Limit screen time before bed',
        'Avoid caffeine and alcohol close to bedtime',
        'Consider natural sleep aids like chamomile or valerian'
      ]
    },
    {
      title: 'Stress Management',
      icon: Heart,
      color: 'bg-red-500',
      items: [
        'Practice deep breathing exercises',
        'Engage in regular meditation or mindfulness',
        'Use time management techniques',
        'Maintain work-life balance',
        'Connect with nature regularly',
        'Consider therapy or counseling if needed'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
            Personalized Recommendations
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Based on your {result.prakritiType} constitution and {result.alzheimerRisk.toLowerCase()} cognitive risk profile
          </p>
          <div className="inline-flex items-center bg-primary-50 px-6 py-3 rounded-full border border-primary-200">
            <Leaf className="h-5 w-5 text-primary-600 mr-2" />
            <span className="text-primary-900 font-semibold">
              Integrative Ayurvedic & Modern Approach
            </span>
          </div>
        </motion.div>

        {/* Risk-specific Alert */}
        {result.alzheimerRisk === 'High' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg"
          >
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-lg font-medium text-red-800">
                  Important Health Notice
                </h3>
                <p className="text-red-700 mt-2">
                  Your assessment indicates elevated risk factors. We strongly recommend consulting with a healthcare professional 
                  for comprehensive evaluation and personalized medical advice. These recommendations complement but do not replace professional medical care.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Recommendations Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {recommendations.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className={`${category.color} p-3 rounded-lg mr-4`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-gray-900">
                    {category.title}
                  </h2>
                </div>
                
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary-600 rounded-full mt-2 mr-3"></div>
                      <p className="text-gray-700 leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Implementation Tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-secondary-600 to-primary-600 text-white rounded-xl p-8 mt-12"
        >
          <div className="text-center">
            <Droplets className="h-12 w-12 mx-auto mb-4 text-secondary-200" />
            <h3 className="text-2xl font-display font-bold mb-4">
              Implementation Strategy
            </h3>
            <p className="text-lg mb-6 text-secondary-100">
              Start with small, manageable changes and gradually build healthy habits. 
              Focus on consistency rather than perfection.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">Week 1-2</h4>
                <p className="text-sm text-secondary-200">
                  Focus on sleep schedule and basic dietary changes
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">Week 3-4</h4>
                <p className="text-sm text-secondary-200">
                  Add exercise routine and stress management practices
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h4 className="font-bold text-lg mb-2">Month 2+</h4>
                <p className="text-sm text-secondary-200">
                  Integrate all recommendations and track progress
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-gray-50 rounded-lg p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Disclaimer</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            These recommendations are based on your assessment results and traditional Ayurvedic principles combined with modern health science. 
            They are for educational purposes only and should not replace professional medical advice, diagnosis, or treatment. 
            Always consult with qualified healthcare providers before making significant changes to your health regimen, 
            especially if you have existing health conditions or concerns.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Recommendations;