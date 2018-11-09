import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';

import { createPost } from '../../actions';

class PostsCreate extends Component {
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <div className={className}>
                <label>{ field.label }</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {touched ? error : ''}
            </div>
        )
    }

    onSubmit(values) {
        this.props.createPost(values);
    }

    redirectIfNotLoggedIn() {
        if (!this.props.auth.isAuthenticated) {
            return (
                <Redirect to="/posts" />
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                {this.redirectIfNotLoggedIn()}
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
                    label="Content"
                    name="content"
                    component={this.renderField} 
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/posts" className="btn btn-secondary">Cancel</Link>
            </form>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.title || values.title.length < 3) {
        errors.title = 'Enter a title that is at least 3 characters';
    }
    if (!values.categories) {
        errors.categories = 'Enter some categories';
    }
    if (!values.content) {
        errors.content = 'Enter some content please';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default reduxForm({
    validate,
    form: 'PostsNewForm'
})(
    connect(mapStateToProps, { createPost })(PostsCreate)
);