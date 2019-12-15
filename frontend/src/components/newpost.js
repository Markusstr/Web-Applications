import React, { useState } from 'react';
import { Form, Button, InputGroup, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";



function NewPost() {
    let username = useSelector(state => state.loggedReducer.username);
    
    const [length, setLength] = useState(0);
    const [value, setValue] = useState("");
    const [postState, setPostState] = useState({error: false, saved: false});

    
    const handleSubmit = (async event => {
        event.preventDefault();
        let response, data;
        let text = event.target.text.value;
        
        const bodyData = {
            username: username,
            text: text
        }
        try {
            response = await fetch("http://mongo-node-backend.rahtiapp.fi/api/savePost", {
                method: "post",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(bodyData)
            });
            data = await response.json();
        }
        catch (err) {
            setPostState({error: true, saved: false});
            setTimeout(() => setPostState({error: false, saved: false}),1500);
            return;
        }
        if (response.status !== 200 || data.length < 1) {
            setPostState({error: true, saved: false});
        }
        else {
            setPostState({error: false, saved: true});
            setLength(0);
            setValue("");
            
        }
        setTimeout(() => setPostState({error: false, saved: false}),1500);
    });

    const handleChange = (event => {
        event.preventDefault();
        setLength(event.target.value.length);
        setValue(event.target.value);
        
    });

    return (
        <div className="newpost-container">
            <div className="newpost-box">
                <h3>Create new post</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPlaintextText">
                    <InputGroup>
                        <Form.Control
                        as="textarea"
                        rows="5"
                        type="plaintext"
                        name="text"
                        placeholder="Text"
                        value={value}
                        onChange={handleChange}
                        aria-describedby="inputGroupPrepend"
                        required
                        />
                        <Form.Control.Feedback type="invalid">
                        Please choose a username.
                        </Form.Control.Feedback>
                    </InputGroup>
                    </Form.Group>
                    <div className="newpost-row">
                        {length > 300 ?
                        <Button variant="primary" type="disabled" disabled>
                        Submit
                        </Button>
                        :
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>}
                        <div className="newpost-length">
                            <p>{length}/300</p>
                        </div>
                    </div>
                    
                </Form>
            </div>
            <div className="newpost-alert">
                    {length > 300 ?
                    <Alert variant="danger">
                    Post can't be over 300 letters long!
                    </Alert>
                    : ""}
            </div>
            <div className="newpost-alert">
                    {postState.error ?
                    <Alert variant="danger">
                    Error occured while saving the post!
                    </Alert>
                    : ""}
            </div>
            <div className="newpost-alert">
                    {postState.saved ?
                    <Alert variant="success">
                    Post saved successfully!
                    </Alert>
                    : ""}
            </div>
        </div>
    );
}

export default NewPost;