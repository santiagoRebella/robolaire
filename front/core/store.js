import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './reducers';
import mySaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// mount it on the Store
const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(sagaMiddleware)
  ),
);

// then run the saga
sagaMiddleware.run(mySaga);
export default store;

// render the application







// const { createStore,
//     applyMiddleware,
//     compose } = require('redux');
// const thunk = require('redux-thunk').default;
// const reducer = require('core/reducer');

// const middlewares = [thunk];
// const enhancers = compose(
// applyMiddleware.apply(null, middlewares)
// );

// const store = createStore(
// reducer,
// enhancers
// );

// module.exports = store;

// /*
// const enhancers = compose(
// applyMiddleware.apply(null, middlewares),
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
// */