import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Spinner, Form, Input, Container, Row, Col, Button } from 'reactstrap';
//const { debounce } = require('lodash');
import styled from 'styled-components';

import { initApp } from '../core/actions';

const StyledList = styled.div`
  /* This renders the buttons above... Edit me! */
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: red;
  border: 2px solid yellow;
`;

// const Filters = require('components/filters');
// const Header = require('components/header');
// const SubReddits = require('components/subreddits');
// const Posts = require('components/posts');
// const Footer = require('components/footer');

const App = ({init, marcas, fetching}) => {
  useEffect(() => {
    console.log('init hook', init, marcas);
    init();
  }, []);
  console.log('app', marcas);
  return (
    <BrowserRouter onScroll={() => { console.log('scroll'); }}>
      <div className="root">
        <Container fluid={true}>
            <Row>
              <Col>
                header
              </Col>
            </Row>
            <Row>
              <Col>
              <Form inline>
                <label className="sr-only" htmlFor="inlineFormInputName2">Name</label>
                <input type="text" className="form-control mb-2 mr-sm-2" id="inlineFormInputName2" placeholder="Jane Doe" />

                <label className="sr-only" htmlFor="inlineFormInputGroupUsername2">Username</label>
                <div className="input-group mb-2 mr-sm-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Username" />
                </div>

                <div className="form-check mb-2 mr-sm-2">
                  <input className="form-check-input" type="checkbox" id="inlineFormCheck" />
                  <label className="form-check-label" htmlFor="inlineFormCheck">
                    Remember me
                  </label>
                </div>

                <button type="submit" className="btn btn-primary mb-2">Submit</button>
              </Form>
                filtros <Button color="danger">Danger!</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Switch>
                  <Route exact path="/"
                      render={() => (
                        fetching
                          ? <Spinner color="primary" />
                          : <StyledList>
                              { marcas.rows && marcas.rows.map((item) => (<div key={item.id}>{item.marca}</div>)) }
                            </StyledList>
                      )}
                  />
                  <Route path="/foo"
                      render={(props) => (
                        <div>
                          foo
                            {/* fetchPosts={this.props.fetchPosts}
                            subreddit={props.match.params.subreddit}
                            list={store.get('posts')}
                            onViewChange={this.props.onViewChange} */}
                        </div>
                      )}
                  />
                  <Route path="/:subreddit"
                      render={(props) => (
                        <div>
                          subredits
                            {/* fetchPosts={this.props.fetchPosts}
                            subreddit={props.match.params.subreddit}
                            list={store.get('posts')}
                            onViewChange={this.props.onViewChange} */}
                        </div>
                      )}
                  />
                  <Redirect to="/"/>
                </Switch>
              </Col>

            </Row>
            <Row>
              <Col>
                footer
              </Col>
              <Col>
                {true && <Spinner />}
              </Col>
            </Row>

         
        </Container>
      </div>
    </BrowserRouter>
  );
};

App.propTypes = {
  store: PropTypes.object.isRequired,
  fetchSubreddits: PropTypes.func.isRequired,
  fetchPosts: PropTypes.func.isRequired,
  onViewChange: PropTypes.func.isRequired
};

export default connect(
  state => ({
    marcas: state.marcas,
    fetching: state.fetching
  }),
  {
    init: initApp,
    onViewChange: () => { console.log('view changed'); }
  }
)(App);
