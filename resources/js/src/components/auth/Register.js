import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { TextField } from '@material-ui/core';

import { registerUser } from "../../actions";

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class Register extends Component {
    renderField({
        input,
        label,
        type,
        meta: { touched, error }
    }) {
        return (
            <FormControl margin="normal" fullWidth>
                <TextField
                    label={label}
                    type={type}
                    error={touched && typeof error === 'string'}
                    helperText={touched ? error : ''}
                    {...input}
                />
            </FormControl>
        )
    }

    onSubmit(values) {
        this.props.registerUser(values);
    }

    redirectIfLoggedIn() {
        if (this.props.auth.isAuthenticated) {
            return (
                <Redirect to="/posts" />
            )
        }
    }

    render() {
        const { handleSubmit, classes } = this.props;

        return (
            <React.Fragment>
                <main className={classes.layout}>
                {this.redirectIfLoggedIn()}
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Register
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                            <Field
                                label="Name"
                                name="name"
                                type="text"
                                component={this.renderField}
                            />
                            <Field
                                label="Email"
                                name="email"
                                type="text"
                                component={this.renderField}
                            />
                            <Field
                                label="Password"
                                name="password"
                                type="password"
                                component={this.renderField}
                            />
                            <Field
                                label="Confirm Password"
                                name="password_confirmation"
                                type="password"
                                component={this.renderField}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                            <Button
                                component={Link}
                                to="/posts"
                                color="secondary"
                                className={classes.submit}
                            >
                                Cancel
                            </Button>
                        </form>
                    </Paper>
                </main>
            </React.Fragment>
        );
    }
}

function validate(values) {
    const errors = {};

    if (!values.name || values.name.length < 3) {
        errors.name = 'Enter a name that is at least 3 characters';
    }
    if (!values.email ||
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Enter a valid email';
    }
    if (!values.password || values.password.length < 6) {
        errors.password = 'Enter a password with at least 6 characters';
    }
    if (values.password_confirmation !== values.password) {
        errors.password_confirmation = 'Your passwords do not match';
    }

    return errors;
}

function mapStateToProps(state){
    return {
        auth: state.auth
    }
}

export default compose(
    withStyles(styles, { name: 'Register' }),
    connect(mapStateToProps, { registerUser }),
    reduxForm({
        validate,
        form: 'RegisterUserForm'
    }),
)(Register);