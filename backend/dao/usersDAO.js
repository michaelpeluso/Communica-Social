/*
    Michael Peluso
    11/3/23
    IT 302 001
    Unit 7 Assignment
    mp272@njit.edu
*/

// define variable for data
let users;

// recover users
export default class UsersDAO {
    // establish connection
    static async injectDB(conn) {
        if (users) {
            return;
        }
        try {
            users = await conn.db(process.env.DB_NAME).collection("randomUser_mp272");
        } catch (e) {
            console.error(`unable to connect in UsersDAO: ${e}`);
        }
    }

    // request data
    static async getUsers({ filters = null, page = 0, usersPerPage = 20 } = {}) {
        // filter data
        let query;
        if (filters) {
            /*if ("age" in filters) {
                query = { age: { $eq: filters["age"] } };
            } else if ("state" in filters) {
                query = { $text: { $search: filters["state"] } };
            } else */
            if ("gender" in filters) {
                query = { gender: { $eq: filters["gender"] } };
            }
        }

        // request
        let cursor;
        try {
            cursor = await users
                .find(query)
                .limit(usersPerPage)
                .skip(usersPerPage * page);
            const usersList = await cursor.toArray();
            const totalNumUsers = await users.countDocuments(query);
            return { usersList, totalNumUsers };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            console.error(e);
            return { usersList: [], totalNumUsers: 0 };
        }
    }
}
