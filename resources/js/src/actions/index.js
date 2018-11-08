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

export function loginUser(values) {
    const request = axios.post(`${ROOT_URL}/login`, values);

    return {
        type: 'login_user',
        payload: request
    }
}

export function logoutUser() {
    return (dispatch) => {
        axios.post(`${ROOT_URL}/logout`)
            .then((response) => {
                return dispatch({type: 'flush_user'});
            });
    }
}

export function getCurrentUserData() {
    return (dispatch, getState) => {
        if (!getState().auth.isAuthenticated && getState().auth.hasBeenChecked) {
            return dispatch({ type: 'flush_user' })
        }

        axios.get(`${ROOT_URL}/user`)
            .then((response) => {
                return dispatch({ type: 'set_current_user', payload: response })
            })
            .catch(error => {
                return dispatch({ type: 'flush_user' })
            });
    }
}

// ============================================================
// Posts
// ============================================================

export function fetchPosts() {
    return (dispatch) => {
        axios.get(`${ROOT_API_URL}/posts${API_KEY}`)
            .then(response => {
                return dispatch({
                    type: 'fetch_posts',
                    payload: response
                });
            });
    }
}

export function createPost(values) {
    const request = axios.post(`${ROOT_API_URL}/posts${API_KEY}`, values);
    return {
        type: 'create_post',
        payload: request
    }
}