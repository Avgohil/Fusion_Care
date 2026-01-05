import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Heart, 
  FileText, 
  Upload, 
  Plus, 
  X, 
  Save,
  Calendar,
  Phone,
  Briefcase,
  GraduationCap,
  Users,
  Pill,
  AlertTriangle,
  Cigarette,
  Wine,
  Activity
} from 'lucide-react';
import { useAuth, UserProfile, MedicalHistory } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState<Partial<UserProfile>>({
    age: user?.profile?.age || 0,
    gender: user?.profile?.gender || 'prefer-not-to-say',
    bloodType: user?.profile?.bloodType || 'unknown',
    height: user?.profile?.height || 0,
    weight: user?.profile?.weight || 0,
    occupation: user?.profile?.occupation || '',
    education: user?.profile?.education || '',
    maritalStatus: user?.profile?.maritalStatus || 'single',
    emergencyContact: user?.profile?.emergencyContact || {
      name: '',
      relationship: '',
      phone: ''
    },
    medicalHistory: user?.profile?.medicalHistory || [],
    familyHistory: user?.profile?.familyHistory || {
      alzheimers: false,
      dementia: false,
      parkinsons: false,
      stroke: false,
      diabetes: false,
      hypertension: false,
      heartDisease: false,
      other: []
    },
    currentMedications: user?.profile?.currentMedications || [],
    allergies: user?.profile?.allergies || [],
    smokingStatus: user?.profile?.smokingStatus || 'never',
    alcoholConsumption: user?.profile?.alcoholConsumption || 'never',
    exerciseFrequency: user?.profile?.exerciseFrequency || 'never',
    hasSpectacles: user?.profile?.hasSpectacles || false,
    leftEyePower: user?.profile?.leftEyePower || 0,
    rightEyePower: user?.profile?.rightEyePower || 0
  });

  const [newMedicalCondition, setNewMedicalCondition] = useState<Partial<MedicalHistory>>({
    condition: '',
    diagnosedDate: '',
    medications: [],
    notes: ''
  });

  const [newMedication, setNewMedication] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [newFamilyCondition, setNewFamilyCondition] = useState('');

  const handleInputChange = (field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setProfileData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof UserProfile],
        [field]: value
      }
    }));
  };

  const addMedicalCondition = () => {
    if (!newMedicalCondition.condition) return;
    
    const condition: MedicalHistory = {
      id: Date.now().toString(),
      condition: newMedicalCondition.condition,
      diagnosedDate: newMedicalCondition.diagnosedDate || '',
      medications: newMedicalCondition.medications || [],
      notes: newMedicalCondition.notes || ''
    };

    setProfileData(prev => ({
      ...prev,
      medicalHistory: [...(prev.medicalHistory || []), condition]
    }));

    setNewMedicalCondition({
      condition: '',
      diagnosedDate: '',
      medications: [],
      notes: ''
    });
  };

  const removeMedicalCondition = (id: string) => {
    setProfileData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory?.filter(item => item.id !== id) || []
    }));
  };

  const addMedication = () => {
    if (!newMedication.trim()) return;
    
    setProfileData(prev => ({
      ...prev,
      currentMedications: [...(prev.currentMedications || []), newMedication.trim()]
    }));
    setNewMedication('');
  };

  const removeMedication = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      currentMedications: prev.currentMedications?.filter((_, i) => i !== index) || []
    }));
  };

  const addAllergy = () => {
    if (!newAllergy.trim()) return;
    
    setProfileData(prev => ({
      ...prev,
      allergies: [...(prev.allergies || []), newAllergy.trim()]
    }));
    setNewAllergy('');
  };

  const removeAllergy = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      allergies: prev.allergies?.filter((_, i) => i !== index) || []
    }));
  };

  const addFamilyCondition = () => {
    if (!newFamilyCondition.trim()) return;
    
    setProfileData(prev => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory!,
        other: [...(prev.familyHistory?.other || []), newFamilyCondition.trim()]
      }
    }));
    setNewFamilyCondition('');
  };

  const removeFamilyCondition = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      familyHistory: {
        ...prev.familyHistory!,
        other: prev.familyHistory?.other?.filter((_, i) => i !== index) || []
      }
    }));
  };

  const handleFileUpload = (conditionId: string, files: FileList | null) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setProfileData(prev => ({
      ...prev,
      medicalHistory: prev.medicalHistory?.map(condition => 
        condition.id === conditionId 
          ? { ...condition, reportFiles: [...(condition.reportFiles || []), ...fileArray] }
          : condition
      ) || []
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await updateProfile(profileData);
      toast.success('Profile updated successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical History', icon: Heart },
    { id: 'family', label: 'Family History', icon: Users },
    { id: 'lifestyle', label: 'Lifestyle', icon: Activity }
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl">
            <User className="h-16 w-16 mx-auto mb-4 text-blue-100" />
            <h1 className="text-3xl font-display font-bold mb-2">Complete Your Profile</h1>
            <p className="text-blue-100 text-lg">
              Help us provide personalized health recommendations
            </p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 bg-white rounded-t-xl shadow-sm">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
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

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-b-xl shadow-lg p-8"
        >
          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="h-6 w-6 mr-2 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Age
                  </label>
                  <input
                    type="number"
                    value={profileData.age}
                    onChange={(e) => handleInputChange('age', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your age"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={profileData.gender}
                    onChange={(e) => handleInputChange('gender', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Blood Type</label>
                  <select
                    value={profileData.bloodType}
                    onChange={(e) => handleInputChange('bloodType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="unknown">Unknown</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                  <input
                    type="number"
                    value={profileData.height}
                    onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter height in cm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={profileData.weight}
                    onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter weight in kg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Occupation
                  </label>
                  <input
                    type="text"
                    value={profileData.occupation}
                    onChange={(e) => handleInputChange('occupation', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your occupation"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <GraduationCap className="h-4 w-4 inline mr-1" />
                    Education
                  </label>
                  <input
                    type="text"
                    value={profileData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Highest education level"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Marital Status</label>
                  <select
                    value={profileData.maritalStatus}
                    onChange={(e) => handleInputChange('maritalStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-red-600" />
                  Emergency Contact
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={profileData.emergencyContact?.name}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'name', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contact name"
                  />
                  <input
                    type="text"
                    value={profileData.emergencyContact?.relationship}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'relationship', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Relationship"
                  />
                  <input
                    type="tel"
                    value={profileData.emergencyContact?.phone}
                    onChange={(e) => handleNestedInputChange('emergencyContact', 'phone', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Phone number"
                  />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-4 mt-6">Spectacles Information</h3>
              <div className="flex items-center mb-4">
                <input
                  id="hasSpectacles"
                  name="hasSpectacles"
                  type="checkbox"
                  checked={profileData.hasSpectacles}
                  onChange={(e) => handleInputChange('hasSpectacles', e.target.checked)}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="hasSpectacles" className="ml-2 block text-sm font-medium text-gray-700">Do you wear spectacles?</label>
              </div>

              {profileData.hasSpectacles && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="leftEyePower" className="block text-sm font-medium text-gray-700">Left Eye Power</label>
                    <input
                      type="number"
                      id="leftEyePower"
                      name="leftEyePower"
                      value={profileData.leftEyePower}
                      onChange={(e) => handleInputChange('leftEyePower', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      step="0.25"
                    />
                  </div>
                  <div>
                    <label htmlFor="rightEyePower" className="block text-sm font-medium text-gray-700">Right Eye Power</label>
                    <input
                      type="number"
                      id="rightEyePower"
                      name="rightEyePower"
                      value={profileData.rightEyePower}
                      onChange={(e) => handleInputChange('rightEyePower', parseFloat(e.target.value))}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      step="0.25"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Medical History Tab */}
          {activeTab === 'medical' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="h-6 w-6 mr-2 text-red-600" />
                Medical History
              </h2>

              {/* Current Medications */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Pill className="h-5 w-5 mr-2 text-blue-600" />
                  Current Medications
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newMedication}
                    onChange={(e) => setNewMedication(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add medication"
                  />
                  <button
                    onClick={addMedication}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.currentMedications?.map((medication, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {medication}
                      <button
                        onClick={() => removeMedication(index)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div className="bg-yellow-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Allergies
                </h3>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={newAllergy}
                    onChange={(e) => setNewAllergy(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    placeholder="Add allergy"
                  />
                  <button
                    onClick={addAllergy}
                    className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profileData.allergies?.map((allergy, index) => (
                    <span
                      key={index}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      {allergy}
                      <button
                        onClick={() => removeAllergy(index)}
                        className="ml-2 text-yellow-600 hover:text-yellow-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Medical Conditions */}
              <div className="bg-red-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-red-600" />
                  Medical Conditions
                </h3>
                
                {/* Add New Condition */}
                <div className="grid md:grid-cols-2 gap-4 mb-4 p-4 border border-red-200 rounded-lg">
                  <input
                    type="text"
                    value={newMedicalCondition.condition}
                    onChange={(e) => setNewMedicalCondition(prev => ({ ...prev, condition: e.target.value }))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Condition name"
                  />
                  <input
                    type="date"
                    value={newMedicalCondition.diagnosedDate}
                    onChange={(e) => setNewMedicalCondition(prev => ({ ...prev, diagnosedDate: e.target.value }))}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <textarea
                    value={newMedicalCondition.notes}
                    onChange={(e) => setNewMedicalCondition(prev => ({ ...prev, notes: e.target.value }))}
                    className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Additional notes"
                    rows={2}
                  />
                  <button
                    onClick={addMedicalCondition}
                    className="md:col-span-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Condition
                  </button>
                </div>

                {/* Existing Conditions */}
                <div className="space-y-4">
                  {profileData.medicalHistory?.map((condition) => (
                    <div key={condition.id} className="bg-white p-4 rounded-lg border border-red-200">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{condition.condition}</h4>
                        <button
                          onClick={() => removeMedicalCondition(condition.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      {condition.diagnosedDate && (
                        <p className="text-sm text-gray-600 mb-2">
                          Diagnosed: {new Date(condition.diagnosedDate).toLocaleDateString()}
                        </p>
                      )}
                      {condition.notes && (
                        <p className="text-sm text-gray-600 mb-2">{condition.notes}</p>
                      )}
                      
                      {/* File Upload */}
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Upload className="h-4 w-4 inline mr-1" />
                          Upload Medical Reports
                        </label>
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={(e) => handleFileUpload(condition.id, e.target.files)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        {condition.reportFiles && condition.reportFiles.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-gray-600">
                              {condition.reportFiles.length} file(s) uploaded
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Family History Tab */}
          {activeTab === 'family' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="h-6 w-6 mr-2 text-purple-600" />
                Family Medical History
              </h2>

              <div className="bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Common Conditions in Family
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { key: 'alzheimers', label: "Alzheimer's Disease" },
                    { key: 'dementia', label: 'Dementia' },
                    { key: 'parkinsons', label: "Parkinson's Disease" },
                    { key: 'stroke', label: 'Stroke' },
                    { key: 'diabetes', label: 'Diabetes' },
                    { key: 'hypertension', label: 'Hypertension' },
                    { key: 'heartDisease', label: 'Heart Disease' }
                  ].map((condition) => (
                    <label key={condition.key} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={profileData.familyHistory?.[condition.key as keyof typeof profileData.familyHistory] || false}
                        onChange={(e) => handleNestedInputChange('familyHistory', condition.key, e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-gray-700">{condition.label}</span>
                    </label>
                  ))}
                </div>

                {/* Other Conditions */}
                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Other Family Conditions</h4>
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      value={newFamilyCondition}
                      onChange={(e) => setNewFamilyCondition(e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Add other family condition"
                    />
                    <button
                      onClick={addFamilyCondition}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.familyHistory?.other?.map((condition, index) => (
                      <span
                        key={index}
                        className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        {condition}
                        <button
                          onClick={() => removeFamilyCondition(index)}
                          className="ml-2 text-purple-600 hover:text-purple-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Lifestyle Tab */}
          {activeTab === 'lifestyle' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-6 w-6 mr-2 text-green-600" />
                Lifestyle Information
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Cigarette className="h-5 w-5 mr-2 text-gray-600" />
                    Smoking Status
                  </h3>
                  <select
                    value={profileData.smokingStatus}
                    onChange={(e) => handleInputChange('smokingStatus', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="never">Never smoked</option>
                    <option value="former">Former smoker</option>
                    <option value="current">Current smoker</option>
                  </select>
                </div>

                <div className="bg-amber-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Wine className="h-5 w-5 mr-2 text-amber-600" />
                    Alcohol Consumption
                  </h3>
                  <select
                    value={profileData.alcoholConsumption}
                    onChange={(e) => handleInputChange('alcoholConsumption', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="never">Never</option>
                    <option value="occasional">Occasional</option>
                    <option value="moderate">Moderate</option>
                    <option value="heavy">Heavy</option>
                  </select>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Exercise Frequency
                  </h3>
                  <select
                    value={profileData.exerciseFrequency}
                    onChange={(e) => handleInputChange('exerciseFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="never">Never</option>
                    <option value="rarely">Rarely</option>
                    <option value="weekly">Weekly</option>
                    <option value="daily">Daily</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center mx-auto"
          >
            <Save className="h-5 w-5 mr-2" />
            {loading ? 'Saving Profile...' : 'Save Profile'}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;