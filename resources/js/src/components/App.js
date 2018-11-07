import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import AppBarTop from './AppBar';
import Register from './auth/Register';
import Login from './auth/Login';
import PostsIndex from './posts/Index';
import PostsCreate from './posts/Create';
import withRoot from '../../withRoot';
import { getCurrentUserData } from '../actions';

const styles = theme => ({

});

class App extends Component {
    componentDidMount() {
        console.log('getting user data in app root');
        this.props.getCurrentUserData();
    }

    render() {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <AppBarTop />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/posts/create" component={PostsCreate} />
                        <Route exact path="/posts/" component={PostsIndex} />
                    </Switch>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

export default withRoot(
    compose(
        connect(mapStateToProps, { getCurrentUserData }),
        withStyles(styles, { name: 'App' }),
    )(App)
);

// Use synchronizer tokens for auth