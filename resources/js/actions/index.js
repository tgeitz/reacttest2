import axios from 'axios';

const ROOT_API_URL = 'http://reacttest2.test/api';
const API_KEY = '?key=1234';

// ============================================================
// Auth
// ============================================================

export function registerUser(values) {
    const request = axios.post(`${ROOT_URL}/register`, values);
    return {
        type: 'register_user',
        payload: request
    }
}

export function fetchPosts() {
    const request = axios.get(`${ROOT_API_URL}/posts${API_KEY}`);
    return {
        type: 'fetch_posts',
        payload: request
    }
}

export function createPost(values) {
    const request = axios.post(`${ROOT_API_URL}/posts${API_KEY}`, values);
    return {
        type: 'create_post',
        payload: request
    }
}