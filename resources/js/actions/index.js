import axios from 'axios';

const ROOT_URL = 'http://reacttest2.test/api';
const API_KEY = '?key=1234';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
    return {
        type: 'fetch_posts',
        payload: request
    }
}