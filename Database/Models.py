from .Database import Base
from sqlalchemy import Column, Integer, String, ForeignKey


class Users(Base):
    __tablename__ = "Usersss"

    Id = Column(Integer, primary_key = True, nullable=False)
    First_name = Column(String, nullable = False)
    Last_name = Column(String)
    Email = Column(String, nullable = False)
    Password = Column(String, nullable = False)
    Re_Enter_Password = Column(String, nullable = False)
    Gender = Column(String, nullable = False)


class Post(Base):
    __tablename__ = "Postsss"

    Id = Column(Integer, primary_key = True, nullable = False)
    Title = Column(String, nullable = False)
    Content = Column(String, nullable = True)
    Picture = Column(String, nullable = True)
    Owner_Id = Column(Integer, ForeignKey("Usersss.Id", ondelete="CASCADE", onupdate="CASCADE"))