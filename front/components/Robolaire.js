import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { getPoems, getVerso, getEstrofa, getPoema } from '../core/actions';
import Spinner from './Spinner';
import Verso from './Verso';
import Header from './Header';
import Footer from './Footer';
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

const StyledComponerButtons = styled.div`
  text-align: center;
  margin-top: -1.5rem;
  color: var(--black);
  
`;

const Robolaire = ({
  fetchPoems,
  fetchVerso,
  fetchEstrofa,
  fetchPoema,
  poema,
  contribucion,
  phrases,
  fetching
}) => {
  useEffect(() => {
    fetchPoems();
  }, []);

  return (
    <Router>
      <Header />
      <Container fluid={true}>
        <Row>
          <Col>
            <Switch>
              <Route path="/componer">
                <StyledComponerButtons>
                  <Button color="link" onClick={fetchVerso} outline>verso</Button>
                  <Button color="link" onClick={fetchEstrofa} outline>estrofa</Button>
                  <Button color="link" onClick={fetchPoema} outline>poema</Button>
                </StyledComponerButtons>
                {phrases.map(phrase => (
                  <StyledPhrase key={phrase}>
                    {phrase}
                  </StyledPhrase>
                ))}
              </Route>
              <Route path="/">
                <h3>Poema de IPs</h3>
                {poema.map(item => (
                  <Verso key={item.id} item={item} contribucion={contribucion} />
                ))}
              </Route>
            </Switch>
            {fetching && <Spinner />}
          </Col>
        </Row>
      </Container>
      <Footer />
    </Router>
  );
};

Robolaire.propTypes = {
  poema: PropTypes.array.isRequired,
  contribucion: PropTypes.object.isRequired,
  phrases: PropTypes.array.isRequired,
  fetching: PropTypes.bool.isRequired,
  fetchPoems: PropTypes.func.isRequired,
  fetchVerso: PropTypes.func.isRequired,
  fetchEstrofa: PropTypes.func.isRequired,
  fetchPoema: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default connect(
  state => ({
    poema: state.poema,
    contribucion: state.contribucion,
    phrases: state.phrases,
    fetching: state.fetching
  }),
  {
    fetchPoems: getPoems,
    fetchVerso: getVerso,
    fetchEstrofa: getEstrofa,
    fetchPoema: getPoema,
    onViewChange: () => { console.log('view changed'); }
  }
)(Robolaire);
