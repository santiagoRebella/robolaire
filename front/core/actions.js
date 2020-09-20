import { actionTypes } from './constants';

export const getPoems = () => ({ type: actionTypes.GET_POEMS });
export const getVerso = () => ({ type: actionTypes.GET_VERSO });
export const getEstrofa = () => ({ type: actionTypes.GET_ESTROFA });
export const getPoema = () => ({ type: actionTypes.GET_POEMA });

export const fetchRequest = () => ({ type: actionTypes.FETCH_REQUEST });
export const fetchFailed = (err) => ({ type: actionTypes.FETCH_FAILED, payload: err });
export const fetchPoemsSucceed = (payload) => (
  { type: actionTypes.FETCH_POEMS_SUCCEED, payload }
);
export const fetchVersoSucceed = (payload) => (
  { type: actionTypes.FETCH_VERSO_SUCCEED, payload }
);
export const fetchEstrofaSucceed = (payload) => (
  { type: actionTypes.FETCH_ESTROFA_SUCCEED, payload }
);
export const fetchPoemaSucceed = (payload) => (
  { type: actionTypes.FETCH_POEMA_SUCCEED, payload }
);
