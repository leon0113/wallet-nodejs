const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());


//database connection
async function connectToDatabase() {
    try {
        await mongoose.connect("mongodb+srv://skleon667:x9lKI4RFoTowpIgG@cluster0.2h8o89m.mongodb.net/paytm?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected");
    } catch (err) {
        console.error("Error connecting to database:", err);
    }
}
connectToDatabase();

//routes
app.use("/api/v1", router)



app.listen(5000, () => {
    console.log("app running at port 5000");
})
