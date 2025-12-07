from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
import mysql.connector

# Database Configuration
DB_USER = "root"
# DB_PASS = "Diva@2004" # Keep your password, just ensure it is correct
DB_PASS = "Diva@2004"
DB_HOST = "127.0.0.1"
DB_PORT = "3306"
DB_NAME = "hcp_crm"

from urllib.parse import quote_plus

DATABASE_URL = f"mysql+mysqlconnector://{DB_USER}:{quote_plus(DB_PASS)}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Create Database if it doesn't exist
def create_database():
    try:
        conn = mysql.connector.connect(
            host=DB_HOST,
            user=DB_USER,
            password=DB_PASS
        )
        cursor = conn.cursor()
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
        conn.close()
        print(f"Database {DB_NAME} checked/created.")
    except Exception as e:
        print(f"Error creating database: {e}")

create_database()

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class Base(DeclarativeBase):
    pass

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
