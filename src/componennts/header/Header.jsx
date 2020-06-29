import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
} from 'reactstrap';

const Header = () => (
    <Navbar color="dark" variant="dark">
        <NavbarBrand href="/">Betslip</NavbarBrand>
        <Nav className="mr-auto">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
        </Nav>
    </Navbar>
);

export default Header;
