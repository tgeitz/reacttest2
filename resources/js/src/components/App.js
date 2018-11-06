import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from '../reducers/reducers';
import Register from './auth/Register';
import Login from './auth/Login';
import PostsIndex from './posts/Index';
import PostsCreate from './posts/Create';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../withRoot';
import AppBar from './AppBar';

const createStoreWithMiddleware = applyMiddleware(promise, thunk)(createStore);

const styles = theme => ({

});

class App extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <BrowserRouter>
                    <React.Fragment>
                        <AppBar />
                        <Switch>
                            <Route exact path="/register" component={Register} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/posts/create" component={PostsCreate} />
                            <Route exact path="/posts/" component={PostsIndex} />
                        </Switch>
                    </React.Fragment>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default withRoot(withStyles(styles)(App));

// Use synchronizer tokens for auth