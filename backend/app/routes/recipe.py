from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from pymongo import MongoClient
import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()  # Load API Keys

router = APIRouter()

# 📦 MongoDB Setup
client = MongoClient("mongodb://localhost:27017/")
db = client["recipe_db"]
collection = db["recipes"]

# 🤖 Gemini AI Setup
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# 📌 1️⃣ Fetch Categories
@router.get("/categories")
def get_categories():
    categories = ["Gym", "Diet", "Weight Loss", "Bulk", "Cheat Meal", "Taste"]
    return {"categories": categories}

# 📌 2️⃣ Fetch Recipes Based on Category (case-insensitive)
@router.get("/recipes/{category}")
def get_recipes(category: str):
    recipes = collection.find(
        {"category": {"$regex": f"^{category}$", "$options": "i"}},
        {"_id": 0, "name": 1}
    )
    return {"recipes": [recipe["name"] for recipe in recipes]}

# 📌 3️⃣ Fetch Recipe Details & Ingredients (case-insensitive)
@router.get("/recipe/{recipe_name}")
def get_recipe_details(recipe_name: str):
    recipe = collection.find_one(
        {"name": {"$regex": f"^{recipe_name}$", "$options": "i"}},
        {"_id": 0}
    )
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

# ✅ 5️⃣ Match Recipes by Category + Ingredients
class RecipeRequest(BaseModel):
    category: str
    ingredients: List[str]

@router.post("/recipes/match")
def match_recipes(request: RecipeRequest):
    matched = []
    
    requested_ingredients = [i.lower() for i in request.ingredients]

    all_recipes = collection.find(
        {"category": {"$regex": f"^{request.category}$", "$options": "i"}},
        {"_id": 0}
    )

    for recipe in all_recipes:
        recipe_ingredients = [i.lower() for i in recipe.get("ingredients", [])]

        if any(ing in recipe_ingredients for ing in requested_ingredients):
            matched.append({
                "name": recipe["name"],
                "description": recipe.get("description", "No description"),
                "ingredients": recipe_ingredients
            })

    return {"recipes": matched}
