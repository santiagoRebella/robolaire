// const Immutable = require('immutable');
// const { actionTypes } = require('core/constants');
import { actionTypes } from './constants';

const initialState = () => ({
  fetching: false,
  marcas: {},
  error: false
});

export default (state = initialState(), action) => {
  switch (action.type) {
    case actionTypes.FETCH_REQUEST:
      return {
        ...state,
        ...{
          fetching: true,
          error: false
        }
      };

    case actionTypes.FETCH_SUCCEED: {
      console.log(action.payload);
      return {
        ...state,
        ...{
          fetching: false,
          marcas: action.payload
        }
      };
    }
    case actionTypes.FETCH_FAILED:
      return state;

    default:
      return state;
  }
};
