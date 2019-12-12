import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from "./components/menu";
import Login from "./components/login";
import Posts from "./components/posts";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoggedState, setSessionID, setUsername } from "./actions/logged";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
    let logged = useSelector(state => state.loggedReducer.loggedState),
        username = useSelector(state => state.loggedReducer.username);

    const dispatch = useDispatch();

    /*const updatePage = () => {
        const [num, setNum] = useState(true);
        return () => setValue(value => !value);
        console.log(num);
    }*/

    const checkCookie = async () => {
        let response, data, dataUsername;
        const cookie = Cookies.get("sessionID");
        const bodyData = {
            sessionID: cookie
        }
        try {
            response = await fetch("http://localhost:8080/api/getUserByID", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
            dataUsername = data.username;
        }
        catch (err) {
            //TODO: Error handling
        }
        if (data === null) {
            const bodyData2 = {
                username: username,
                sessionID: cookie
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
            dispatch(setLoggedState());
            dispatch(setSessionID(cookie));
            dispatch(setUsername(dataUsername));
        }
    }
    if(Cookies.get("sessionID") === undefined) {
        Cookies.set("sessionID", Math.random().toString(36).substr(2, 9), { expires: 7 });
    }
    else {
        checkCookie();
        
    }

    return(
        <div>
            {logged ? 
            <BrowserRouter>
                <Menu />
                <Posts />
                <Switch>
                    <Route path="/test1" component={Test1} />
                    <Route path="/test2" component={Test2} />
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

const Test2 = () => {
    return (
        <p>this is test page2</p>
    );
}

export default App;
