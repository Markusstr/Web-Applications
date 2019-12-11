import React from 'react';
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { changeLoggedState } from "../actions/logged";

function Menu() {
    const dispatch = useDispatch();
    return (
        <div className="main-menu">
            <Nav variant="pills">
                <Nav.Item>
                    <LinkContainer exact to="/">
                        <Nav.Link eventKey="1">
                        Front page
                    </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/test1">
                        <Nav.Link eventKey="2">
                        Profile
                    </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/test2">
                        <Nav.Link eventKey="3" onClick={() => {dispatch(changeLoggedState())}}>
                        Test page
                    </Nav.Link>
                    </LinkContainer>
                </Nav.Item>
            </Nav>
        </div>
    );
}

export default Menu;