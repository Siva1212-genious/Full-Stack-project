from fastapi import FastAPI, Depends, HTTPException, status
from .Database import *
from ..First_Project import Models
from pydantic import BaseModel, EmailStr
from sqlalchemy.orm import Session
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import os, shutil
from fastapi import UploadFile, File, Form
from passlib.context import CryptContext
from .oauth2 import *
from fastapi.staticfiles import StaticFiles

pwd_hashing = CryptContext(schemes=["bcrypt"], deprecated="auto" )

Models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers =["*"],
)

app.mount("/Uploads", StaticFiles(directory="Uploads"), name="/Uploads")

class verify(BaseModel):
    First_name: str
    Last_name: str
    Email: EmailStr
    Password: str
    Re_Enter_Password: str
    Gender: str

class verify_response(BaseModel):
    Id: int
    First_name: str
    Last_name: str
    Email: EmailStr
    Gender: str

    class Config:
        orm_mode = True

class Login(BaseModel):
    Email: EmailStr
    Password: str

class Login_verify(BaseModel):
    Id: int
    Email: EmailStr

    class Config:
        orm_mode = True

class Token(BaseModel):
    Access_token: str
    token_type: str

    class Config:
        orm_mode = True


class Users_Post(BaseModel):
    Title: str 
    Content: str
    picture: UploadFile

class User_Post_Response(BaseModel):
    Id: int
    Title: str
    Content: str
    Picture: str
    Owner_Id: int

    class Config:
        orm_mode=True



@app.post("/Create/users", response_model = verify_response)
def root(user_data:verify, db:Session = Depends(get_db)):

    if(user_data.Password != user_data.Re_Enter_Password):
        raise HTTPException (status_code=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION, detail = "Password did not match")

    
    Password_hashing = pwd_hashing.hash(user_data.Password)
    user_data.Password = Password_hashing
    user_data.Re_Enter_Password = Password_hashing

    creating_users = Models.Users(**user_data.dict())
    db.add(creating_users)
    db.commit()
    db.refresh(creating_users)
    return creating_users




@app.get("/Find/users", response_model= List[verify_response])
def root(db:Session = Depends(get_db)):
    find_users = db.query(Models.Users).all()

    if not find_users:
        raise HTTPException (status_code=status.HTTP_404_NOT_FOUND, detail = "Not Found")

    return find_users




@app.post("/Login/users", response_model = Token)
def root2(details: Login, db:Session = Depends(get_db)):

    Login_user = db.query(Models.Users).filter(Models.Users.Email == details.Email).first()

    pwd_check = pwd_hashing.verify(details.Password, Login_user.Password)

    if not pwd_check:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized"
        )

    if not pwd_check:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, details="Un-authorized")

    if not Login_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Un-authorised ")
    
    access_token = create_token({"user_id" : Login_user.Id, 
                                 "First_name" : Login_user.First_name})
    
    return {"Access_token": access_token, "token_type": "Bearer" }





@app.get("/Find/users/{id}", response_model=verify_response)
def root(id:int, db:Session = Depends(get_db)):

    find_user = db.query(Models.Users).filter(Models.Users.Id == id).first()
    if not find_user:
        raise HTTPException (status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return(find_user)




@app.post("/Users/Post", response_model = User_Post_Response)

def root3(Title: str = Form(...),
          Content: str = Form(...),
          Picture: UploadFile = File(...),
          db:Session = Depends(get_db), 
          current_user: int = Depends(current_user_id)):

    upload_file = "Uploads"
    if not os.path.exists(upload_file):
        os.makedirs(upload_file)
    
    file_path = os.path.join(upload_file, Picture.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(Picture.file, buffer)
    
    data = Models.Post(Title=Title,
                        Content=Content,
                        Picture = file_path, 
                        Owner_Id = current_user.Id)
    
    db.add(data)
    db.commit()
    db.refresh(data)



    return data




@app.get("/Posts/User", response_model = List[User_Post_Response])
def root4(db:Session = Depends(get_db), current_user = Depends(current_user_id)):

    response_posts = db.query(Models.Post).filter(Models.Post.Owner_Id == current_user.Id).all()

    if not response_posts:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No Posts Available")
    
    return response_posts
