import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from '../reducers/reducers';
import PostsIndex from './posts/Index';

const createStoreWithMiddleware = applyMiddleware()(createStore);

class App extends Component {
    render() {
        return (
            <Provider store={createStoreWithMiddleware(reducers)}>
                <BrowserRouter>
                    <div>
                        <Route path="/posts" component={PostsIndex} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));