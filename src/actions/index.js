import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

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

// The "values" argument is the actual blog post fields and is passed also with the request
// then the posts-new onSubmit callback
export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());

  return {
    type: CREATE_POST,
    payload: request
  };
}

// When a user visits a post with a direct link
export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  return {
    type: DELETE_POST,
    payload: id
  };
}
