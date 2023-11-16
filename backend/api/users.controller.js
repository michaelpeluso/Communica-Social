/*
    Michael Peluso
    11/3/23
    IT 302 001
    Unit 7 Assignment
    mp272@njit.edu
*/

// import dependencies
import usersDAO from "../dao/usersDAO.js";

// methods to get, post, put, and delete database collection
export default class UsersController {
    // get filtered users
    static async apiGetUsers(req, res, next) {
        const usersPerPage = req.query.usersPerPage ? parseInt(req.query.usersPerPage) : 20;
        const page = req.query.page ? parseInt(req.query.page) : 0;

        // define filter
        let filters = {};
        /* if (req.query.age) {
            filters.age = req.query.age;
        } else if (req.query.state) {
            filters.state = req.query.state;
        } else */
        if (req.query.gender) {
            filters.gender = req.query.gender;
        }

        // recover data
        const { usersList, totalNumUsers } = await usersDAO.getUsers({
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
}
