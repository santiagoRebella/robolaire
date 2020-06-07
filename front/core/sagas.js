import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import Api from './api';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* initApp(action) {
  console.log('sagas');
   try {
      const marcas = yield call(Api.get, 'users');
      console.log('marcas', marcas)
      yield put({ type: actionTypes.FETCH_SUCCEED, payload: marcas.body });
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
  yield takeLatest("INIT_APP", initApp);
}

export default mySaga;
