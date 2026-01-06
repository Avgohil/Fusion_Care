import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, Star, Navigation, Search, Filter, Guitar as Hospital, Stethoscope, Brain, Heart, AlertCircle } from 'lucide-react';

interface Hospital {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance: number;
  rating: number;
  specialties: string[];
  emergencyServices: boolean;
  neurologyDepartment: boolean;
  hours: string;
  image: string;
}

const HospitalFinder: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospital[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock hospital data - in production, this would come from a real API
  const mockHospitals: Hospital[] = [
    {
      id: '1',
      name: 'Zydus Hospital ',
      address: 'Old padra rd, Hira nagar, Tandlaja, Vadodara',
      phone: '+91 8798942380',
      distance: 2.3,
      rating: 4.5,
      specialties: ['Neurology', 'Cardiology', 'Emergency Medicine'],
      emergencyServices: true,
      neurologyDepartment: true,
      hours: '24/7',
      image: 'https://cdn.hexahealth.com/Image/e82ae5d9-d556-4d92-b971-3ee1303620d8.jpg'
    },
    {
      id: '2',
      name: 'BAPS Shastriji Maharaj Hospital',
      address: 'BAPS Shastriji Maharaj Hospital Circle, opp. BAPS Shri Swaminarayan Mandir, Atladara, Vadodara',
      phone: '+91 9258967842',
      distance: 3.7,
      rating: 4.8,
      specialties: ['Neurology', 'Neurosurgery', 'Memory Care'],
      emergencyServices: false,
      neurologyDepartment: true,
      hours: 'Mon-Fri 8AM-6PM',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOV7K56dh06OXHTd7h6Ofz-E5xUe6CzXPYw&s'
    },
    {
      id: '3',
      name: 'Bankers Institute',
      address: 'Old Padra Rd, near Tagore Nagar, Sukrutinagar, Diwalipura, Vadodara',
      phone: '+91 8659756794',
      distance: 5.1,
      rating: 4.3,
      specialties: ['Internal Medicine', 'Geriatrics', 'Neurology'],
      emergencyServices: true,
      neurologyDepartment: true,
      hours: '24/7',
      image: 'https://mbbscouncil.com/wp-content/uploads/2022/06/Bankers-Heart-Institute-Vadodara-Campus.jpg'
    },
    {
      id: '4',
      name: 'Nand Hospital',
      address: 'Near Panchmukhi Hanuman Temple, Vasna - Bhayli Main Rd, next to Shantidham Society, Vadodara',
      phone: '+91 9624459268',
      distance: 6.8,
      rating: 4.9,
      specialties: ['Neurology', 'Alzheimer\'s Care', 'Cognitive Therapy'],
      emergencyServices: false,
      neurologyDepartment: true,
      hours: 'Mon-Sat 7AM-7PM',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT__z--sbGFyuAhL54U04_sbUo3O1H1krSGSQ&s'
    },
    {
      id: '5',
      name: 'Welcare Hospital',
      address: 'R. S. No. 626, Vadsar Road, near Squirrel Circle, Atladara, Vadodara',
      phone: '+91 9978774310',
      distance: 4.2,
      rating: 4.1,
      specialties: ['Emergency Medicine', 'Trauma Care', 'Neurology'],
      emergencyServices: true,
      neurologyDepartment: true,
      hours: '24/7',
      image: 'https://vtsgroup.com/files/references/517/53_IN_Vadodara_Welcare_Hospital_Welcare_Hospital_VENTUS.jpg'
    }
  ];

  useEffect(() => {
    // Simulate loading and getting user location
    const loadData = async () => {
      setLoading(true);
      
      // Mock getting user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude
            });
          },
          () => {
            // Default location if geolocation fails
            setUserLocation({ lat: 40.7128, lng: -74.0060 });
          }
        );
      }

      // Simulate API delay
      setTimeout(() => {
        setHospitals(mockHospitals);
        setFilteredHospitals(mockHospitals);
        setLoading(false);
      }, 1000);
    };

    loadData();
  }, []);

  useEffect(() => {
    let filtered = hospitals;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.specialties.some(specialty => 
          specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by specialty
    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(hospital =>
        hospital.specialties.some(specialty =>
          specialty.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
      );
    }

    // Sort by distance
    filtered.sort((a, b) => a.distance - b.distance);

    setFilteredHospitals(filtered);
  }, [hospitals, searchTerm, selectedSpecialty]);

  const getDirections = (hospital: Hospital) => {
    const query = encodeURIComponent(hospital.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  const callHospital = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const specialties = ['all', 'neurology', 'emergency', 'cardiology', 'geriatrics'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Finding nearby hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <div className="bg-gradient-to-r from-red-600 to-blue-600 text-white rounded-2xl p-8 shadow-xl">
            <Hospital className="h-16 w-16 mx-auto mb-4 text-red-100" />
            <h1 className="text-3xl font-display font-bold mb-2">Find Nearby Hospitals</h1>
            <p className="text-red-100 text-lg">
              Locate neurologists and medical facilities for immediate consultation
            </p>
          </div>
        </motion.div>

        {/* Emergency Alert */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-red-50 border-l-4 border-red-400 p-6 mb-8 rounded-lg"
        >
          <div className="flex items-center">
            <AlertCircle className="h-6 w-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-medium text-red-800">
                Medical Emergency?
              </h3>
              <p className="text-red-700 mt-1">
                If you're experiencing a medical emergency, call <strong>911</strong> immediately or go to the nearest emergency room.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search hospitals or specialties..."
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
              >
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>
                    {specialty === 'all' ? 'All Specialties' : specialty.charAt(0).toUpperCase() + specialty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Hospital List */}
        <div className="grid gap-6">
          {filteredHospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * index }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={hospital.image}
                    alt={hospital.name}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{hospital.name}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{hospital.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Navigation className="h-4 w-4 mr-2" />
                        <span>{hospital.distance} miles away</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <Star className="h-5 w-5 text-yellow-400 mr-1" />
                        <span className="font-semibold">{hospital.rating}</span>
                      </div>
                      {hospital.emergencyServices && (
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                          Emergency
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Stethoscope className="h-4 w-4 mr-2" />
                      Specialties
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hospital.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            specialty.toLowerCase().includes('neurology') || specialty.toLowerCase().includes('alzheimer')
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {specialty.toLowerCase().includes('neurology') && <Brain className="h-3 w-3 inline mr-1" />}
                          {specialty.toLowerCase().includes('cardiology') && <Heart className="h-3 w-3 inline mr-1" />}
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-gray-600 mb-4">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{hospital.hours}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => callHospital(hospital.phone)}
                      className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call Now
                    </button>
                    <button
                      onClick={() => getDirections(hospital)}
                      className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </button>
                    {hospital.neurologyDepartment && (
                      <div className="flex items-center px-4 py-3 bg-purple-50 text-purple-800 rounded-lg border border-purple-200">
                        <Brain className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Neurology Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredHospitals.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center py-12"
          >
            <Hospital className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hospitals found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or location.</p>
          </motion.div>
        )}

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-blue-50 rounded-lg p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Always call ahead to confirm availability and appointment requirements</li>
            <li>• Bring your medical records and current medications list</li>
            <li>• Consider insurance coverage and referral requirements</li>
            <li>• For urgent concerns, don't hesitate to visit the emergency department</li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalFinder;