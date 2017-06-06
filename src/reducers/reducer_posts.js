import _ from 'lodash';
import {FETCH_POSTS, FETCH_POST, DELETE_POST} from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    // Delete the post in local memory as well and get a snappier UI
    case DELETE_POST:
      // Look at the state object, if the state object has a key of the post id, then just omit/drop it
      // and return a new object without that id.
      return _.omit(state, action.payload);
    // Make sure the post we want to show is actually contained in state.
    // If you went to the posts/:id route directly, by typing the url in the browser,
    // and skipped going to the index route, there would not be any posts in state,
    // because posts are only fetched in the PostsIndex component.
    case FETCH_POST:
      // Don't throw away all the data fetched over time, rather add to existing app level state
      // Then, use key interpolation to make a new key/value pair of the id/post on this object
      return {...state, [action.payload.data.id]: action.payload.data};
    case FETCH_POSTS:
      // Return posts array from API as an object instead using lodash method
      // with the key name for every post being the id value
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
