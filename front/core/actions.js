import { actionTypes } from './constants';

export const getPoems = () => ({ type: actionTypes.GET_POEMS });
export const getNewPoem = () => ({ type: actionTypes.GET_NEW_POEM });

export const fetchRequest = () => ({ type: actionTypes.FETCH_REQUEST });
export const fetchFailed = (err) => ({ type: actionTypes.FETCH_FAILED, payload: err });
export const fetchPoemsSucceed = (payload) => (
  { type: actionTypes.FETCH_POEMS_SUCCEED, payload }
);
export const fetchNewPoemSucceed = (payload) => (
  { type: actionTypes.FETCH_NEW_POEM_SUCCEED, payload }
);
