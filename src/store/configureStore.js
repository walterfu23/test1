import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootSaga from '../sagas/sagasRoot';

// enable redux-devtool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

// We're using `redux-logger`. Open up the console in the demo and you can inspect
// the internal state maintained by Redux-ORM.
const reduxLogger = createLogger({ collapsed: true });

//const createStoreWithMiddleware = applyMiddleware(reduxLogger)(createStore);
//const store = createStoreWithMiddleware(rootReducer, bootstrap(schema));
const store = createStore(
  rootReducer,
  //  bootstrap(schema),
  composeEnhancers(applyMiddleware(
    sagaMiddleware,
    reduxLogger
  ))
);

export default () => {
  sagaMiddleware.run(rootSaga);
  return store;
}

