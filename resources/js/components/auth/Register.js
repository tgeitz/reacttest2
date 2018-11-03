import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'react-form';
import { Link } from 'react-router-dom';

class Register extends Component {
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
    render() {
        const { handleSubmit } = this.props;

        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Name"
                    name="name"
                    component={this.renderField} 
                />
                <Field
                    label="Email"
                    name="email"
                    component={this.renderField} 
                />
                <Field
                    label="Password"
                    name="password"
                    component={this.renderField} 
                />
                <Field
                    label="Confirm Password"
                    name="password_confirmation"
                    component={this.renderField} 
                />
                <button type="submit" className="btn btn-primary">Create</button>
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

export default reduxForm({
    validate,
    form: 'RegisterUserForm'
})(
    connect(null, { registerUser })(Register)
);