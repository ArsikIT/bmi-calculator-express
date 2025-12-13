const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;


app.use(express.urlencoded({ extended: true })); // Middleware to parse html form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' file

// POST
app.post("/calculate-bmi", (req, res) => {
    const weight = parseFloat(req.body.weight);
    const height = parseFloat(req.body.height);

    if (weight <=0 || height <= 0 || isNaN(weight) || isNaN(height)) {
        return res.send(`
            <h2>Error</h2>
            <p>Please enter valid positive numbers.</p>
            <a href="/">Go back</a>
    `)

    }

// BMI Calculation

    const bmi = weight / (height * height);
    const bmiValue = bmi.toFixed(2);


    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "blue";
    } else if (bmi < 24.9) {
        category = "Normal weight";
        color = "green";
    } else if (bmi < 29.9) {
        category = "Overweight";
        color = "orange";
    } else {
        category = "Obese";
        color = "red";
    }

    // Response

    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>BMI Result</title>
        <link rel="stylesheet" href="/css/style.css">
        </head>
        <body>
            <div class="container result-box" style="border-left: 5px solid ${color};">
            <h1>BMI Result</h1>

            <p>Your BMI: <strong>${bmiValue}</strong></p>

            <p class="category-result">
                Category:
                <span style="color:${color}; font-weight:bold;">
                    ${category}
                </span>
            </p>

        <a href="/" class="btn-back">Calculate again</a>
            </div>
        </body>
    </html>
  `);
});

//Server start
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
