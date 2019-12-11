import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import { postsReducer } from "./reducers/posts"
import { loggedReducer } from "./reducers/logged"
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(
    combineReducers({
        postsReducer,
        loggedReducer
    }),
    applyMiddleware(thunk)
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));