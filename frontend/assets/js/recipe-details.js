// assets/js/recipe-details.js

document.addEventListener("DOMContentLoaded", async function () {
    const recipeTitle = document.getElementById("recipe-title");
    const ingredientsList = document.getElementById("ingredients-list");
    const instructions = document.getElementById("instructions");

    const recipe = localStorage.getItem("selectedRecipe");

    if (!recipe) {
        recipeTitle.textContent = "Error: No recipe selected!";
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/get_recipe_details/${encodeURIComponent(recipe)}`);
        if (!response.ok) {
            throw new Error("Recipe not found!");
        }

        const data = await response.json();

        // Display recipe details
        recipeTitle.textContent = data.name;
        ingredientsList.innerHTML = ""; // Clear previous content
        data.ingredients.forEach(ingredient => {
            const li = document.createElement("li");
            li.textContent = ingredient;
            ingredientsList.appendChild(li);
        });
        instructions.textContent = data.instructions;
    } catch (error) {
        recipeTitle.textContent = error.message;
    }
});

// Function to go back to recipe selection
function goBack() {
    window.location.href = "select-recipe.html";
}
