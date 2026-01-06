from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from ..core.database import DatabaseManager
from app.core.security import create_access_token, get_password_hash, verify_password, get_current_user
from app.schemas.user_schema import UserCreate, UserPublic # Make sure you have these schemas

router = APIRouter(prefix="/auth", tags=["Authentication"])
db_manager = DatabaseManager()

@router.post("/register", response_model=UserPublic)
def register(user_data: UserCreate):
    # Logic from your Flask register function
    db_user = db_manager.get_user_by_email(user_data.email)
    if db_user:
        raise HTTPException(status_code=409, detail="User already exists")
    
    hashed_password = get_password_hash(user_data.password)
    user_id = db_manager.create_user({**user_data.dict(exclude={"password"}), "password": hashed_password}) # Create user in DB
    
    new_user = db_manager.get_user_by_id(user_id)
    return new_user

@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    # Logic from your Flask login function
    user = db_manager.get_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user['password_hash']):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token = create_access_token(data={"sub": str(user['id'])})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/profile", response_model=UserPublic)
def get_profile(current_user: dict = Depends(get_current_user)):
    # The dependency already gets the user for us
    return current_user