import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';

import reducers from '../reducers/reducers';
import Register from './auth/Register';
import PostsIndex from './posts/Index';
import PostsCreate from './posts/Create';
import { CssBaseline } from '@material-ui/core';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <BrowserRouter>
                    <React.Fragment>
                        <CssBaseline />
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

ReactDOM.render(<App />, document.getElementById('app'));

// Use synchronizer tokens for auth