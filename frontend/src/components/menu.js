import React from 'react';
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeLoggedState } from "../actions/logged";
import { LinkContainer } from "react-router-bootstrap";
import Cookies from "js-cookie";


function Menu() {
    const dispatch = useDispatch();
    let username = useSelector(username => username.loggedReducer.username);

    const logout = () => {
        Cookies.remove("sessionID")
        dispatch(removeLoggedState())
    }

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
                    <Nav.Link eventKey="3" onClick={() => logout()}>
                    Log out
                    </Nav.Link>
                </Nav.Item>
                <div className="main-menu-username">
                    <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>
                        Signed in: {username}
                        </Nav.Link>
                    </Nav.Item>
                </div>
            </Nav>
        </div>
    );
}

export default Menu;