import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MedicalHistory {
  id: string;
  condition: string;
  diagnosedDate: string;
  medications: string[];
  notes: string;
  reportFiles?: File[];
}

export interface UserProfile {
  age: number;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  bloodType: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | 'unknown';
  height: number; // in cm
  weight: number; // in kg
  occupation: string;
  education: string;
  maritalStatus: 'single' | 'married' | 'divorced' | 'widowed' | 'other';
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalHistory: MedicalHistory[];
  familyHistory: {
    alzheimers: boolean;
    dementia: boolean;
    parkinsons: boolean;
    stroke: boolean;
    diabetes: boolean;
    hypertension: boolean;
    heartDisease: boolean;
    other: string[];
  };
  currentMedications: string[];
  allergies: string[];
  smokingStatus: 'never' | 'former' | 'current';
  alcoholConsumption: 'never' | 'occasional' | 'moderate' | 'heavy';
  exerciseFrequency: 'never' | 'rarely' | 'weekly' | 'daily';
  hasSpectacles?: boolean;
  leftEyePower?: number;
  rightEyePower?: number;
}

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
  profile?: UserProfile;
  profileCompleted?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('care-catalyst-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in production, use Firebase Auth
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      isAdmin: email === 'admin@carecatalyst.com',
      profileCompleted: false
    };
    
    setUser(mockUser);
    localStorage.setItem('care-catalyst-user', JSON.stringify(mockUser));
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      isAdmin: false,
      profileCompleted: false
    };
    
    setUser(mockUser);
    localStorage.setItem('care-catalyst-user', JSON.stringify(mockUser));
  };

  const updateProfile = async (profileData: Partial<UserProfile>) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData } as UserProfile,
      profileCompleted: true
    };
    
    setUser(updatedUser);
    localStorage.setItem('care-catalyst-user', JSON.stringify(updatedUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('care-catalyst-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};