// import dependencies
import PostsDAO from "../dao/postsDAO.js";

// manages connection between request and response
export default class PostsController {
    //Method for POST request
    static async apiPostPost(req, res, next) {
        try {
            //retrieve data
            const data = {
                parent_id: req.body.parent_id,
                user_id: req.body.user_id,
                title: req.body.title,
                body: req.body.body,
                likes: req.body.likes,
                tags: req.body.tags,
            };

            //send info to addReview method
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

            // extract reviewID and review
            const Response = await PostsDAO.updatePost(data);

            // author not found
            var { error } = Response;
            if (error) {
                res.status.json({ error });
            }
            if (Response.modifiedCount === 0) {
                throw new Error("Unable to update review. User may not be original poster");
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
            const Response = await PostsDAO.deleteReview(data);
            res.json(Response);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}
