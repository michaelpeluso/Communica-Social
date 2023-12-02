/*
    Michael Peluso
    12/2/23
    IT 302 001
    Unit 12 Assignment
    mp272@njit.edu
*/

// import dependencies
import axios from "axios";

// send requests to backend
class UserDataService {
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users?page=${page}`);
    }

    getUser(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/id/${id}`);
    }

    getUserPosts(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/id/${id}`);
    }

    getAllPosts() {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/posts/`);
    }

    find(query = { fname: "" }) {
        const queryString = Object.entries(query)
            .map(([key, value]) => `${key}=${value}`)
            .join("&");
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users?${queryString}`);
    }

    createPost(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/posts`, data);
    }

    updatePost(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/posts`, data);
    }

    deletePost(id, userId) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/mp272/users/posts`, { data: { post_id: id, user_id: userId } });
    }
}
export default new UserDataService();
