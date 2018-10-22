import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AppNav(props) {
    return (
        <Navbar inverse fluid fixedTop collapseOnSelect>
            <Navbar.Header>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem componentClass={Link} href="/creates" to="/create">
                        Create
                    </NavItem>
                    <NavItem componentClass={Link} href="/select" to="/select">
                        Export
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
