import axios from "axios";

class UserDataService {
    getAll(page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users?page=${page}`);
    }

    get(id) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/id/${id}`);
    }

    find(query, by = "title", page = 0) {
        return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users?${by}=${query}&page=${page}`);
    }

    createPost(data) {
        return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/post`, data);
    }

    updatePost(data) {
        return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/post`, data);
    }

    deletePost(id, userId) {
        return axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/post`, { data: { post_id: id, user_id: userId } });
    }
}
export default new UserDataService();
