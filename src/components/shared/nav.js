import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import auth from '../../services/auth'

export default function AppNav(props) {
    let item;
    if (auth.isAuthenticated) {
        item = (
            <NavItem componentClass={Link} href='/account/profile' to='/account/profile'>
                Profile
            </NavItem>
        )
    } else {
        item = (
            <NavItem componentClass={Link} href='/account' to='/account'>
                Sign Up
            </NavItem>
        )
    }

    return (
        <Navbar fluid fixedTop inverse collapseOnSelect>
            <Navbar.Header>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem componentClass={Link} href='/create' to='/create'>
                        Create
                    </NavItem>
                    <NavItem componentClass={Link} href='/watch' to='/watch'>
                        Watch
                    </NavItem>
                    {item}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};
