import os
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

IMAGGA_API_KEY = os.getenv("IMAGGA_API_KEY")
IMAGGA_API_SECRET = os.getenv("IMAGGA_API_SECRET")

# Example database URL (MongoDB/Firebase)
DATABASE_URL = os.getenv("DATABASE_URL")
