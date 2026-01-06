# Care Catalyst - AI-Driven Fusion of Ayurveda and Allopathy

## Overview

Care Catalyst is a revolutionary health screening platform that combines ancient Ayurvedic wisdom with modern cognitive science for early Alzheimer's detection and personalized preventive care. Developed by Team Care Catalyst from Parul Institute of Engineering and Technology.

## Features

### 🧠 Comprehensive Assessment
- **Cognitive Evaluation**: Memory, concentration, language, and daily activity assessment
- **Ayurvedic Prakriti Analysis**: Constitutional type determination based on Vata, Pitta, and Kapha doshas
- **Integrated Scoring**: AI-powered risk calculation combining both approaches

### 🎯 Personalized Recommendations
- **Dietary Guidance**: Constitution-specific nutritional recommendations
- **Lifestyle Modifications**: Tailored exercise, sleep, and stress management advice
- **Mental Wellness**: Cognitive training and mindfulness practices
- **Preventive Care**: Early intervention strategies based on risk profile

### 📊 Advanced Analytics
- **Risk Visualization**: Interactive charts and progress tracking
- **Prakriti Distribution**: Detailed constitutional analysis
- **Progress Monitoring**: Long-term health journey tracking
- **Admin Dashboard**: Comprehensive platform analytics

### 🔐 Secure & Scalable
- **User Authentication**: Secure login and registration system
- **Data Protection**: Privacy-focused design with secure data handling
- **Responsive Design**: Optimized for all devices and screen sizes
- **Admin Panel**: Complete platform management and analytics

## Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **React Hook Form** for form management

### Backend Architecture (Production Ready)
- **Python Flask/FastAPI** backend
- **AWS Services Integration**:
  - S3 for file storage
  - DynamoDB/RDS for database
  - SageMaker for ML model deployment
  - Lambda for serverless functions
- **Firebase Auth** for authentication
- **RESTful API** design

### AI/ML Components
- **Random Forest/Logistic Regression** for baseline classification
- **Feature Engineering**: Cognitive + Ayurvedic trait combination
- **Risk Scoring Algorithm**: Multi-factor assessment model
- **Prakriti Classification**: Traditional Ayurvedic constitution analysis

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser
- Internet connection for external dependencies

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd care-catalyst-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:5173`

### Demo Accounts
- **Admin**: admin@carecatalyst.com / password123
- **User**: user@example.com / password123

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation component
│   └── ProtectedRoute.tsx # Route protection
├── contexts/           # React contexts for state management
│   ├── AuthContext.tsx # Authentication state
│   └── AssessmentContext.tsx # Assessment data management
├── pages/              # Main application pages
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # User authentication
│   ├── Register.tsx    # User registration
│   ├── Assessment.tsx  # Health assessment form
│   ├── Results.tsx     # Assessment results display
│   ├── Recommendations.tsx # Personalized recommendations
│   ├── Dashboard.tsx   # User dashboard
│   └── AdminPanel.tsx  # Admin management interface
└── App.tsx            # Main application component
```

## Assessment Methodology

### Cognitive Assessment
- **Memory Function**: Short-term and long-term memory evaluation
- **Concentration**: Attention span and focus assessment
- **Language Skills**: Verbal fluency and comprehension
- **Orientation**: Time, place, and person awareness
- **Daily Activities**: Functional independence evaluation

### Ayurvedic Prakriti Analysis
- **Constitutional Traits**: Body type, skin, hair characteristics
- **Metabolic Patterns**: Appetite, digestion, energy levels
- **Behavioral Tendencies**: Temperament, stress response, preferences
- **Dosha Balance**: Vata, Pitta, Kapha distribution analysis

### Risk Calculation Algorithm
```
Risk Score = (Cognitive Score × 0.7) + (Constitutional Risk Factor × 0.3)

Where:
- Cognitive Score: Weighted average of cognitive assessments
- Constitutional Risk Factor: Ayurvedic imbalance indicators
- Final Risk: Low (<2.0), Medium (2.0-3.5), High (>3.5)
```

## Deployment

### Frontend Deployment
The application is ready for deployment on platforms like:
- **Netlify** (recommended)
- **Vercel**
- **AWS S3 + CloudFront**

### Backend Deployment (Production)
For full production deployment:
1. **AWS EC2** or **Heroku** for backend services
2. **AWS RDS** for database
3. **AWS S3** for file storage
4. **AWS SageMaker** for ML model hosting

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Research References

### Ayurvedic Sources
- CSIR TRISUTRA Prakriti Assessment
- AYU Journal publications on constitutional analysis
- Traditional Ayurvedic texts on cognitive health

### Alzheimer's Research
- MDPI publications on early detection
- Nature journals on cognitive assessment
- WHO guidelines on dementia prevention

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Team

**Care Catalyst Team**
- Parul Institute of Engineering and Technology
- Subdomain: Personalized Preventive Care Recommendation Engine

## Support

For support and questions:
- Email: support@carecatalyst.com
- Documentation: [Project Wiki]
- Issues: [GitHub Issues]

---

*Combining ancient wisdom with modern technology for better cognitive health outcomes.*