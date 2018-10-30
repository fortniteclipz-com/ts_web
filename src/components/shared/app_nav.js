import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AppNav(props) {
    return (
        <Navbar fluid fixedTop inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem componentClass={Link} href="/create" to="/create">
                        Create
                    </NavItem>
                    <NavItem componentClass={Link} href="/watch" to="/watch">
                        Watch
                    </NavItem>
                    <NavItem componentClass={Link} href="/account" to="/account">
                        Account
                    </NavItem>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
