import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from '../reducers/reducers';
import Register from './auth/Register';
import PostsIndex from './posts/Index';
import PostsCreate from './posts/Create';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const styles = theme => ({

});

class App extends Component {
    render() {
        console.log('asdf');
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <BrowserRouter>
                    <React.Fragment>
                        <Switch>
                            <Route exact path="/register" component={Register} />
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