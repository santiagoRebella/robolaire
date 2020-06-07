import { actionTypes } from './constants';

export const initApp = () => ({ type: actionTypes.INIT_APP });

export const fetchRequest = () => ({ type: actionTypes.FETCH_REQUEST });
export const fetchFailed = (err) => ({ type: actionTypes.FETCH_FAILED, payload: err });
export const fetchSucceed = (payload) => ({ type: actionTypes.FETCH_SUCCEED, payload });
