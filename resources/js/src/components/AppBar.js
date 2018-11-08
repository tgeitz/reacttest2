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
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuIcon from '@material-ui/icons/Menu';

import { getCurrentUserData, logoutUser } from '../actions'

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
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    auth: {
        overflow: 'auto',
        whiteSpace: 'nowrap'
    },
    authText: {
        display: 'inline-block',
        paddingTop: 10
    },
    authMenuButton: {
        display: 'inline-block',
        paddingBottom: 18
    }
};


class AppBarTop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    handleChange(event) {
        this.setState({ auth: event.target.checked });
    };

    handleMenu(event) {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose() {
        this.setState({ anchorEl: null });
    };

    handleLogout() {
        return this.props.logoutUser();
        // this.handleClose();
    }

    renderAuth() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        if (!this.props.auth.isAuthenticated) {
            return (
                <div>
                    <Button color="inherit" component={Link} to="/register">Register</Button>
                    <Button color="inherit" component={Link} to="/login">Login</Button>
                </div>
            );
        } else {
            return (
                <div className={classes.auth}>
                    {/* <div>
                        <LogoutButton color="inherit" />
                    </div>
                    <div>
                        <Typography variant="h6" align="right" color="inherit">
                            Welcome, {this.props.auth.currentUser.name}!
                        </Typography>
                    </div> */}
                    <Typography className={classes.authText} variant="h6" align="right" color="inherit">
                        {this.props.auth.currentUser.name}
                    </Typography>
                    <IconButton
                        className={classes.authMenuButton}
                        aria-owns={open ? 'menu-appbar' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleMenu.bind(this)}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={open}
                        onClose={this.handleClose.bind(this)}
                    >
                        <MenuItem onClick={this.handleLogout.bind(this)}>Log Out</MenuItem>
                    </Menu>
                </div>
            )
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar className={classes.toolbar}>
                        <div>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <MenuIcon />
                            </IconButton>
                            <Button color="inherit" component={Link} to="/posts">
                                <Typography variant="h6" color="inherit" className={classes.grow}>
                                    Posts
                            </Typography>
                            </Button>
                        </div>
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
    connect(mapStateToProps, { logoutUser })
)(AppBarTop);