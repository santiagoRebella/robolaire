import { actionTypes } from './constants';

const initialState = () => ({
  fetching: false,
  poems: [],
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
      console.log(action.payload.rows);
      const rows = action.payload.rows.map(item => ({ ...item, data: JSON.parse(item.data) }));
      return {
        ...state,
        fetching: false,
        poems: rows
      };
    }

    case actionTypes.FETCH_RIMED_POEM_SUCCEED:
    case actionTypes.FETCH_RIMED2_POEM_SUCCEED:
    case actionTypes.FETCH_RANDOM_POEM_SUCCEED: {
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
