from fastapi import APIRouter, UploadFile, File, HTTPException
import requests
import os
from dotenv import load_dotenv

# Load API keys from .env
load_dotenv()
IMAGGA_API_KEY = os.getenv("IMAGGA_API_KEY")
IMAGGA_API_SECRET = os.getenv("IMAGGA_API_SECRET")

router = APIRouter(prefix="/api", tags=["Ingredients"])

# Imagga API Endpoint
IMAGGA_URL = "https://api.imagga.com/v2/tags"

@router.post("/classify-ingredients/")
async def classify_ingredients(file: UploadFile = File(...)):
    """
    Uploads an image and returns detected ingredients.
    """
    try:
        # Read image bytes
        image_bytes = await file.read()
        
        # Send image to Imagga API
        response = requests.post(
            IMAGGA_URL,
            auth=(IMAGGA_API_KEY, IMAGGA_API_SECRET),
            files={"image": (file.filename, image_bytes)}
        )

        # Handle response
        if response.status_code == 200:
            tags = response.json().get("result", {}).get("tags", [])
            ingredients = [{"name": tag["tag"]["en"], "confidence": tag["confidence"]} for tag in tags]
            return {"ingredients": ingredients}
        else:
            raise HTTPException(status_code=response.status_code, detail=response.json())

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
