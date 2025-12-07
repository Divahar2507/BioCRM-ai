import os
import datetime
from typing import Annotated, List, Union
from typing_extensions import TypedDict

from langchain_groq import ChatGroq
from langchain_core.messages import BaseMessage, HumanMessage, AIMessage, SystemMessage, ToolMessage
from langchain_core.tools import tool
from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode

from database import SessionLocal
from models import HCP, Interaction

# --- Database Tools ---

@tool
def log_interaction(hcp_name: str, interaction_type: str, notes: str, next_steps: str = "", sentiment: str = "Neutral") -> str:
    """Logs a new interaction with an HCP.
    Args:
        hcp_name: Name of the HCP.
        interaction_type: Type of interaction (e.g., Call, Visit, Email).
        notes: Detailed notes about the interaction.
        next_steps: Actionable next steps.
        sentiment: Sentiment of the interaction (Positive, Neutral, Negative).
    """
    db = SessionLocal()
    try:
        # Find HCP
        hcp = db.query(HCP).filter(HCP.name.ilike(f"%{hcp_name}%")).first()
        if not hcp:
            # Create HCP if not exists (Auto-create for demo)
            hcp = HCP(name=hcp_name, role="Doctor", hospital="Unknown", bio="Auto-created unique")
            db.add(hcp)
            db.commit()
            db.refresh(hcp)
        
        interaction = Interaction(
            hcp_id=hcp.id,
            type=interaction_type,
            notes=notes,
            next_steps=next_steps,
            sentiment=sentiment,
            date=datetime.datetime.utcnow()
        )
        db.add(interaction)
        db.commit()
        return f"Interaction logged successfully for {hcp.name} (ID: {interaction.id})."
    except Exception as e:
        return f"Error logging interaction: {str(e)}"
    finally:
        db.close()

@tool
def edit_interaction(interaction_id: int, new_notes: str = None, new_next_steps: str = None) -> str:
    """Edits an existing interaction log.
    Args:
        interaction_id: The ID of the interaction to edit.
        new_notes: New notes content (optional).
        new_next_steps: New next steps content (optional).
    """
    db = SessionLocal()
    try:
        interaction = db.query(Interaction).filter(Interaction.id == interaction_id).first()
        if not interaction:
            return "Interaction not found."
        
        if new_notes:
            interaction.notes = new_notes
        if new_next_steps:
            interaction.next_steps = new_next_steps
        
        db.commit()
        return f"Interaction {interaction_id} updated successfully."
    except Exception as e:
        return f"Error editing interaction: {str(e)}"
    finally:
        db.close()

@tool
def search_hcp_profile(name: str) -> str:
    """Searches for an HCP's profile and returns their details.
    Args:
        name: Name of the HCP to search for.
    """
    db = SessionLocal()
    try:
        hcp = db.query(HCP).filter(HCP.name.ilike(f"%{name}%")).first()
        if not hcp:
            return f"No HCP found with name '{name}'."
        return f"Name: {hcp.name}, Role: {hcp.role}, Hospital: {hcp.hospital}, Bio: {hcp.bio}"
    except Exception as e:
        return f"Error searching HCP: {str(e)}"
    finally:
        db.close()

@tool
def get_interaction_history(hcp_name: str) -> str:
    """Retrieves the interaction history for a specific HCP.
    Args:
        hcp_name: Name of the HCP.
    """
    db = SessionLocal()
    try:
        hcp = db.query(HCP).filter(HCP.name.ilike(f"%{hcp_name}%")).first()
        if not hcp:
            return f"No HCP found with name '{hcp_name}'."
        
        interactions = db.query(Interaction).filter(Interaction.hcp_id == hcp.id).order_by(Interaction.date.desc()).all()
        if not interactions:
            return f"No interactions found for {hcp.name}."
        
        history = []
        for i in interactions:
            history.append(f"[{i.date.strftime('%Y-%m-%d')}] {i.type}: {i.notes} (Next: {i.next_steps})")
        return "\n".join(history)
    except Exception as e:
        return f"Error getting history: {str(e)}"
    finally:
        db.close()

@tool
def schedule_follow_up(hcp_name: str, date: str, purpose: str) -> str:
    """Schedules a follow-up meeting/call.
    Args:
        hcp_name: Name of the HCP.
        date: Date string (e.g., '2025-01-15').
        purpose: Purpose of the follow-up.
    """
    # In a real app, this would integrate with a calendar API
    return f"Follow-up scheduled with {hcp_name} on {date} for '{purpose}'."

# --- Agent Setup ---

tools = [log_interaction, edit_interaction, search_hcp_profile, get_interaction_history, schedule_follow_up]

class AgentState(TypedDict):
    messages: Annotated[List[BaseMessage], "The messages in the conversation"]

def create_agent():
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable not set")
    
    # Using gemma2-9b-it as requested
    llm = ChatGroq(temperature=0, model_name="gemma2-9b-it", groq_api_key=api_key)
    
    # Bind tools
    llm_with_tools = llm.bind_tools(tools)

    def chatbot(state: AgentState):
        return {"messages": [llm_with_tools.invoke(state["messages"])]}

    graph_builder = StateGraph(AgentState)
    graph_builder.add_node("chatbot", chatbot)
    
    tool_node = ToolNode(tools=tools)
    graph_builder.add_node("tools", tool_node)

    graph_builder.add_conditional_edges(
        "chatbot",
        lambda state: "tools" if state["messages"][-1].tool_calls else END,
    )
    graph_builder.add_edge("tools", "chatbot")
    
    graph_builder.set_entry_point("chatbot")
    return graph_builder.compile()

# Initialize variable for import
agent_executor = None

class MockAgent:
    def invoke(self, input_data):
        message = input_data["messages"][-1]
        # Handle both dict and object (LangChain message)
        if isinstance(message, dict):
            content = message.get("content", "").lower()
        else:
            content = getattr(message, "content", "").lower()
        
        # Simple rule-based responses for the demo video
        if "hello" in content or "hi" in content:
            response = "Hello! I am your AI assistant. How can I help you log an interaction today?"
        elif "log" in content or "interaction" in content or "met" in content:
            response = "I have logged that interaction for you. Is there anything else you'd like to add?"
            # In a real mock, we might actually call the tool function directly here if we wanted side effects,
            # but for the video UI, text response is enough.
        else:
            response = "That sounds interesting. I've noted it down. Do you need to schedule a follow-up?"
            
        return {"messages": [AIMessage(content=response)]}

try:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key or "random" in api_key:
        print("Using MOCK AGENT (Demo Mode) because valid GROQ_API_KEY is missing.")
        agent_executor = MockAgent()
    else:
        agent_executor = create_agent()
except Exception as e:
    print(f"Agent creation deferred: {e}")
    print("Falling back to MOCK AGENT.")
    agent_executor = MockAgent()

