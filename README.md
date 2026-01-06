# Fusion Care - AI-Driven Fusion of Ayurveda and Allopathy

## Overview

Fusion Care is a revolutionary health screening platform that combines ancient Ayurvedic wisdom with modern cognitive science for early Alzheimer's detection and personalized preventive care. This monorepo contains both the frontend and backend components of the application.

## 🌟 Features

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
- **User Authentication**: Secure JWT-based authentication
- **Data Protection**: Privacy-focused design with secure data handling
- **Responsive Design**: Optimized for all devices and screen sizes
- **RESTful API**: Well-documented backend API

## 📁 Project Structure

```
Fusion_Care/
├── Project/                    # Frontend application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── contexts/          # React contexts
│   │   ├── pages/             # Application pages
│   │   └── App.tsx            # Main app component
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                    # Backend API
│   ├── app/
│   │   ├── core/              # Core utilities (security, database)
│   │   ├── models/            # Database models
│   │   ├── routers/           # API routes
│   │   ├── schemas/           # Pydantic schemas
│   │   └── main.py            # FastAPI application
│   ├── model/                 # ML models and notebooks
│   ├── requirements.txt       # Python dependencies
│   └── README.md
│
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+ and npm (for frontend)
- **Python** 3.8+ (for backend)
- Modern web browser
- Git

## Frontend Setup

### Installation

1. **Navigate to the frontend directory**
```bash
cd Project
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

### Frontend Tech Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Recharts** for data visualization
- **React Router** for navigation
- **Axios** for API calls

## Backend Setup

### Installation

1. **Navigate to the backend directory**
```bash
cd backend
```

2. **Create a virtual environment**
```bash
python -m venv venv
```

3. **Activate the virtual environment**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

4. **Install dependencies**
```bash
pip install -r requirements.txt
```

5. **Start the backend server**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Backend Tech Stack
- **FastAPI** - Modern Python web framework
- **Pydantic** - Data validation
- **SQLAlchemy** - ORM for database operations
- **JWT** - Authentication
- **Scikit-learn** - Machine learning models
- **Pandas & NumPy** - Data processing

### API Documentation

Once the backend server is running, you can access:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔐 Environment Configuration

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:8000
```

### Backend (.env)
```env
DATABASE_URL=sqlite:///./fusion_care.db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

## 🧪 API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user

### Assessment
- `POST /assessment/submit` - Submit health assessment
- `GET /assessment/history` - Get assessment history
- `GET /assessment/{id}` - Get specific assessment

### Prakriti Analysis
- `POST /prakriti/analyze` - Analyze Ayurvedic constitution
- `GET /prakriti/recommendations` - Get personalized recommendations

## 🤖 Machine Learning Models

The backend includes trained ML models for:

1. **Alzheimer's Risk Assessment** - Random Forest model for cognitive decline prediction
2. **Prakriti Classification** - Model for Ayurvedic constitutional analysis
3. **Risk Scoring** - Combined scoring algorithm integrating both systems

Models are located in the `backend/model/` directory.

## 📊 Assessment Methodology

### Cognitive Assessment
- Memory Function
- Concentration & Attention
- Language Skills
- Orientation
- Daily Activities

### Ayurvedic Prakriti Analysis
- Constitutional Traits (Body type, skin, hair)
- Metabolic Patterns (Appetite, digestion, energy)
- Behavioral Tendencies
- Dosha Balance (Vata, Pitta, Kapha)

### Risk Calculation
```
Risk Score = (Cognitive Score × 0.7) + (Constitutional Risk Factor × 0.3)

Risk Levels:
- Low: < 2.0
- Medium: 2.0 - 3.5
- High: > 3.5
```

## 🚀 Deployment

### Frontend Deployment
The frontend can be deployed on:
- **Netlify** (recommended)
- **Vercel**
- **AWS S3 + CloudFront**

Build command: `npm run build`
Output directory: `dist`

### Backend Deployment
The backend can be deployed on:
- **Heroku**
- **AWS EC2**
- **Railway**
- **DigitalOcean App Platform**

Production requirements:
- PostgreSQL database (instead of SQLite)
- Environment variables configuration
- CORS settings for frontend domain
- SSL/HTTPS enabled

## 🧪 Development

### Running Tests
```bash
# Frontend tests
cd Project
npm test

# Backend tests
cd backend
pytest
```

### Code Formatting
```bash
# Frontend
npm run lint
npm run format

# Backend
black app/
flake8 app/
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📚 Research References

### Ayurvedic Sources
- CSIR TRISUTRA Prakriti Assessment
- AYU Journal publications
- Traditional Ayurvedic texts on cognitive health

### Alzheimer's Research
- MDPI publications on early detection
- Nature journals on cognitive assessment
- WHO guidelines on dementia prevention

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

**Team Care Catalyst**
- Parul Institute of Engineering and Technology
- Subdomain: Personalized Preventive Care Recommendation Engine

## 📧 Support

For support and questions:
- Issues: [GitHub Issues](https://github.com/Avgohil/Fusion_Care/issues)
- Email: support@fusioncare.com

---

*Combining ancient wisdom with modern technology for better cognitive health outcomes.*
