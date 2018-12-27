import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import TutorialModal from '../modal/tutorial'

import auth from '../../services/auth'
import modal from '../../services/modal'

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
                <Navbar.Brand>
                    <Link to='/'>FortniteClipz</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem href='#' onClick={(e) => modal.show(TutorialModal)}>
                        Tutorial
                    </NavItem>
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
