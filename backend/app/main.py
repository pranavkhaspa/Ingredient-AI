from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import ingredient

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

@app.get("/")
def home():
    return {"message": "API is running!"}
