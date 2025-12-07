from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
import datetime

class HCP(Base):
    __tablename__ = "hcps"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    role = Column(String(255))
    hospital = Column(String(255))
    bio = Column(Text)
    
    interactions = relationship("Interaction", back_populates="hcp")

class Interaction(Base):
    __tablename__ = "interactions"

    id = Column(Integer, primary_key=True, index=True)
    hcp_id = Column(Integer, ForeignKey("hcps.id"))
    date = Column(DateTime, default=datetime.datetime.utcnow)
    type = Column(String(50)) # Call, Visit, Email
    notes = Column(Text)
    sentiment = Column(String(50))
    next_steps = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    hcp = relationship("HCP", back_populates="interactions")
