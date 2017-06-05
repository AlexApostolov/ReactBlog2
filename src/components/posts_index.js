import _ from 'lodash';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPosts} from '../actions';

class PostsIndex extends Component {
  // componentWillMount() could've also been used here because fetchPosts() is asynch
  componentDidMount() {
    this.props.fetchPosts();
  }

  renderPosts() {
    // We are dealing with an object now so we can't use JS' map like with an array
    // yet lodash library can
    return _.map(this.props.posts, post => {
      return (
        <li className="list-group-item" key={post.id}>
          <Link to={`/posts/${post.id}`}>
            {post.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="text-xs-right">
          <Link className="btn btn-primary" to="/posts/new">Add a Post</Link>
        </div>
        <h3>Posts</h3>
        <ul className="list-group">
          {this.renderPosts()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {posts: state.posts};
}

// Since we don't need to do any computation ahead of time on how to call the action creator,
// don't bother defining a seperate function mapDispatchToProps to get an action creator directly into a component,
// use the shorter way to wire up an action creator
// by passing it in as an object key/value as the 2nd argument
export default connect(mapStateToProps, {fetchPosts})(PostsIndex);
