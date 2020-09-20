import React from 'react';
import styled from 'styled-components';

const StyledFooter = styled.div`
  width: 100%;
  padding: 1.5rem;

  footer {
    align-items: center;
    justify-content: center;
    display: flex;
  }

  svg {
    width: 3rem;
    height: 3rem;
  }

  a {
    color: var(--black);
    margin-left: 0.5rem;
  }
`;

const Footer = () => (
  <StyledFooter>
    <footer>
      ©
      <a href="https://github.com/santiagoRebella">
        Santiago Rebella
      </a>
    </footer>
  </StyledFooter>
);

export default Footer;
