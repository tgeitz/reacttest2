import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import {
    Paper,
    Typography,
    FormControl,
    TextField,
    Button
} from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { handleLogin } from '../../actions';

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

class Login extends Component {
    componentDidMount() {
        console.log(this.props);
        console.log('state above');
    }
    renderField({
        input,
        label,
        type
    }) {
        return (
            <FormControl margin="normal" fullWidth>
                <TextField 
                    label={label}
                    type={type}
                    {...input}
                />
            </FormControl>
        )
    }

    renderCheckbox({input, label}) {
        return (
            <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" />}
                label={label}
                {...input}
            />
        )
    }

    onSubmit(values) {
        this.props.handleLogin(values);
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
                { this.redirectIfLoggedIn() }
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
                                label="Remember me"
                                name="remember"
                                component="input" 
                                type="checkbox"
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

function mapStateToProps(state){
    console.log(state);
    return {
        auth: state.auth
    }
}

export default compose(
    withStyles(styles, { name: 'Login' }),
    connect(mapStateToProps, { handleLogin }),
    reduxForm({
        form: 'LoginUserForm'
    }),
)(Login);