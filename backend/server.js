// import dependencies
import express from "express";
import dotenv from "dotenv";

// initialize global variables
const app = express();
const port = 5000;

// root route
app.get("/", (req, res) => {
    res.json("Connection made to root directory.");
});

// api access route
app.get("/api/v1/mp272/users", (req, res) => {
    res.json("Accessed API.");
});

// connect to server
app.listen(port, () => {
    console.log("Server running on port", port);
});
