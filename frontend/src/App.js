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
    let logged = useSelector(state => state.loggedReducer.loggedState),
        username = useSelector(state => state.loggedReducer.username);

    const dispatch = useDispatch();

    useEffect(() => {
        loginCheck();
    }, []);

    /*const checkCookie2 = async () => {

        if (data === null) {
            console.log("ei löytynyt");
            Cookies.set("sessionID", Math.random().toString(36).substr(2, 9), { expires: 7 });
            const bodyData2 = {
                username: username,
                sessionID: Cookies.get("sessionID")
            }
            try {
                response = await fetch("http://localhost:8080/api/updateID", {
                    method: "post",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(bodyData2)
                });
                //let data2 = await response.json();
            }
            catch (err) {
                //TODO: Error handling
            }
        }
        else {
            
        }
    }
    if (Cookies.get("sessionID") !== undefined) {
        console.log("test");
        checkCookie();
        console.log(Cookies.get("sessionID"));
    }*/

    const loginCheck = async() => {
        let data = await checkCookie(username);
        console.log(data)
        if (data === false) {
            console.log("uusi")
            Cookies.set("sessionID", Math.random().toString(36).substr(2, 9), { expires: 7 });
        }
        else {
            console.log("löytyi suoraan");
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
                    <Route path="/test1" component={Test1} />
                    <Route path="/newpost" component={NewPost} />
                </Switch>
            </BrowserRouter> :
            <Login />
            }
        </div>
    );
}

const Test1 = () => {
    return (
        <p>this is test page1</p>
    );
}

export default App;
