import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setLoggedState, setUsername } from "../actions/logged";
import { Form, Button, InputGroup, Alert } from "react-bootstrap";



function Login() {
    const dispatch = useDispatch();
    const [wrongPass, setWrongPass] = useState(false);

    
    const handleSubmit = (async event => {
        event.preventDefault();
        let response, data,
            username = event.target.username.value,
            password = event.target.password.value;
        const bodyData = {
            username: username,
            password: password,
            sessionID: "jokusession"
        }
        try {
            response = await fetch("http://localhost:8080/api/checkUser", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
            if (data.length < 1) {
                setWrongPass(true);
                setTimeout(() => setWrongPass(false),5000);
                
            }
            else {
                dispatch(setLoggedState());
                dispatch(setUsername(username));
            }
        }
        catch (err) {
            console.log("Error" + err);
        }
    });

    return (
        <div className="login-container">
            <div>
                <div className="login-header">
                    <h1>PageNameHere</h1>
                </div>
                <div className="login-box">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                            type="text"
                            name="username"
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
                            name="password"
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
                    <div className="login-wrongpass">
                        {wrongPass ?
                        <Alert variant="danger">
                        Wrong username or password!
                        </Alert>
                        : ""}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;