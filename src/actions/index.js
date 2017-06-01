import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=GIRLYFEET';

export function fetchPosts() {
  // Use axios to make a GET request at a particular URL
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    // Finally, assign the request to the "payload" property:
    // "payload" property is automatically resolved by the redux-promise library
    // whenver it sees this action come across
    payload: request
  };
}
