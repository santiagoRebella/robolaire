import React from 'react';
import styled from 'styled-components';
import {
  NavLink
} from 'react-router-dom';

const StyledHeader = styled.div`
  justify-content: center;
  padding: 1.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  h1 {
    display: inline-flex;
    margin-right: auto;
    height: 3.5rem;
  }

  a {
    display: inline-flex;
    margin-left: 1rem;
    color: var(--black);

    &.active {
      font-weight: bold;
      color: var(--primary);
    }
  }
  @media only screen and (max-width: 500px) {
    header,
    h1 { display: block; }
  }
`;

const Header = () => (
  <StyledHeader>
    <header>
      <h1>Robolaire</h1>
      <NavLink exact to="/">Poema de IPs</NavLink>
      <NavLink exact to="/componer">Componer</NavLink>
    </header>
  </StyledHeader>
);

export default Header;
