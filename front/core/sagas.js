import { call, put, takeLatest } from 'redux-saga/effects';
import { actionTypes } from './constants';
import Api from './api';

const delay = (ms) => new Promise(res => setTimeout(res, ms));

function* getPoemaColectivo() {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poema = yield call(Api.get, 'poet');
    const arr = JSON.parse(poema.text);

    for (let i = 0; i < arr.poema.length; i += 1) {
      yield delay(2500);
      yield put({
        type: actionTypes.FETCH_POEMS_SUCCEED,
        payload: {
          poema: arr.poema[i], contribucion: arr.contribucion
        }
      });
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getVerso() {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poet/verso');
    yield put({ type: actionTypes.FETCH_VERSO_SUCCEED, payload: poem.text });
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* getEstrofa() {
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

function* getPoema() {
  try {
    yield put({ type: actionTypes.FETCH_REQUEST });
    const poem = yield call(Api.get, 'poet/poema');
    const arr = poem.text.split(',');

    for (let i = 0; i < arr.length; i += 1) {
      yield delay(2500);
      yield put({ type: actionTypes.FETCH_POEMA_SUCCEED, payload: arr[i] });
    }
  } catch (e) {
    yield put({ type: actionTypes.FETCH_FAILED, message: e.message });
  }
}

function* mySaga() {
  yield takeLatest(actionTypes.GET_POEMS, getPoemaColectivo);
  yield takeLatest(actionTypes.GET_VERSO, getVerso);
  yield takeLatest(actionTypes.GET_ESTROFA, getEstrofa);
  yield takeLatest(actionTypes.GET_POEMA, getPoema);
}

export default mySaga;
