import { actionTypes } from './constants';

const initialState = () => ({
  fetching: false,
  poema: [],
  contribucion: {},
  phrases: [],
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

    case actionTypes.FETCH_POEMS_SUCCEED: {
      return {
        ...state,
        fetching: false,
        contribucion: action.payload.contribucion,
        poema: [...state.poema, action.payload.poema]
      };
    }

    case actionTypes.FETCH_VERSO_SUCCEED: {
      return {
        ...state,
        phrases: [...state.phrases, action.payload],
        fetching: false,
      };
    }

    case actionTypes.FETCH_ESTROFA_SUCCEED: {
      return {
        ...state,
        phrases: [...state.phrases, action.payload],
        fetching: false,
      };
    }

    case actionTypes.FETCH_POEMA_SUCCEED: {
      return {
        ...state,
        phrases: [...state.phrases, action.payload],
        fetching: false,
      };
    }

    case actionTypes.FETCH_FAILED:
      return state;

    default:
      return state;
  }
};
