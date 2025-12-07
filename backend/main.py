from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from database import get_db, create_database
from models import HCP, Interaction
from agent import agent_executor

load_dotenv()

app = FastAPI(title="AI-First CRM HCP Module")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Pydantic Models ---
class ChatRequest(BaseModel):
    message: str
    thread_id: str = "default"

class InteractionCreate(BaseModel):
    hcp_id: int
    type: str # Call, Visit, Email
    notes: str
    sentiment: str = "Neutral"
    next_steps: str = ""

# --- Routes ---

@app.on_event("startup")
def startup_event():
    create_database()
    # Create tables
    from database import engine, Base
    from models import HCP, Interaction
    Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "HCP CRM Backend API is running"}

@app.post("/chat")
def chat_endpoint(request: ChatRequest):
    if not agent_executor:
        raise HTTPException(status_code=500, detail="Agent not initialized. Check GROQ_API_KEY.")
    
    # Simple state management for demo (in-memory)
    # In production, use LangGraph Checkpointer
    
    input_message = {"role": "user", "content": request.message}
    
    try:
        # Run the agent
        # We pass a list of messages. For a real persistent chat, we'd fetch history.
        # Here we just treat it as a single turn or simple history if context is passed.
        # LangGraph stores state in the recursion, but for a stateless API call we need to manage it.
        # For this assignment, assuming single-turn or simple accumulation on client side is acceptable 
        # OR we can just return the response.
        
        # Let's assume we pass just the new message for simplicity, 
        # relying on the agent to pick up context if we were using a checkpointer.
        # Without checkpointer, it's stateless per request unless we pass history.
        
        result = agent_executor.invoke({"messages": [input_message]})
        last_message = result["messages"][-1]
        return {"response": last_message.content}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/hcps")
def get_hcps(db: Session = Depends(get_db)):
    hcps = db.query(HCP).all()
    return hcps

@app.get("/interactions")
def get_interactions(db: Session = Depends(get_db)):
    interactions = db.query(Interaction).all()
    # Serialize manually or Use Pydantic response_model
    # Doing simple return for now
    return interactions

@app.post("/interactions")
def create_interaction(interaction: InteractionCreate, db: Session = Depends(get_db)):
    db_interaction = Interaction(**interaction.dict())
    db.add(db_interaction)
    db.commit()
    return {"message": "Interaction created manually"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
