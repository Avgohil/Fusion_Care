import React, { createContext, useContext, useState } from 'react';

export interface CognitiveData {
  memoryIssues: number;
  concentrationDifficulty: number;
  languageProblems: number;
  orientationConfusion: number;
  dailyActivityImpairment: number;
  sleepQuality: number;
  stressLevel: number;
  physicalActivity: number;
  socialEngagement: number;
  moodChanges: number;
}

export interface AyurvedicData {
  bodyType: string;
  skinType: string;
  hairType: string;
  appetite: string;
  digestion: string;
  sleepPattern: string;
  energyLevel: string;
  temperament: string;
  stressResponse: string;
  weatherPreference: string;
}

export interface AssessmentResult {
  alzheimerRisk: 'Low' | 'Medium' | 'High';
  riskScore: number;
  prakritiType: 'Vata' | 'Pitta' | 'Kapha' | 'Mixed';
  dominantDosha: string;
  cognitiveScore: number;
  ayurvedicScore: number;
  completedAt: Date;
}

interface AssessmentContextType {
  cognitiveData: CognitiveData | null;
  ayurvedicData: AyurvedicData | null;
  result: AssessmentResult | null;
  setCognitiveData: (data: CognitiveData) => void;
  setAyurvedicData: (data: AyurvedicData) => void;
  calculateResult: () => void;
  resetAssessment: () => void;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

export const AssessmentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cognitiveData, setCognitiveData] = useState<CognitiveData | null>(null);
  const [ayurvedicData, setAyurvedicData] = useState<AyurvedicData | null>(null);
  const [result, setResult] = useState<AssessmentResult | null>(null);

  const calculateResult = () => {
    if (!cognitiveData || !ayurvedicData) return;

    // Cognitive risk calculation
    const cognitiveScore = (
      cognitiveData.memoryIssues +
      cognitiveData.concentrationDifficulty +
      cognitiveData.languageProblems +
      cognitiveData.orientationConfusion +
      cognitiveData.dailyActivityImpairment +
      (5 - cognitiveData.sleepQuality) +
      cognitiveData.stressLevel +
      (5 - cognitiveData.physicalActivity) +
      (5 - cognitiveData.socialEngagement) +
      cognitiveData.moodChanges
    ) / 10;

    // Prakriti calculation
    const doshaScores = {
      vata: 0,
      pitta: 0,
      kapha: 0
    };

    // Simplified prakriti scoring based on responses
    const responses = [
      ayurvedicData.bodyType,
      ayurvedicData.skinType,
      ayurvedicData.hairType,
      ayurvedicData.appetite,
      ayurvedicData.digestion,
      ayurvedicData.sleepPattern,
      ayurvedicData.energyLevel,
      ayurvedicData.temperament,
      ayurvedicData.stressResponse,
      ayurvedicData.weatherPreference
    ];

    responses.forEach(response => {
      if (['thin', 'dry', 'fine', 'variable', 'irregular', 'light', 'high', 'anxious', 'worry', 'warm'].includes(response)) {
        doshaScores.vata++;
      } else if (['medium', 'sensitive', 'straight', 'strong', 'fast', 'moderate', 'moderate', 'intense', 'anger', 'cool'].includes(response)) {
        doshaScores.pitta++;
      } else if (['heavy', 'oily', 'thick', 'low', 'slow', 'deep', 'steady', 'calm', 'withdraw', 'dry'].includes(response)) {
        doshaScores.kapha++;
      }
    });

    const dominantDosha = Object.entries(doshaScores).reduce((a, b) => 
      doshaScores[a[0] as keyof typeof doshaScores] > doshaScores[b[0] as keyof typeof doshaScores] ? a : b
    )[0];

    let prakritiType: 'Vata' | 'Pitta' | 'Kapha' | 'Mixed';
    const maxScore = Math.max(...Object.values(doshaScores));
    const maxCount = Object.values(doshaScores).filter(score => score === maxScore).length;

    if (maxCount > 1) {
      prakritiType = 'Mixed';
    } else {
      prakritiType = dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1) as 'Vata' | 'Pitta' | 'Kapha';
    }

    // Risk calculation combining cognitive and constitutional factors
    let riskScore = cognitiveScore * 0.7; // Cognitive factors weight 70%
    
    // Ayurvedic constitutional factors affecting cognitive health
    if (prakritiType === 'Vata') {
      riskScore += 0.3; // Vata imbalance can increase cognitive risk
    } else if (prakritiType === 'Pitta') {
      riskScore += 0.15; // Moderate risk
    } else if (prakritiType === 'Kapha') {
      riskScore += 0.1; // Lower risk but consider stagnation
    }

    let alzheimerRisk: 'Low' | 'Medium' | 'High';
    if (riskScore < 2) {
      alzheimerRisk = 'Low';
    } else if (riskScore < 3.5) {
      alzheimerRisk = 'Medium';
    } else {
      alzheimerRisk = 'High';
    }

    const assessmentResult: AssessmentResult = {
      alzheimerRisk,
      riskScore: Math.min(riskScore, 5),
      prakritiType,
      dominantDosha: dominantDosha.charAt(0).toUpperCase() + dominantDosha.slice(1),
      cognitiveScore,
      ayurvedicScore: maxScore,
      completedAt: new Date()
    };

    setResult(assessmentResult);
  };

  const resetAssessment = () => {
    setCognitiveData(null);
    setAyurvedicData(null);
    setResult(null);
  };

  return (
    <AssessmentContext.Provider value={{
      cognitiveData,
      ayurvedicData,
      result,
      setCognitiveData,
      setAyurvedicData,
      calculateResult,
      resetAssessment
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};