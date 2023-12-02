/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import PostsDAO from "../dao/postsDAO.js";

// manages connection between request and response
export default class PostsController {
    // Method for GET request
    static async apiGetUserPosts(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // define filter
        let filters = {};
        if (req.query.user_id) filters.user_id = req.query.user_id;
        if (req.query.parent_id) filters.parent_id = req.query.parent_id;

        // recover data
        const { usersList, totalNumUsers } = await PostsDAO.getPosts({
            filters,
            page,
            usersPerPage,
        });

        // create json response
        let response = {
            users: usersList,
            page: page,
            filters: filters,
            entries_per_page: usersPerPage,
            total_results: totalNumUsers,
        };
        res.json(response);
    }

    //Method for POST request
    static async apiPostPost(req, res, next) {
        try {
            //retrieve data
            const data = {
                parent_id: req.body.parent_id,
                user_id: req.body.user_id,
                username: req.body.username,
                title: req.body.title,
                body: req.body.body,
                likes: req.body.likes,
                tags: req.body.tags,
                lastModified: req.body.lastModified,
            };

            //send info to addPost method
            const PostResponse = await PostsDAO.addPost(data);
            //return success/failure
            res.json(PostResponse);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method for Update request
    static async apiUpdatePost(req, res, next) {
        try {
            // retrieve data
            const data = {
                post_id: req.body.post_id,
                parent_id: req.body.parent_id,
                user_id: req.body.user_id,
                title: req.body.title,
                body: req.body.body,
                likes: req.body.likes,
                tags: req.body.tags,
            };

            // extract data
            const Response = await PostsDAO.updatePost(data);

            // author not found
            var { error } = Response;
            if (error) {
                res.status.json({ error });
            }
            if (Response.modifiedCount === 0) {
                throw new Error("Unable to update post. User may not be original poster.");
            }
            res.json(Response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    // Method for Delete request
    static async apiDeletePost(req, res, next) {
        try {
            const data = {
                post_id: req.body.post_id,
                user_id: req.body.user_id,
            };

            // delete
            const Response = await PostsDAO.deletePost(data);
            res.json(Response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
