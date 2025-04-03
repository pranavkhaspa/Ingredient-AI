from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ingredient

from app.routes import ingredient, recipe  # ⬅️ include recipe here

# Existing FastAPI app setup...

# Include routers


app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (change this in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Include routes
app.include_router(ingredient.router)

app.include_router(recipe.router)  # ⬅️ add this line

@app.get("/")
def home():
    return {"message": "API is running!"}
