import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import PostsReducer from './reducer_posts';

const rootReducer = combineReducers({
  posts: PostsReducer,
  // Must be saved as "form" piece of state for all the different forms inside of components (they assume this is the name)
  form: formReducer
});

export default rootReducer;
