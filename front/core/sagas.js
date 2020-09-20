import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import Api from './api';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* getPoemaColectivo(action) {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    
    const poema = yield call(Api.get, 'poet');
    console.log('poems', poema)
    // console.log('======================')
    // yield put({ type: actionTypes.FETCH_POEMS_SUCCEED, payload: poems.body });
    const arr = JSON.parse(poema.text);
    console.log('arr', arr)
    for (let i = 0; i < arr.poema.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_POEMS_SUCCEED, payload: {
        poema: arr.poema[i], contribucion: arr.contribucion
      }});
    }

  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}


function* getVerso(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poet/verso');
    console.log('poem', poem);
    yield put({ type: actionTypes.FETCH_VERSO_SUCCEED, payload: poem.text });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getEstrofa(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poet/estrofa');
    const arr = JSON.parse(poem.text);

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_ESTROFA_SUCCEED, payload: arr[i] });
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getPoema(action) {
  console.log(action);
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poet/poema');
    console.log(poem)
    const arr = poem.text.split(',');
    console.log(arr)

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_POEMA_SUCCEED, payload: arr[i] });
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
  yield takeLatest(actionTypes.GET_POEMS, getPoemaColectivo);
  yield takeLatest(actionTypes.GET_VERSO, getVerso);
  yield takeLatest(actionTypes.GET_ESTROFA, getEstrofa);
  yield takeLatest(actionTypes.GET_POEMA, getPoema);
}

export default mySaga;
