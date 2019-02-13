import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Main from './containers/main/Main';
import IpTv from './containers/ipTv/IpTv';
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import './styles/main.css';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(allReducers, composeEnhancers(applyMiddleware(thunk)));

render(
    <Provider store={store}>
        <div>
            <Router>
                {/*<Route exact path='/' component={Main}/>*/}
                <Route exact path='/' component={IpTv}/>
            </Router>
        </div>
    </Provider>,
    document.getElementById('root')
);
