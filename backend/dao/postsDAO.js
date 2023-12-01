/*
    Michael Peluso
    11/17/23
    IT 302 001
    Unit 9 Assignment
    mp272@njit.edu
*/

// import dependencies
import mongodb from "mongodb";

const ObjectId = mongodb.ObjectId;
let posts;

export default class PostsDAO {
    //
    // make db connection
    static async injectDB(conn) {
        if (posts) {
            return;
        }

        // access db collection if posts not set
        try {
            posts = await conn.db(process.env.DB_NAME).collection("posts");
        } catch (e) {
            console.error(`Unable to establish connection handle in postDAO: ${e}`);
        }
    }

    // add post
    static async addPost(data) {
        try {
            // create a json doc
            const postDoc = {
                // convert strings to id objects
                parent_id: new ObjectId(data.parent_id) ? data.parent_id : null, // null if no parent exists
                user_id: new ObjectId(data.user_id),
                title: data.title,
                body: data.body,
                likes: data.likes,
                tags: data.tags,
                lastModified: new Date(),
            };

            // insert into mongodb
            return await posts.insertOne(postDoc);
        } catch (e) {
            console.error(`unable to make post: ${e}`);
            console.error(e);
            return { error: e };
        }
    }

    // update post
    static async updatePost(data) {
        try {
            // create json doc
            const updateResponse = await posts.updateOne(
                {
                    // filter condition
                    user_id: new ObjectId(data.user_id),
                },
                {
                    // result
                    $set: {
                        title: data.title,
                        body: data.body,
                        likes: data.likes,
                        tags: data.tags,
                    },
                    $currentDate: { lastModified: true },
                }
            );

            // insert into mongodb
            return updateResponse;
        } catch (e) {
            console.error(`unable to update post: ${e}`);
            console.error(e);
            return { error: e };
        }
    }

    // delete post
    static async deletePost(data) {
        try {
            // insert into mongodb
            const deleteResponse = await posts.deleteOne({
                _id: new ObjectId(data.post_id), // _id document id
                user_id: new ObjectId(data.user_id),
            });
            return deleteResponse;
        } catch (e) {
            console.error(`unable to delete post: ${e}`);
            console.error(e);
            return { error: e.message };
        }
    }
}
