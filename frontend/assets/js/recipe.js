document.addEventListener("DOMContentLoaded", async function () {
    const recipeContainer = document.getElementById("recipe-container");
    const category = localStorage.getItem("selectedCategory");

    if (!category) {
        recipeContainer.innerHTML = "<p>Error: No category selected!</p>";
        return;
    }

    try {
        // Fetch recipes dynamically from the backend
        const response = await fetch(`/recipes?category=${category}`);
        const data = await response.json();

        if (!data || data.length === 0) {
            recipeContainer.innerHTML = "<p>No recipes found for this category.</p>";
            return;
        }

        // Create recipe buttons
        data.forEach(recipe => {
            const button = document.createElement("button");
            button.textContent = recipe;
            button.className = "recipe-btn";
            button.onclick = () => selectRecipe(recipe);
            recipeContainer.appendChild(button);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        recipeContainer.innerHTML = "<p>Failed to load recipes. Please try again later.</p>";
    }
});

// Store selected recipe and go to details page
function selectRecipe(recipe) {
    localStorage.setItem("selectedRecipe", recipe);
    window.location.href = "recipe-details.html"; // Redirect to recipe details page
}
