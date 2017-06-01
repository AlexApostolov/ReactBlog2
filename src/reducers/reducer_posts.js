import _ from 'lodash';
import {FETCH_POSTS} from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POSTS:
      // Return posts array from API as an object instead using lodash method
      // with the key name for every post being the id value
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
