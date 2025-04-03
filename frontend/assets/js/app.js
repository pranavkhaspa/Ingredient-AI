async function classifyImage() {
    const fileInput = document.getElementById("imageUpload");
    if (!fileInput.files.length) {
        document.getElementById("status").innerText = "Please select an image first.";
        return;
    }

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);

    try {
        document.getElementById("status").innerText = "Analyzing...";
        const response = await fetch("http://127.0.0.1:8000/api/classify-ingredients/", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.ingredients && data.ingredients.length > 0) {
            document.getElementById("status").innerHTML = "Detected Ingredients:<br>" +
                data.ingredients.map(ing => `<li>${ing.name} (${(ing.confidence * 100).toFixed(2)}%)</li>`).join("");
        } else {
            document.getElementById("status").innerHTML = "<p>No ingredients found.</p>";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("status").innerText = "Failed to analyze the image.";
    }
}
