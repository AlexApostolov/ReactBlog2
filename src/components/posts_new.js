import React, {Component} from 'react';
// reduxForm is very similiar to the "connect" helper from redux
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {
  // JSX to represent the actual element that gets rendered to the screen is in a function that needs to be wired up to the <Field />,
  // not just passed to it.
  // The field.input is an object with different event handlers (onChange/onBlur etc. and the value) and props
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
      {/* Property automatically added to that field object from your validate function errors object,
      which is dissected into an error for each field matched by the "name" prop,
      and "error" will be the exact same string assigned in function validate to "errors.<property>".*/}
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    // Call action creator "createPost"
    this.props.createPost(values, () => {
      this.props.history.push('/')
    });
  }

  render() {
    // Property passed to the component on behalf of redux-form, which will take a function you define,
    // and if everything in the form is valid, then your defined callback is called and the values are passed.
    const {handleSubmit} = this.props;

    // Field component is used to interact with Redux Form, but doesn't know how to appear
    // Pass JSX to "component" prop to handle that with a reference to a function
    // that will be called later by Field itself--no parens
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
      <button type="submit" className="btn btn-primary">Submit</button>
      <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

// A validate function that'll be called automatically at certain points during the form's lifecycle,
// e.g. when the user tries to submit the form.
// By convention the argument passed is called values
function validate(values) {
  // Start with an empty errors object
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.categories) {
    errors.categories = 'Enter some categories';
  }
  if (!values.content) {
    errors.content = 'Enter some content please';
  }

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

// Stack helpers reduxForm and connect
export default reduxForm({
  validate,
  // Assign form property a unique string name for a component,
  // can have multiple forms on the screen each with unique string names
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
