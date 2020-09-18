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
const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* getRandomPoem(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poems/random');
    const arr = JSON.parse(poem.text);

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_RANDOM_POEM_SUCCEED, payload: arr[i] });
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getRimedPoem(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poems/rimed');
    const arr = JSON.parse(poem.text);

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_RANDOM_POEM_SUCCEED, payload: arr[i] });
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getRimed2Poem(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poems/rimed2');
    const arr = JSON.parse(poem.text);

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_RIMED2_POEM_SUCCEED, payload: arr[i] });
    }
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
  yield takeLatest("GET_RANDOM_POEM", getRandomPoem);
  yield takeLatest("GET_RIMED_POEM", getRimedPoem);
  yield takeLatest("GET_RIMED2_POEM", getRimed2Poem);
}

export default mySaga;
