import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { dateFormatOptions } from '../core/constants';

const StyledVerso = styled.div`
  margin: 0.5rem 1rem;
  color: var(--black);
  overflow: hidden;
  white-space: nowrap;
  letter-spacing: .12em;
  animation: typing 2.5s steps(40, end);
  cursor: pointer;

  span {
    display: none;
    margin-left: 0.5rem;
    letter-spacing: 0rem;
    
    small {
      font-size: 1rem;
      margin-left: 0.5rem;
    }

    label {
      font-size: 1rem;
      font-weight: bold;
      margin: 0;
    }
  }

  &:hover {
    span {
      display: inline;
    }
  }

  ::after {
    letter-spacing: 0;
    font-size: 1.1rem;
    font-weight: bold;
    display: ${props => (props.isContrib ? 'inline-block' : 'none')};
    content: "<- el verso de tu IP";
    margin-left: 1rem;
  }

  /* The typing effect */
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }

  @media only screen and (max-width: 550px) {
    white-space: normal;
    font-size: 1.3rem;
    letter-spacing: -0.1rem;
    ::after {
      display: ${props => (props.isContrib ? 'block' : 'none')};
      content: "^ el verso de tu IP";
    }

    &:hover {
      span {
        display: none;
      }
    }
  }
`;

const Verso = ({
  item,
  contribucion
}) => (
  <StyledVerso isContrib={item.id === contribucion.id}>
    {item.verso}
    <span>
      <label>{item.ip}</label>
      <small>
        {new Date(item.created_at).toLocaleDateString('es-ES', dateFormatOptions)}
      </small>
    </span>
  </StyledVerso>
);

Verso.propTypes = {
  item: PropTypes.object.isRequired,
  contribucion: PropTypes.object.isRequired
};

export default Verso;
