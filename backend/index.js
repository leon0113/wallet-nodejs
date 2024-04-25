const express = require("express");
const mongoose = require("mongoose");
const app = express();


async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://skleon667:x9lKI4RFoTowpIgG@cluster0.2h8o89m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
}
connectToDatabase();

app.listen(5000, () => {
    console.log("app running at port 5000");
})
