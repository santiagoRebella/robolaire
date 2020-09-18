import { actionTypes } from './constants';

export const getPoems = () => ({ type: actionTypes.GET_POEMS });
export const getRimedPoem = () => ({ type: actionTypes.GET_RIMED_POEM });
export const getRimed2Poem = () => ({ type: actionTypes.GET_RIMED2_POEM });
export const getRandomPoem = () => ({ type: actionTypes.GET_RANDOM_POEM });

export const fetchRequest = () => ({ type: actionTypes.FETCH_REQUEST });
export const fetchFailed = (err) => ({ type: actionTypes.FETCH_FAILED, payload: err });
export const fetchPoemsSucceed = (payload) => (
  { type: actionTypes.FETCH_POEMS_SUCCEED, payload }
);
export const fetchRimedPoemSucceed = (payload) => (
  { type: actionTypes.FETCH_RIMED_POEM_SUCCEED, payload }
);
export const fetchRandomPoemSucceed = (payload) => (
  { type: actionTypes.FETCH_RANDOM_POEM_SUCCEED, payload }
);
export const fetchRimed2PoemSucceed = (payload) => (
  { type: actionTypes.FETCH_RIMED2_POEM_SUCCEED, payload }
);
