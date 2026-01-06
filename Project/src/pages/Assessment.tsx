import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Brain, Leaf, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { useAssessment, CognitiveData, AyurvedicData } from '../contexts/AssessmentContext';
import toast from 'react-hot-toast';

const Assessment: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [cognitiveAnswers, setCognitiveAnswers] = useState<Partial<CognitiveData>>({});
  const [ayurvedicAnswers, setAyurvedicAnswers] = useState<Partial<AyurvedicData>>({});
  const { setCognitiveData, setAyurvedicData, calculateResult } = useAssessment();
  const navigate = useNavigate();

  const cognitiveQuestions = [
    {
      id: 'memoryIssues',
      question: 'How often do you experience memory difficulties?',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    },
    {
      id: 'concentrationDifficulty',
      question: 'How difficult is it for you to concentrate on tasks?',
      options: [
        { value: 1, label: 'Very Easy' },
        { value: 2, label: 'Easy' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'Difficult' },
        { value: 5, label: 'Very Difficult' }
      ]
    },
    {
      id: 'languageProblems',
      question: 'Do you have trouble finding the right words when speaking?',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    },
    {
      id: 'orientationConfusion',
      question: 'How often do you feel confused about time, place, or people?',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    },
    {
      id: 'dailyActivityImpairment',
      question: 'How much do cognitive issues affect your daily activities?',
      options: [
        { value: 1, label: 'Not at all' },
        { value: 2, label: 'Slightly' },
        { value: 3, label: 'Moderately' },
        { value: 4, label: 'Considerably' },
        { value: 5, label: 'Severely' }
      ]
    },
    {
      id: 'sleepQuality',
      question: 'How would you rate your sleep quality?',
      options: [
        { value: 5, label: 'Excellent' },
        { value: 4, label: 'Good' },
        { value: 3, label: 'Fair' },
        { value: 2, label: 'Poor' },
        { value: 1, label: 'Very Poor' }
      ]
    },
    {
      id: 'stressLevel',
      question: 'What is your current stress level?',
      options: [
        { value: 1, label: 'Very Low' },
        { value: 2, label: 'Low' },
        { value: 3, label: 'Moderate' },
        { value: 4, label: 'High' },
        { value: 5, label: 'Very High' }
      ]
    },
    {
      id: 'physicalActivity',
      question: 'How physically active are you?',
      options: [
        { value: 5, label: 'Very Active' },
        { value: 4, label: 'Active' },
        { value: 3, label: 'Moderately Active' },
        { value: 2, label: 'Sedentary' },
        { value: 1, label: 'Very Sedentary' }
      ]
    },
    {
      id: 'socialEngagement',
      question: 'How socially engaged are you?',
      options: [
        { value: 5, label: 'Very Engaged' },
        { value: 4, label: 'Engaged' },
        { value: 3, label: 'Moderately Engaged' },
        { value: 2, label: 'Minimally Engaged' },
        { value: 1, label: 'Isolated' }
      ]
    },
    {
      id: 'moodChanges',
      question: 'How often do you experience mood changes or depression?',
      options: [
        { value: 1, label: 'Never' },
        { value: 2, label: 'Rarely' },
        { value: 3, label: 'Sometimes' },
        { value: 4, label: 'Often' },
        { value: 5, label: 'Always' }
      ]
    }
  ];

  const ayurvedicQuestions = [
    {
      id: 'bodyType',
      question: 'What best describes your body frame?',
      options: [
        { value: 'thin', label: 'Thin, lean build' },
        { value: 'medium', label: 'Medium, muscular build' },
        { value: 'heavy', label: 'Heavy, broad build' }
      ]
    },
    {
      id: 'skinType',
      question: 'How would you describe your skin?',
      options: [
        { value: 'dry', label: 'Dry, rough, cool' },
        { value: 'sensitive', label: 'Sensitive, warm, prone to rashes' },
        { value: 'oily', label: 'Oily, smooth, cool' }
      ]
    },
    {
      id: 'hairType',
      question: 'What best describes your hair?',
      options: [
        { value: 'fine', label: 'Fine, dry, brittle' },
        { value: 'straight', label: 'Straight, oily, premature graying' },
        { value: 'thick', label: 'Thick, wavy, lustrous' }
      ]
    },
    {
      id: 'appetite',
      question: 'How would you describe your appetite?',
      options: [
        { value: 'variable', label: 'Variable, irregular' },
        { value: 'strong', label: 'Strong, sharp, regular' },
        { value: 'low', label: 'Low, steady, can skip meals' }
      ]
    },
    {
      id: 'digestion',
      question: 'How is your digestion?',
      options: [
        { value: 'irregular', label: 'Irregular, gas, bloating' },
        { value: 'fast', label: 'Fast, strong, acidic' },
        { value: 'slow', label: 'Slow, heavy, steady' }
      ]
    },
    {
      id: 'sleepPattern',
      question: 'What is your typical sleep pattern?',
      options: [
        { value: 'light', label: 'Light, interrupted, restless' },
        { value: 'moderate', label: 'Moderate, dreams, hot' },
        { value: 'deep', label: 'Deep, long, heavy' }
      ]
    },
    {
      id: 'energyLevel',
      question: 'How would you describe your energy levels?',
      options: [
        { value: 'high', label: 'High bursts, then fatigue' },
        { value: 'moderate', label: 'Moderate, consistent' },
        { value: 'steady', label: 'Steady, enduring' }
      ]
    },
    {
      id: 'temperament',
      question: 'What best describes your temperament?',
      options: [
        { value: 'anxious', label: 'Anxious, worried, enthusiastic' },
        { value: 'intense', label: 'Intense, focused, irritable' },
        { value: 'calm', label: 'Calm, steady, patient' }
      ]
    },
    {
      id: 'stressResponse',
      question: 'How do you typically respond to stress?',
      options: [
        { value: 'worry', label: 'Worry, anxiety, fear' },
        { value: 'anger', label: 'Anger, irritation, frustration' },
        { value: 'withdraw', label: 'Withdraw, become inactive' }
      ]
    },
    {
      id: 'weatherPreference',
      question: 'What weather do you prefer?',
      options: [
        { value: 'warm', label: 'Warm, humid weather' },
        { value: 'cool', label: 'Cool, dry weather' },
        { value: 'dry', label: 'Dry, warm weather' }
      ]
    }
  ];

  const steps = [
    { title: 'Cognitive Assessment', icon: Brain, questions: cognitiveQuestions },
    { title: 'Ayurvedic Prakriti', icon: Leaf, questions: ayurvedicQuestions }
  ];

  const currentQuestions = steps[currentStep].questions;
  const currentAnswers = currentStep === 0 ? cognitiveAnswers : ayurvedicAnswers;

  const handleAnswer = (questionId: string, value: any) => {
    if (currentStep === 0) {
      setCognitiveAnswers({ ...cognitiveAnswers, [questionId]: value });
    } else {
      setAyurvedicAnswers({ ...ayurvedicAnswers, [questionId]: value });
    }
  };

  const isStepComplete = () => {
    return currentQuestions.every(q => currentAnswers[q.id as keyof typeof currentAnswers] !== undefined);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (Object.keys(cognitiveAnswers).length === cognitiveQuestions.length &&
        Object.keys(ayurvedicAnswers).length === ayurvedicQuestions.length) {
      
      const cogData = cognitiveAnswers as CognitiveData;
      const ayuData = ayurvedicAnswers as AyurvedicData;
      
      setCognitiveData(cogData);
      setAyurvedicData(ayuData);
      calculateResult(cogData, ayuData);
      
      toast.success('Assessment completed successfully!');
      navigate('/results');
    } else {
      toast.error('Please complete all questions before submitting.');
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  // Extract the current step's icon component
  const CurrentStepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Health Assessment
            </h1>
            <span className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-primary-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Header */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
        >
          <div className="flex items-center mb-6">
            <div className="bg-primary-600 p-3 rounded-lg mr-4">
              <CurrentStepIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-display font-bold text-gray-900">
                {steps[currentStep].title}
              </h2>
              <p className="text-gray-600">
                {currentStep === 0 
                  ? 'Answer questions about your cognitive function and lifestyle'
                  : 'Answer questions about your constitutional type and natural tendencies'
                }
              </p>
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-8">
            {currentQuestions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="border-b border-gray-200 pb-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  {index + 1}. {question.question}
                </h3>
                <div className="grid gap-3">
                  {question.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleAnswer(question.id, option.value)}
                      className={`p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                        currentAnswers[question.id as keyof typeof currentAnswers] === option.value
                          ? 'border-primary-600 bg-primary-50 text-primary-900'
                          : 'border-gray-200 bg-white hover:border-primary-300 hover:bg-primary-25'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option.label}</span>
                        {currentAnswers[question.id as keyof typeof currentAnswers] === option.value && (
                          <CheckCircle className="h-5 w-5 text-primary-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500 mb-1">
              Questions completed: {Object.keys(currentAnswers).length} / {currentQuestions.length}
            </div>
            <div className="text-xs text-gray-400">
              {isStepComplete() ? 'Ready to continue' : 'Complete all questions to proceed'}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === steps.length - 1 ? 'Complete Assessment' : 'Next'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;