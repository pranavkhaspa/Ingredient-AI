// assets/js/category.js
function selectCategory(category) {
    localStorage.setItem('selectedCategory', category); // Store category
    window.location.href = 'select-recipe.html'; // Redirect to recipe selection page
}

// Function to retrieve and display selected category on category-details.html
function displaySelectedCategory() {
    const category = localStorage.getItem("selectedCategory");
    
    if (category) {
        document.getElementById("category-name").textContent = formatCategoryName(category);
    } else {
        document.getElementById("category-name").textContent = "No category selected!";
    }
}

// Helper function to format category name (replace underscores with spaces)
function formatCategoryName(name) {
    return name.replace(/_/g, " ").toUpperCase();
}

// Run display function only if on category-details.html
if (document.getElementById("category-name")) {
    displaySelectedCategory();
}
