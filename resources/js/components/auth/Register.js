import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import compose from 'recompose/compose';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

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
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;
        return (
            <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor={field.type}>{field.label}</InputLabel>
                <Input 
                    name={field.name}
                    type={field.type}
                    autoFocus={field.autoFocus}
                    {...field.input}
                />
                {touched ? error : ''}
            </FormControl>
            // <div className={className}>
            //     <label>{field.label}</label>
            //     <input
            //         className="form-control"
            //         type={field.type}
            //         {...field.input}
            //     />
            //     {touched ? error : ''}
            // </div>
        )
    }

    onSubmit(values) {
        this.props.registerUser(values);
    }

    render() {
        const { handleSubmit, classes } = this.props;

        return (
            <React.Fragment>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
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
    if (!values.email &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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

export default compose(
    withStyles(styles, { name: 'Register' }),
    reduxForm({
        validate,
        form: 'RegisterUserForm'
    }),
    connect(null, { registerUser })
)(Register);