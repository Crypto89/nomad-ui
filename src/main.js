import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import rootReducer from './reducers/root';
import Router from './router';
import websocket from '/middleware/websocket'

// Styling
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/pe-icon-7-stroke.css';
import '../assets/sass/nomad-ui.scss'

const store = createStore(rootReducer, applyMiddleware(websocket))

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById("app")
);
