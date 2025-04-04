document.addEventListener("DOMContentLoaded", async () => {
    const categoryDropdown = document.getElementById("category-selector");
    const categoryList = document.getElementById("category-list");

    try {
        // Fetch categories from the backend
        const response = await fetch("http://127.0.0.1:8000/categories");
        const data = await response.json();
        
        if (!data.categories || data.categories.length === 0) {
            throw new Error("No categories found");
        }

        // Populate dropdown menu (if applicable)
        if (categoryDropdown) {
            data.categories.forEach(category => {
                let option = document.createElement("option");
                option.value = category;
                option.textContent = formatCategoryName(category);
                categoryDropdown.appendChild(option);
            });

            categoryDropdown.addEventListener("change", (event) => {
                selectCategory(event.target.value);
            });
        }

        // Populate category list (if applicable)
        if (categoryList) {
            data.categories.forEach(category => {
                let li = document.createElement("li");
                li.textContent = formatCategoryName(category);
                li.addEventListener("click", () => selectCategory(category));
                categoryList.appendChild(li);
            });
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
});

function selectCategory(category) {
    localStorage.setItem("selectedCategory", category);
    window.location.href = "select-recipe.html"; // Redirect to recipe selection page
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

// Helper function to format category name (replace underscores with spaces and capitalize)
function formatCategoryName(name) {
    return name.replace(/_/g, " ").toUpperCase();
}

// Run display function only if on category-details.html
if (document.getElementById("category-name")) {
    displaySelectedCategory();
}