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
            // window.location.href = `${ROOT_URL}/posts`
            console.log('asdf')
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
    }
}

export function getCurrentUserData() {
    return (dispatch, getState) => {
        if (!getState().auth.isAuthenticated) {
            return dispatch({ type: 'logout_user' })
        }

        axios.get(`${ROOT_URL}/user`)
            .then((response) => {
                console.log(response);
                console.log('gcud response above');
                return dispatch({ type: 'set_current_user', payload: response })
            })
            .catch(error => {
                console.log('logging user out');
                console.log(error)
                return dispatch({ type: 'logout_user' })
            });
    }
}

// ============================================================
// Posts
// ============================================================

export function fetchPosts() {
    // const request = axios.get(`${ROOT_API_URL}/posts${API_KEY}`);
    console.log('fetch posts action');

    return (dispatch) => {
        dispatch(getCurrentUserData());
        axios.get(`${ROOT_API_URL}/posts${API_KEY}`)
            .then(response => {
                console.log(response);
                console.log('fetchposts request above');
                return dispatch({
                    type: 'fetch_posts',
                    payload: response
                });
            });
    }

    // return {
    //     type: 'fetch_posts',
    //     payload: request
    // }
}

export function createPost(values) {
    const request = axios.post(`${ROOT_API_URL}/posts${API_KEY}`, values);
    return {
        type: 'create_post',
        payload: request
    }
}