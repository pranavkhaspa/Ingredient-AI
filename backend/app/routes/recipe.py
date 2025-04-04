from fastapi import APIRouter, HTTPException
from pymongo import MongoClient
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()  # Load API Keys

router = APIRouter()

# MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["recipe_db"]
collection = db["recipes"]

# Gemini AI Setup
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 📌 1️⃣ Fetch Categories
@router.get("/categories")
def get_categories():
    categories = ["Gym", "Diet", "Weight Loss", "Bulk", "Cheat Meal", "Taste"]
    return {"categories": categories}

# 📌 2️⃣ Fetch Recipes Based on Category
@router.get("/recipes/{category}")
def get_recipes(category: str):
    recipes = collection.find({"category": category}, {"_id": 0, "name": 1})
    return {"recipes": [recipe["name"] for recipe in recipes]}

# 📌 3️⃣ Fetch Recipe Details & Ingredients
@router.get("/recipe/{recipe_name}")
def get_recipe_details(recipe_name: str):
    recipe = collection.find_one({"name": recipe_name}, {"_id": 0})
    if not recipe:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

# 📌 4️⃣ Generate Recipe Instructions using Gemini
@router.get("/generate_recipe/{recipe_name}")
def generate_recipe(recipe_name: str):
    try:
        response = genai.generate_text(f"Give detailed instructions for making {recipe_name}")
        return {"instructions": response.text}
    except Exception as e:
        return {"error": str(e)}
