import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Heart, Leaf, Shield, Users, TrendingUp, ArrowRight, CheckCircle, Star, Sparkles, Zap, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Cognitive Assessment',
      description: 'Advanced neural networks analyze cognitive patterns with 95% accuracy for early detection.',
      gradient: 'from-blue-500 to-purple-600',
      delay: 0.1,
    },
    {
      icon: Leaf,
      title: 'Ancient Ayurvedic Wisdom',
      description: 'Traditional Prakriti analysis combined with modern science for holistic health insights.',
      gradient: 'from-green-500 to-teal-600',
      delay: 0.2,
    },
    {
      icon: Shield,
      title: 'Predictive Risk Analysis',
      description: 'Machine learning algorithms predict health risks years before symptoms appear.',
      gradient: 'from-orange-500 to-red-600',
      delay: 0.3,
    },
    {
      icon: Heart,
      title: 'Personalized Care Plans',
      description: 'Custom recommendations tailored to your unique constitution and lifestyle.',
      gradient: 'from-pink-500 to-rose-600',
      delay: 0.4,
    },
  ];

  const stats = [
    { icon: Users, value: '50,000+', label: 'Lives Transformed', color: 'text-blue-600' },
    { icon: TrendingUp, value: '98.5%', label: 'Accuracy Rate', color: 'text-green-600' },
    { icon: Award, value: '24/7', label: 'Expert Support', color: 'text-purple-600' },
    { icon: Star, value: '4.9/5', label: 'User Rating', color: 'text-yellow-600' },
  ];

  const testimonials = [
    {
      name: 'Dr. Gohil Ankita',
      role: 'Neurologist, Stanford Medical',
      content: 'Revolutionary platform that bridges ancient wisdom with cutting-edge AI. A game-changer for preventive healthcare.',
      avatar: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
    },
    {
      name: 'Maheshwari Aryan',
      role: 'Health Tech Researcher',
      content: 'The most comprehensive cognitive health platform I\'ve encountered. The Ayurvedic integration is brilliant.',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
    },
    {
      name: 'Dr. Priya Sharma',
      role: 'Ayurvedic Practitioner',
      content: 'Finally, a platform that respects traditional medicine while leveraging modern technology. Exceptional work!',
      avatar: 'https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-25 to-pink-50"></div>
        <div className="absolute inset-0 bg-hero-pattern opacity-30"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-green-400/20 to-teal-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 backdrop-blur-sm mb-8"
            >
              <Sparkles className="h-5 w-5 text-blue-600 mr-2" />
              <span className="text-blue-800 font-semibold">AI-Powered Health Revolution</span>
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs rounded-full">
                NEW
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-display font-bold text-gray-900 mb-8 leading-tight"
            >
              The Future of{' '}
              <span className="relative">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient bg-300%">
                  Cognitive Health
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></div>
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Revolutionary platform combining <span className="font-semibold text-green-600">5,000-year-old Ayurvedic wisdom</span> with 
              <span className="font-semibold text-blue-600"> cutting-edge AI</span> for early Alzheimer's detection and personalized preventive care.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              {user ? (
                <Link
                  to="/assessment"
                  className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg flex items-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <span className="relative flex items-center">
                    <Zap className="mr-3 h-6 w-6" />
                    Start Your Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="group relative px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-glow-lg flex items-center"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <span className="relative flex items-center">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Get Started Free
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                  <Link
                    to="/login"
                    className="px-10 py-5 bg-white/80 backdrop-blur-sm text-gray-800 text-lg font-semibold rounded-2xl border-2 border-gray-200 hover:bg-white hover:border-gray-300 transition-all duration-300 transform hover:scale-105 shadow-soft"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                <span>FDA Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-blue-500 mr-2" />
                <span>HIPAA Secure</span>
              </div>
              <div className="flex items-center">
                <Award className="h-5 w-5 text-purple-500 mr-2" />
                <span>Clinically Validated</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 mr-2" />
                <span>Award Winning</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:scale-105 border border-gray-100">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <div className="text-4xl font-display font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-200/50 backdrop-blur-sm mb-6"
            >
              <Brain className="h-5 w-5 text-green-600 mr-2" />
              <span className="text-green-800 font-semibold">Revolutionary Technology</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6"
            >
              Where Ancient Meets{' '}
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Our platform integrates cutting-edge AI with time-tested Ayurvedic principles 
              to provide unprecedented insights into cognitive health and personalized care.
            </motion.p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-500 transform hover:scale-105 border border-gray-100 overflow-hidden">
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/50 backdrop-blur-sm mb-6"
            >
              <Star className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-purple-800 font-semibold">Trusted by Experts</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-display font-bold text-gray-900 mb-6"
            >
              What Healthcare Leaders{' '}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Are Saying
              </span>
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 transform hover:scale-105 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
              <Sparkles className="h-5 w-5 mr-2" />
              <span className="font-semibold">Join the Revolution</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
              Take Control of Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Cognitive Future
              </span>
            </h2>
            <p className="text-xl md:text-2xl mb-12 leading-relaxed text-blue-100">
              Join thousands who have discovered their personalized path to brain health 
              through our revolutionary assessment platform. Your journey to optimal cognitive wellness starts here.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/register"
                  className="group relative px-12 py-6 bg-white text-blue-600 text-xl font-bold rounded-2xl hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <span className="relative flex items-center">
                    <Brain className="mr-3 h-6 w-6" />
                    Start Your Assessment
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/login"
                  className="px-12 py-6 bg-white/20 backdrop-blur-sm text-white text-xl font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                >
                  Sign In
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;