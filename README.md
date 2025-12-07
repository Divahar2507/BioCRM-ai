# AI-First CRM HCP Module (Round 1 Assignment)

## Overview
This project is a conceptual implementation of an AI-first Customer Relationship Management (CRM) system for Healthcare Professionals (HCPs). It features a "Log Interaction Screen" that allows Field Representatives to log interactions either via a conversational AI interface or a structured form.

## Tech Stack
- **Frontend**: React (Vite), Redux Toolkit, React Router, Lucide Icons, Glassmorphism UI (CSS).
- **Backend**: Python FastAPI, SQLAlchemy, MySQL/MariaDB.
- **AI/LLM**: LangGraph for agent orchestration, LangChain, Groq API (`gemma2-9b-it`).
- **Database**: MySQL (Auto-configured via SQLAlchemy).

## Architecture
The system consists of a decoupled frontend and backend:
1.  **Frontend**: A modern, responsive SPA that communicates with the backend via REST APIs. It handles state using Redux.
2.  **Backend**: Exposes endpoints for managing HCPs and Interactions. It hosts the LangGraph agent which processes natural language input to perform actions like logging interaction details automatically.
3.  **AI Agent**: The LangGraph agent utilizes tools to:
    -   `log_interaction`: Parse and save interaction details.
    -   `edit_interaction`: Update existing logs.
    -   `search_hcp_profile`: Retrieve HCP info.
    -   `get_interaction_history`: Summarize past interactions.
    -   `schedule_follow_up`: Mock scheduling functionality.

## Setup & Running

### Prerequisites
- Node.js & npm
- Python 3.8+
- MySQL Server (running locally)
- Groq API Key (for AI features)

### Backend Setup
1.  Navigate to `backend`:
    ```bash
    cd backend
    ```
2.  Create and activate virtual environment:
    ```bash
    python -m venv venv
    # Windows
    venv\Scripts\activate
    # Mac/Linux
    source venv/bin/activate
    ```
3.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
4.  Configure Environment:
    -   Open `.env` (or rename `.env.example` if applicable)
    -   Add your Groq API Key: `GROQ_API_KEY=your_key_here`
    -   Ensure Database credentials in `database.py` match your local MySQL setup (Default: `root` / `Diva@2004`).
5.  Run Server:
    ```bash
    uvicorn main:app --reload
    ```
    Backend will run at http://localhost:8000.

### Frontend Setup
1.  Navigate to `frontend`:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run Development Server:
    ```bash
    npm run dev
    ```
    Frontend will run at http://localhost:5173.

## Usage
1.  Open the Frontend URL.
2.  Navigate to **Interactions** via the sidebar.
3.  **Conversational AI**: Type a message like "I visited Dr. Smith today to discuss the new cardiology study. He was positive about it." and send.
    -   The agent will process this and call the `log_interaction` tool to save it to the database.
4.  **Structured Form**: Switch tabs to manually enter the details.

## Deliverables
- [x] Frontend (React + Redux)
- [x] Backend (FastAPI + LangGraph)
- [x] Database Integration (MySQL)
- [x] AI Tools Implementation
