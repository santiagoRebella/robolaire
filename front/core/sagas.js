import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import Api from './api';

function* getPoems(action) {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    console.log('======================')
    const poems = yield call(Api.get, 'poems');
    console.log('======================')
    yield put({ type: actionTypes.FETCH_POEMS_SUCCEED, payload: poems.body });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getNewPoem(action) {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    console.log('======================')
    const poem = yield call(Api.get, 'poems/new');
    console.log('======================')
    yield put({ type: actionTypes.FETCH_NEW_POEM_SUCCEED, payload: poem.text });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
// function* mySaga() {
//   yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
// }

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
  yield takeLatest("GET_POEMS", getPoems);
  yield takeLatest("GET_NEW_POEM", getNewPoem);
}

export default mySaga;
