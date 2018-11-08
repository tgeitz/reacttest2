import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { getCurrentUserData } from '../actions'
import LogoutButton from './auth/LogoutButton';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};


class AppBarTop extends Component {
    renderAuth() {
        const { classes } = this.props;

        if (!this.props.auth.isAuthenticated) {
            return (
                <div>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </div>
            );
        } else {
            return (
                <div>
                    <Typography variant="h6" color="inherit">
                        Welcome, {this.props.auth.currentUser.name}!
                    </Typography>
                    {<LogoutButton color="inherit" />}
                </div>
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            News
                        </Typography>
                        {this.renderAuth()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default compose(
    withStyles(styles, { name: 'AppBar' }),
    connect(mapStateToProps, { getCurrentUserData })
)(AppBarTop);