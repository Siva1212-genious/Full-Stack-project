from fastapi import Depends, HTTPException
from .Database import *
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from datetime import datetime, timedelta
from fastapi.security.oauth2 import OAuth2PasswordBearer
from ..First_Project import Models

oauth2_schema = OAuth2PasswordBearer(tokenUrl="/Login/users")



SECRET_KEY = "***********************************************"
ALGORITHM = "HS256"
Access_Token_Time = 30

def create_token(data: dict):

    to_encode = data.copy()

    update_time = datetime.utcnow() + timedelta(minutes = Access_Token_Time)
    to_encode.update({"exp" : update_time})

    jwt_token = jwt.encode( to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return jwt_token



def verify_token(token: str):

    try:
        jwt_token_verify = jwt.decode( token, SECRET_KEY, algorithms=[ALGORITHM])

        id: int = jwt_token_verify.get("user_id", "First_name")
    except:
        raise JWTError (detail = "Given data is not getting verifies")
    
    return id


def current_user_id(token_data: str = Depends(oauth2_schema), db:Session = Depends(get_db)):

    data = verify_token(token_data)

    if not data:
        raise HTTPException(detail="Data not found!!!!!!!")
    
    user_id = db.query(Models.Users).filter(Models.Users.Id == data).first()

    return user_id




    





