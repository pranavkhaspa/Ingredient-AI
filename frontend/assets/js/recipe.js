// assets/js/recipe.js
document.addEventListener("DOMContentLoaded", function () {
    const recipeContainer = document.getElementById("recipe-container");
    const category = localStorage.getItem("selectedCategory");

    if (!category) {
        recipeContainer.innerHTML = "<p>Error: No category selected!</p>";
        return;
    }

    // Sample recipe data
    const recipes = {
        gym: ["Protein Smoothie", "Grilled Chicken", "Oatmeal Pancakes"],
        protein: ["Egg Whites Omelet", "Peanut Butter Shake", "Tuna Salad"],
        dieting: ["Keto Salad", "Quinoa Bowl", "Avocado Toast"],
        general_health: ["Fruit Salad", "Detox Drink", "Vegetable Soup"]
    };

    if (!recipes[category]) {
        recipeContainer.innerHTML = "<p>No recipes found for this category.</p>";
        return;
    }

    // Create recipe buttons
    recipes[category].forEach(recipe => {
        const button = document.createElement("button");
        button.textContent = recipe;
        button.className = "recipe-btn";
        button.onclick = () => selectRecipe(recipe);
        recipeContainer.appendChild(button);
    });
});

// Store selected recipe and go to details page
function selectRecipe(recipe) {
    localStorage.setItem("selectedRecipe", recipe);
    window.location.href = "recipe-details.html"; // Redirect to recipe details page
}
