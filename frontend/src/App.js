import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import PostList from './containers/posts';
import Menu from "./components/menu";
import Posts from "./components/posts";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Jumbotron } from 'react-bootstrap';


/*const routes = [
    {
        path: "/",
        component: PostList
    }
];*/

function App() {
    const logged = useSelector(state => state.loggedReducer.loggedState)

    return(
        <BrowserRouter>
            <Menu />
            {logged ? "" :
            <Jumbotron>
                <h1>You are not logged in</h1>
                <p>
                    Welcome to our website. If you would like to make posts yourself, log in or create an account.
                </p>
                <p>
                    <Button variant="primary">Create account</Button>
                </p>
            </Jumbotron>
            }
            <Posts />
            <Switch>
                <Route path="/test1" component={Test1} />
                <Route path="/test2" component={Test2} />
            </Switch>
        </BrowserRouter>
    );
}

const Test1 = () => {
    return (
        <p>this is test page1</p>
    );
}

const Test2 = () => {
    return (
        <p>this is test page2</p>
    );
}

export default App;
