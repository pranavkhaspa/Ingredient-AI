// assets/js/recipe-details.js
document.addEventListener("DOMContentLoaded", function () {
    const recipeTitle = document.getElementById("recipe-title");
    const ingredientsList = document.getElementById("ingredients-list");
    const instructions = document.getElementById("instructions");

    const recipe = localStorage.getItem("selectedRecipe");

    if (!recipe) {
        recipeTitle.textContent = "Error: No recipe selected!";
        return;
    }

    // Sample recipe data
    const recipeDetails = {
        "Protein Smoothie": {
            ingredients: ["1 Banana", "1 scoop Protein Powder", "1 cup Almond Milk", "1 tbsp Peanut Butter"],
            instructions: "Blend all ingredients together until smooth. Serve chilled."
        },
        "Grilled Chicken": {
            ingredients: ["2 Chicken Breasts", "1 tbsp Olive Oil", "1 tsp Salt", "1 tsp Pepper"],
            instructions: "Marinate chicken with oil, salt, and pepper. Grill for 6-8 minutes per side."
        },
        "Oatmeal Pancakes": {
            ingredients: ["1 cup Oats", "1 Egg", "1/2 cup Milk", "1 tsp Honey"],
            instructions: "Mix all ingredients and cook on a pan until golden brown on both sides."
        },
        "Egg Whites Omelet": {
            ingredients: ["3 Egg Whites", "1/2 cup Spinach", "1/4 cup Cheese"],
            instructions: "Beat egg whites, pour into a pan, and cook with spinach and cheese."
        },
        "Peanut Butter Shake": {
            ingredients: ["1 cup Milk", "2 tbsp Peanut Butter", "1 Banana"],
            instructions: "Blend all ingredients until smooth. Serve cold."
        }
    };

    if (!recipeDetails[recipe]) {
        recipeTitle.textContent = "Recipe not found!";
        return;
    }

    // Display recipe details
    recipeTitle.textContent = recipe;
    recipeDetails[recipe].ingredients.forEach(ingredient => {
        const li = document.createElement("li");
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });
    instructions.textContent = recipeDetails[recipe].instructions;
});

// Function to go back to recipe selection
function goBack() {
    window.location.href = "select-recipe.html";
}
