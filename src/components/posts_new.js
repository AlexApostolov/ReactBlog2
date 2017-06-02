import React, {Component} from 'react';
// reduxForm is very similiar to the "connect" helper from redux
import {Field, reduxForm} from 'redux-form';

class PostsNew extends Component {
  // JSX to represent the actual element that gets rendered to the screen
  // The field.input is an object with different event handlers (onChange/onBlur etc. and the value) and props
  renderTitleField(field) {
    return (
      <div>
        <input
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  render() {
    // Field component is used to interact with Redux Form, but doesn't know how to appear
    // Pass JSX to "component" prop to handle that.
    return (
      <form>
        <Field
          name="title"
          component={this.renderTitleField}
        />
      </form>
    );
  }
}
export default reduxForm({
  // Assign form property a unique string name for a component,
  // can have multiple forms on the screen each with unique string names
  form: 'PostsNewForm'
})(PostsNew);
