import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';

import { registerUser } from "../../actions";

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

    onSubmit(values) {
        this.props.registerUser(values);
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

    if (!values.name || values.name.length < 3) {
        errors.name = 'Enter a name that is at least 3 characters';
    }
    if (!values.email) {
        errors.email = 'Enter a valid email';
    }
    if (!values.password) {
        errors.password = 'Enter a password with at least 6 characters';
    }
    if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Your passwords do not match';
    }

    return errors;
}

export default reduxForm({
    validate,
    form: 'RegisterUserForm'
})(
    connect(null, { registerUser })(Register)
);