import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './auth/Register';
import Login from './auth/Login';
import PostsIndex from './posts/Index';
import PostsCreate from './posts/Create';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import AppBarTop from './AppBar';

const styles = theme => ({

});

class App extends Component {
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

export default withRoot(withStyles(styles)(App));

// Use synchronizer tokens for auth