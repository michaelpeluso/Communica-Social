/*
    Michael Peluso
    11/3/23
    IT 302 001
    Unit 7 Assignment
    mp272@njit.edu
*/

// import dependencies
import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersDAO from "./dao/usersDAO.js";
import PostsDAO from "./dao/postsDAO.js";

// calls to connect to API
async function main() {
    // configure access env variables
    dotenv.config();
    const client = new mongodb.MongoClient(process.env.CONN_STR);
    const port = process.env.PORT || 5000;

    // establish connection
    try {
        await client.connect();
        await UsersDAO.injectDB(client);
        await PostsDAO.injectDB(client);

        app.listen(port, () => {
            console.log("Server running on port", port);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

// run function
main().catch(console.error);
