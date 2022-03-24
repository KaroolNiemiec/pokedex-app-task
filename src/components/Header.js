import React from "react";
import { Link } from 'react-router-dom';
import { Navbar, Container } from "react-bootstrap";

const Header = () => {
    return (
        <Navbar  bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Link to ="/">
              <Navbar.Brand>Pokedex</Navbar.Brand>
            </Link>
          </Container>
        </Navbar>
    )
}
export default Header