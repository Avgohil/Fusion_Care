import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, HeartPulse, Search, SlidersHorizontal, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: number;
  isEmergency: boolean;
  address: string;
  phone: string;
  image: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Alice Smith',
    specialty: 'Cardiologist',
    rating: 4.8,
    distance: 2.5,
    isEmergency: true,
    address: '123 Heartbeat Ave, Cityville',
    phone: '555-1234',
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Dr.A'
  },
  {
    id: '2',
    name: 'Dr. Bob Johnson',
    specialty: 'Pediatrician',
    rating: 4.5,
    distance: 1.2,
    isEmergency: false,
    address: '456 Little St, Townsville',
    phone: '555-5678',
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Dr.B'
  },
  {
    id: '3',
    name: 'Dr. Carol White',
    specialty: 'Dermatologist',
    rating: 4.9,
    distance: 5.1,
    isEmergency: false,
    address: '789 Skin Rd, Villageton',
    phone: '555-9012',
    image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Dr.C'
  },
  {
    id: '4',
    name: 'Dr. David Green',
    specialty: 'Emergency Medicine',
    rating: 4.7,
    distance: 0.8,
    isEmergency: true,
    address: '101 Rapid Ln, Metroburg',
    phone: '555-3456',
    image: 'https://via.placeholder.com/150/FF33A1/FFFFFF?text=Dr.D'
  },
  {
    id: '5',
    name: 'Dr. Emily Brown',
    specialty: 'General Practitioner',
    rating: 4.6,
    distance: 3.0,
    isEmergency: false,
    address: '202 Family Dr, Suburbia',
    phone: '555-7890',
    image: 'https://via.placeholder.com/150/A133FF/FFFFFF?text=Dr.E'
  },
];

const DoctorRecommendation: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [filter, setFilter] = useState({
    rating: 0,
    distance: Infinity,
    emergency: false,
    search: '',
  });

  useEffect(() => {
    let filtered = mockDoctors;

    if (filter.rating > 0) {
      filtered = filtered.filter(doc => doc.rating >= filter.rating);
    }
    if (filter.distance < Infinity) {
      filtered = filtered.filter(doc => doc.distance <= filter.distance);
    }
    if (filter.emergency) {
      filtered = filtered.filter(doc => doc.isEmergency);
    }
    if (filter.search) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(filter.search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(filter.search.toLowerCase()) ||
        doc.address.toLowerCase().includes(filter.search.toLowerCase())
      );
    }

    setDoctors(filtered);
  }, [filter]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFilter(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (name === 'rating' || name === 'distance' ? parseFloat(value) : value),
    }));
  };

  const clearFilters = () => {
    setFilter({
      rating: 0,
      distance: Infinity,
      emergency: false,
      search: '',
    });
    toast.success('Filters cleared!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft border border-white/50"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Find Your Doctor</h1>

        {/* Filter Section */}
        <div className="mb-8 p-6 bg-gray-50 rounded-2xl shadow-inner border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center"><SlidersHorizontal className="mr-2" /> Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search by Name/Specialty/Address</label>
              <div className="relative mt-1 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
                  placeholder="e.g., Dr. Smith, Cardiology, New York"
                  value={filter.search}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700">Minimum Rating</label>
              <select
                id="rating"
                name="rating"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filter.rating}
                onChange={handleFilterChange}
              >
                <option value="0">Any</option>
                <option value="4.5">4.5 Stars & Up</option>
                <option value="4.0">4.0 Stars & Up</option>
                <option value="3.0">3.0 Stars & Up</option>
              </select>
            </div>
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Max Distance (miles)</label>
              <select
                id="distance"
                name="distance"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filter.distance}
                onChange={handleFilterChange}
              >
                <option value={Infinity}>Any</option>
                <option value="1">Within 1 mile</option>
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
              </select>
            </div>
            <div className="flex items-center mt-6">
              <input
                id="emergency"
                name="emergency"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={filter.emergency}
                onChange={handleFilterChange}
              />
              <label htmlFor="emergency" className="ml-2 block text-sm font-medium text-gray-900">Emergency Consultation</label>
            </div>
          </div>
          <div className="mt-6 text-right">
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <XCircle className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Clear Filters
            </button>
          </div>
        </div>

        {/* Doctor List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.length > 0 ? (
            doctors.map(doctor => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform hover:scale-105 transition-all duration-300"
              >
                <img src={doctor.image} alt={doctor.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold mb-2">{doctor.specialty}</p>
                  <div className="flex items-center text-gray-700 text-sm mb-2">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" /> {doctor.rating} ({Math.floor(Math.random() * 200) + 50} reviews)
                  </div>
                  <div className="flex items-center text-gray-700 text-sm mb-2">
                    <MapPin className="h-4 w-4 text-gray-500 mr-1" /> {doctor.distance} miles away
                  </div>
                  {doctor.isEmergency && (
                    <div className="flex items-center text-red-600 font-medium text-sm mb-2">
                      <HeartPulse className="h-4 w-4 mr-1" /> Emergency Available
                    </div>
                  )}
                  <p className="text-gray-600 text-sm mb-4">{doctor.address}</p>
                  <a href={`tel:${doctor.phone}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Call Now
                  </a>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-600 text-lg">No doctors found matching your criteria. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorRecommendation;