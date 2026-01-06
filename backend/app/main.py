from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import auth_router, assessment_router, dashboard_router, admin_router # Import all your routers

app = FastAPI(title="Care Catalyst - FastAPI Backend")

# Add CORS Middleware
origins = ["http://localhost:3000", "http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Care Catalyst API"}

# Include all routers
app.include_router(auth_router.router, prefix="/api")
app.include_router(assessment_router.router, prefix="/api")
app.include_router(dashboard_router.router, prefix="/api")
app.include_router(admin_router.router, prefix="/api")