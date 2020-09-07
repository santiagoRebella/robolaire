import React from 'react';
import { Spinner, Col } from 'reactstrap';
import styled from 'styled-components';

const StyledSpinner = styled(Col)`
  text-align: center;

  .spinner-border {
    margin: 5rem;
  }
`;

const Spin = () => (
  <StyledSpinner xs={12}>
    <Spinner />
  </StyledSpinner>
);

export default Spin;
