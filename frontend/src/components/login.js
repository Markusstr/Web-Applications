import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoggedState, setUsername } from "../actions/logged";
import { Form, Button, InputGroup, Alert, Accordion, Card } from "react-bootstrap";
import Cookies from "js-cookie";



function Login() {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState({wrongPass: false, passwordsNotSame: false, usernameTaken: false, error: false});
    if(Cookies.get("sessionID") === undefined) {
        Cookies.set("sessionID", Math.random().toString(36).substr(2, 9), { expires: 7 });
    }
    
    
    const handleLoginSubmit = (async event => {
        event.preventDefault();
        let response, data,
            username = event.target.loginUsername.value,
            password = event.target.loginPassword.value;
        const bodyData = {
            username: username,
            password: password,
            sessionID: Cookies.get("sessionID")
        };
        try {
            response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/checkUser", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
        }
        catch (err) {
            console.log(err);
            setMessages({error: true});
            setTimeout(() => setMessages({error: false}),1500);
            return;
        }
        if (data.length < 1) {
            setMessages({wrongPass: true});
            setTimeout(() => setMessages({wrongPass: false}),5000);
            
        }
        else {
            const bodyData2 = {
                username: username,
                sessionID: Cookies.get("sessionID")
            }
            try {
                response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/updateID", {
                    method: "post",
                    headers: {"Content-Type":"application/json"},
                    body: JSON.stringify(bodyData2)
                });
                //let data2 = await response.json();
            }
            catch (err) {
                console.log(err);
                setMessages({error: true});
                setTimeout(() => setMessages({error: false}),1500);
                return;
            }
            dispatch(setLoggedState());
            dispatch(setUsername(username));
        }
    });

    const handleCreateSubmit = (async event => {
        event.preventDefault();
        let response, data,
            username = event.target.createUsername.value,
            password = event.target.createPassword.value,
            passwordAgain = event.target.createPasswordAgain.value;

        
        if (password !== passwordAgain) {
            setMessages({passwordsNotSame: true});
            setTimeout(() => setMessages({passwordsNotSame: false}),1500);
            return;
        }
        const bodyData = {
            username: username
        };
        try {
            response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/getUser", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
        }
        catch (err) {
            console.log(err);
            setMessages({error: true});
            setTimeout(() => setMessages({error: false}),1500);
            return;
        }
        if (data !== null) {
            setMessages({usernameTaken: true});
            setTimeout(() => setMessages({usernameTaken: false}),5000);
            return;
        }
        let response2, data2;
        console.log(Cookies.get("sessionID"));
        const bodyData2 = {
            username: username,
            password: password,
            sessionID: Cookies.get("sessionID")
        };
        try {
            response2 = await fetch("http://mongo-node-backend.rahtiapp.fi/api/saveUser", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData2)
            });
            data2 = await response2.json();
        }
        catch (err) {
            console.log(err);
            setMessages({error: true});
            setTimeout(() => setMessages({error: false}),1500);
            return;
        }
        if (data2.length < 1) {
            console.log("Error occured while creating a user");
            setMessages({error: true});
            setTimeout(() => setMessages({error: false}),1500);
            return;
        }
        else {
            dispatch(setLoggedState());
            dispatch(setUsername(username));
        }
    });

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Web applications</h1>
            </div>
            <div className="login-box">
                <Form onSubmit={handleLoginSubmit}>
                    <Form.Group controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                        type="text"
                        name="loginUsername"
                        placeholder="Username"
                        aria-describedby="inputGroupPrepend"
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                        Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        name="loginPassword"
                        placeholder="Password"
                        required/>
                        <Form.Control.Feedback type="invalid">
                        Please choose a password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
                <div className="createuser">
                    <Accordion>
                        <Card>
                            <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" eventKey="0">
                                Don't have account yet? Create new user.
                            </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Form onSubmit={handleCreateSubmit}>
                                    <Form.Group controlId="formCreateUsername">
                                    <Form.Label>Username</Form.Label>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <Form.Control
                                        type="text"
                                        name="createUsername"
                                        placeholder="Username"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                        Please choose a username.
                                        </Form.Control.Feedback>
                                    </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formCreatePassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                        type="password"
                                        name="createPassword"
                                        placeholder="Password"
                                        required/>
                                        <Form.Control.Feedback type="invalid">
                                        Please choose a password.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group controlId="formCreatePasswordAgain">
                                        <Form.Label>Password again</Form.Label>
                                        <Form.Control
                                        type="password"
                                        name="createPasswordAgain"
                                        placeholder="Password again"
                                        required/>
                                        <Form.Control.Feedback type="invalid">
                                        Please type the password again.
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Create account
                                    </Button>
                                    
                                </Form>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
                <div className="login-wrongpass">
                    {messages.wrongPass ?
                    <Alert variant="danger">
                    Wrong username or password!
                    </Alert>
                    : ""}

                    {messages.passwordsNotSame ?
                    <Alert variant="danger">
                    Passwords are not the same!
                    </Alert>
                    : ""}

                    {messages.usernameTaken ?
                    <Alert variant="danger">
                    This username is already taken!
                    </Alert>
                    : ""}

                    {messages.error ?
                    <Alert variant="danger">
                    Error occured!
                    </Alert>
                    : ""}
                </div>
            </div>
        </div>
    );
}

export default Login;