/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
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

// add a route to handle /posts HTTP requests
router.route("/posts").get(PostsController.apiGetUserPosts).post(PostsController.apiPostPost).put(PostsController.apiUpdatePost).delete(PostsController.apiDeletePost);
//router.route("/posts").put(PostsController.apiLikePost);

router.route("/login").get(UsersController.apiGetUsers);

// add a route to handle /id:/id HTTP requests
router.route("/id/:id").get(UsersController.apiGetUserById);
// export for other scripts to use
export default router;
