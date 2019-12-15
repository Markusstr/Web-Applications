import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import './index.css';
import App from './App';
import { loggedReducer } from "./reducers/logged"
import { createStore, combineReducers } from "redux";

const store = createStore(
    combineReducers({
        loggedReducer
    })
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
document.getElementById('root'));
