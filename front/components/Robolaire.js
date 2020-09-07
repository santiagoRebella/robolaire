import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';

import { getPoems, getNewPoem } from '../core/actions';
import Spinner from './Spinner';
import { nodeIcon, reactIcon, expressIcon } from './svgs';

const StyledPhrase = styled.div`
  margin: 0.5rem 1rem;
  color: var(--black);

  overflow: hidden; /* Ensures the content is not revealed until the animation */
  white-space: nowrap; /* Keeps the content on a single line */
  
  letter-spacing: .12em; /* Adjust as needed */
  animation: typing 3.5s steps(40, end);

  /* The typing effect */
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`;

const StyledHeader = styled.div`
  justify-content: center;
  padding: 1.5rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    display: inline-flex;
    margin: 0;
    height: 3.5rem;
  }

  button {
    display: inline-flex;
  }
`;

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

const Robolaire = ({ fetchPoems, fetchNewPoem, poems, phrases, fetching }) => {
  useEffect(() => {
    fetchPoems();
  }, []);
  return (
    <>
      <StyledHeader>
        <header>
          <h1>Robolaire</h1>
          <Button onClick={fetchNewPoem}>generar verso</Button>
        </header>
      </StyledHeader>
      <Container fluid={true}>
        <Row>
          <Col>
            {phrases.map(phrase => (
              <StyledPhrase key={phrase}>
                {phrase}
              </StyledPhrase>
            ))}
          </Col>
          {fetching && <Spinner />}
        </Row>
      </Container>
      <StyledFooter>
        <footer>
          ©
          <a href="https://github.com/santiagoRebella">
            Santiago Rebella
          </a>
        </footer>
      </StyledFooter>
    </>
  );
};

Robolaire.propTypes = {
  poems: PropTypes.array.isRequired,
  phrases: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchPoems: PropTypes.func.isRequired,
  fetchNewPoem: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default connect(
  state => ({
    poems: state.poems,
    phrases: state.phrases,
    fetching: state.fetching
  }),
  {
    fetchPoems: getPoems,
    fetchNewPoem: getNewPoem,
    onViewChange: () => { console.log('view changed'); }
  }
)(Robolaire);
