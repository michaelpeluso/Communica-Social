/*
    Michael Peluso
    11/3/23
    IT 302 001
    Unit 7 Assignment
    mp272@njit.edu
*/

// import dependencies
import express from "express";
import usersController from "./users.controller.js";

// create router object
const router = express.Router();

// request to view movies
router.route("/").get(usersController.apiGetUsers);

// export for other scripts to use
export default router;
