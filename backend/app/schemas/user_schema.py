from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserPublic(UserBase):
    id: Optional[str] = None
    
    class Config:
        orm_mode = True