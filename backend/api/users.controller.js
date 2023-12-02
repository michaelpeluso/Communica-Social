/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import PostsDAO from "../dao/postsDAO.js";
import UsersDAO from "../dao/usersDAO.js";

// methods to get, post, put, and delete database collection
export default class UsersController {
    // get filtered users
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // define filter
        let filters = {};
        if (req.query.user_id) filters.user_id = req.query.user_id;
        if (req.query.uname) filters.uname = req.query.uname;
        if (req.query.fname) filters.fname = req.query.fname;
        if (req.query.lname) filters.lname = req.query.lname;
        if (req.query.username) filters.username = req.query.username;
        if (req.query.age) filters.age = req.query.age;
        if (req.query.city) filters.city = req.query.city;
        if (req.query.state) filters.state = req.query.state;
        if (req.query.gender) filters.gender = req.query.gender;

        // recover data
        const { usersList, totalNumUsers } = await UsersDAO.getUsers({
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

    // Passes id parameter to getUserById()
    static async apiGetUserById(req, res, next) {
        try {
            let id = req.params.id || {};
            let user = await UsersDAO.getUserById(id);
            if (!user) {
                res.status(404).json({ error: "user id not found" });
                return;
            }
            res.json(user);
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}
