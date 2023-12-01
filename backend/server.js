/*
    Michael Peluso
    11/17/23
    IT 302 001
    Unit 9 Assignment
    mp272@njit.edu
*/

// import dependencies
import express from "express";
import cors from "cors";
import users from "./api/users.route.js";

// initialize global variables
const app = express();
const port = 5000;

// app.use()
app.use(express.json());
app.use(cors());

app.use("/api/v1/mp272/users", users);
app.use("*", (req, res) => {
    res.status(404).json({ error: "not found" });
});

// root route
app.get("/", (req, res) => {
    res.json("Connection made to root directory.");
});

// api access route
app.get("/api/v1/mp272/users", (req, res) => {
    res.json("Accessed API.");
});

export default app;
