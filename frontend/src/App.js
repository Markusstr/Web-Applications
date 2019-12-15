import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/menu";
import Login from "./components/login";
import Posts from "./components/posts";
import NewPost from "./components/newpost";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoggedState, setSessionID, setUsername } from "./actions/logged";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { checkCookie } from "./cookieCheck";

function App() {
    let logged = useSelector(state => state.loggedReducer.loggedState);

    const dispatch = useDispatch();

    useEffect(() => {
        loginCheck();
    }, []);

    const loginCheck = async() => {
        let data = await checkCookie();
        if (data === false) {
            Cookies.set("sessionID", Math.random().toString(36).substr(2, 9), { expires: 7 });
        }
        else {
            dispatch(setLoggedState());
            dispatch(setSessionID(Cookies.get("sessionID")));
            dispatch(setUsername(data.username));
        }
        
    }

    return(
        <div>
            {logged ? 
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/" component={Posts} />
                    <Route path="/newpost" component={NewPost} />
                </Switch>
            </BrowserRouter> :
            <Login />
            }
        </div>
    );
}

export default App;
