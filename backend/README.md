# Fusion Care Backend API

## Overview

This is the backend API for Fusion Care, a health screening platform that combines Ayurvedic wisdom with modern cognitive science for Alzheimer's detection and personalized preventive care.

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. **Create a virtual environment**
```bash
python -m venv venv
```

2. **Activate the virtual environment**
- Windows: `venv\Scripts\activate`
- Mac/Linux: `source venv/bin/activate`

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Run the application**
```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

## 📚 API Documentation

Once the server is running:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🏗️ Project Structure

```
backend/
├── app/
│   ├── core/                      # Core utilities
│   │   ├── analysis.py           # ML analysis functions
│   │   ├── database.py           # Database configuration
│   │   ├── security.py           # Authentication & security
│   │   └── __init__.py
│   │
│   ├── models/                    # Database models
│   │   └── __init__.py
│   │
│   ├── routers/                   # API routes
│   │   ├── assessment_router.py  # Assessment endpoints
│   │   ├── auth_router.py        # Authentication endpoints
│   │   ├── prakriti_router.py    # Ayurvedic analysis endpoints
│   │   └── __init__.py
│   │
│   ├── schemas/                   # Pydantic schemas
│   │   ├── assessment_schema.py  # Assessment data models
│   │   ├── prakriti_schema.py    # Prakriti data models
│   │   ├── user_schema.py        # User data models
│   │   └── __init__.py
│   │
│   ├── main.py                    # FastAPI application entry point
│   ├── config.py                  # Configuration settings
│   ├── database.py                # Database session management
│   └── utils.py                   # Utility functions
│
├── model/                          # ML models and notebooks
│   ├── prakriti_model.pkl         # Ayurvedic classification model
│   ├── alzheimers_stage2_model.pkl # Alzheimer's risk model
│   ├── stage2_encoders.pkl        # Feature encoders
│   └── Stage2.ipynb               # Model training notebook
│
├── requirements.txt                # Python dependencies
├── README.md                       # This file
└── main.py                         # Alternative entry point
```

## 🔌 API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token
- `GET /auth/me` - Get current user profile

### Assessment
- `POST /assessment/submit` - Submit a health assessment
- `GET /assessment/history` - Get user's assessment history
- `GET /assessment/{id}` - Get specific assessment details
- `GET /assessment/latest` - Get latest assessment

### Prakriti Analysis
- `POST /prakriti/analyze` - Analyze Ayurvedic constitution
- `GET /prakriti/recommendations` - Get personalized recommendations
- `GET /prakriti/profile` - Get user's prakriti profile

### Health Data
- `GET /health` - Health check endpoint
- `GET /` - API root information

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

1. **Register**: Create a new user account
2. **Login**: Get an access token
3. **Use token**: Include in Authorization header:
   ```
   Authorization: Bearer <your_token_here>
   ```

## 🧠 Machine Learning Models

### Alzheimer's Risk Assessment
- **Model Type**: Random Forest Classifier
- **Input Features**: Cognitive assessment scores, age, lifestyle factors
- **Output**: Risk score (0-10) and risk category (Low/Medium/High)

### Prakriti Classification
- **Model Type**: Multi-class Classifier
- **Input Features**: Physical traits, behavioral patterns, metabolic characteristics
- **Output**: Dosha distribution (Vata, Pitta, Kapha percentages)

### Risk Calculation Algorithm
```python
risk_score = (cognitive_score * 0.7) + (constitutional_risk * 0.3)

Risk Categories:
- Low: score < 2.0
- Medium: 2.0 <= score <= 3.5
- High: score > 3.5
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
# Database
DATABASE_URL=sqlite:///./fusion_care.db

# Security
SECRET_KEY=your-secret-key-here-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS (for frontend)
FRONTEND_URL=http://localhost:5173

# API
API_VERSION=v1
DEBUG=True
```

### Database Setup

The application uses SQLite by default. For production, switch to PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost/fusion_care
```

Run migrations (if using Alembic):
```bash
alembic upgrade head
```

## 🧪 Testing

Run tests:
```bash
pytest
```

Run tests with coverage:
```bash
pytest --cov=app tests/
```

## 📦 Dependencies

Key dependencies:
- **FastAPI**: Modern web framework
- **Uvicorn**: ASGI server
- **Pydantic**: Data validation
- **SQLAlchemy**: Database ORM
- **python-jose**: JWT tokens
- **passlib**: Password hashing
- **scikit-learn**: Machine learning
- **pandas**: Data processing
- **numpy**: Numerical operations

See `requirements.txt` for the complete list.

## 🚀 Deployment

### Production Setup

1. **Update environment variables** for production
2. **Switch to PostgreSQL** or MySQL
3. **Set DEBUG=False**
4. **Use production ASGI server**:
   ```bash
   gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```

### Deployment Platforms

- **Heroku**: `git push heroku main`
- **Railway**: Connect GitHub repo
- **AWS EC2**: Deploy with Docker or directly
- **DigitalOcean App Platform**: Use the web interface

### Docker Deployment

Create a `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

Build and run:
```bash
docker build -t fusion-care-backend .
docker run -p 8000:8000 fusion-care-backend
```

## 🔧 Development

### Adding New Endpoints

1. Create a new router in `app/routers/`
2. Define schemas in `app/schemas/`
3. Add router to `app/main.py`

Example:
```python
# app/routers/my_router.py
from fastapi import APIRouter

router = APIRouter(prefix="/myroute", tags=["My Route"])

@router.get("/")
async def my_endpoint():
    return {"message": "Hello!"}
```

### Code Style

Follow PEP 8 guidelines:
```bash
# Format code
black app/

# Check style
flake8 app/

# Type checking
mypy app/
```

## 📝 Model Retraining

To retrain the ML models:

1. Open `model/Stage2.ipynb` in Jupyter
2. Update training data
3. Run all cells
4. Save new model files to `model/` directory

## 🐛 Troubleshooting

### Common Issues

**ImportError: No module named 'app'**
- Ensure you're in the backend directory
- Activate the virtual environment

**Database locked error**
- Close any open database connections
- Use a different database engine for production

**CORS errors**
- Update `FRONTEND_URL` in `.env`
- Check CORS middleware settings in `main.py`

## 📄 License

MIT License - See LICENSE file for details

## 👥 Contributors

Team Care Catalyst - Parul Institute of Engineering and Technology

## 📧 Support

- Issues: [GitHub Issues](https://github.com/Avgohil/Fusion_Care/issues)
- Email: support@fusioncare.com

---

Built with ❤️ using FastAPI and modern Python
