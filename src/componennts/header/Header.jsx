import React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavLink,
    Container,
} from 'reactstrap';

const Header = () => (
    <Navbar color="dark" dark>
        <Container>
            <NavbarBrand href="/">Betslip</NavbarBrand>
            <Nav className="mr-auto">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
            </Nav>
        </Container>
    </Navbar>
);

export default Header;
