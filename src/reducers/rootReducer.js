import { combineReducers } from 'redux';
import ormReducer from '../reducers/ormReducer';
import errorReducer from '../reducers/errorReducer';

const rootReducer = combineReducers({
  orm: ormReducer,
  error: errorReducer,
});

export default rootReducer;
