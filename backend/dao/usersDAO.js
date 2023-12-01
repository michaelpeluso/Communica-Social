/*
    Michael Peluso
    11/17/23
    IT 302 001
    Unit 9 Assignment
    mp272@njit.edu
*/

import { ObjectId } from "mongodb";

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

    // request users
    static async getUsers({ filters = null, page = 0, usersPerPage = 20 } = {}) {
        // filter data
        let query;
        if (filters) {
            if ("user_id" in filters) query = { ...query, _id: new ObjectId(filters["user_id"]) };
            if ("fname" in filters) query = { ...query, "name.first": { $regex: new RegExp(filters["fname"], "i") } };
            if ("lname" in filters) query = { ...query, "name.last": { $regex: new RegExp(filters["lname"], "i") } };
            if ("username" in filters) query = { ...query, "login.username": { $regex: new RegExp(filters["username"], "i") } };
            if ("age" in filters) query = { ...query, "dob.age": parseInt(filters["age"]) };
            if ("city" in filters) query = { ...query, "location.city": filters["city"] };
            if ("state" in filters) query = { ...query, "location.state": filters["state"] };
            if ("gender" in filters) query = { ...query, gender: filters["gender"] };
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

    // all posts by user
    static async getPostsByUser(user_id) {
        try {
            return await users.find({ _id: ObjectId(user_id) });
        } catch (e) {
            console.error(`something went wrong in getUserById: ${e}`);
            throw e;
        }
    }

    // get user by id
    static async getUserById(id) {
        try {
            return await users
                // join
                .aggregate([
                    {
                        $match: {
                            _id: new ObjectId(id),
                        },
                    },
                    {
                        $lookup: {
                            from: "posts",
                            localField: "_id",
                            foreignField: "user_id",
                            as: "posts",
                        },
                    },
                ])
                .next();
        } catch (e) {
            console.error(`something went wrong in getMovieById: ${e}`);
            throw e;
        }
    }
}
