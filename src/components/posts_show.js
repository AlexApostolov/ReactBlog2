import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPost} from '../actions';

class PostsShow extends Component {
  componentDidMount() {
    // Do not eagerly refetch post if you already have it
    if (!this.props.post) {
      // Use react-router to get the id off of the "params" object
      const {id} = this.props.match.params;
      this.props.fetchPost(id);
    }
  }

  render() {
    const {post} = this.props;

    if (!post) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <Link className="btn btn-primary" to="/">Back To Index</Link>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    );
  }
}

// 1st arg is app state, 2nd arg is props headed to this PostsShow component,
// which is named by convention ownProps. ownProps === this.props
function mapStateToProps({posts}, ownProps) {
  // Rather than return the big list of "posts", return just the single post you care about
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost})(PostsShow);
