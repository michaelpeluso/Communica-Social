/*
    Michael Peluso
    11/17/23
    IT 302 001
    Unit 9 Assignment
    mp272@njit.edu
*/

// import dependencies
import express from "express";
import UsersController from "./users.controller.js";
import PostsController from "./posts.controller.js";

// create router object
const router = express.Router();

// request to view movies
router.route("/").get(UsersController.apiGetUsers);

// add a route to handle /id:/id HTTP requests
router.route("/id/:id").get(UsersController.apiGetUserById);

// add a route to handle /posts HTTP requests
router.route("/posts").post(PostsController.apiPostPost).put(PostsController.apiUpdatePost).delete(PostsController.apiDeletePost);
//router.route("/posts").put(PostsController.apiLikePost);

// export for other scripts to use
export default router;
