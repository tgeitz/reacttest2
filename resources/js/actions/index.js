import axios from 'axios';

const ROOT_URL = 'http://reacttest2.test';
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

export function handleLogin(values) {
    return (dispatch) => {
        return dispatch(loginUser(values)
        ).then(() => 
        // reload app for authentication to go through
        window.location.href = `${ROOT_URL}/posts`
        );
    }
}

export function loginUser(values) {
    const request = axios.post(`${ROOT_URL}/login`, values);

    return {
        type: 'login_user',
        payload: request
    }
}

export function logoutUser() {
    const request = axios.post(`${ROOT_URL}/logout`);
    return {
        type: 'logout_user',
        payload: request
    }
}

// ============================================================
// Posts
// ============================================================

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