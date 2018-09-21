import { combineReducers } from 'redux';
import ormReducer from '../reducers/ormReducer';

const rootReducer = combineReducers({
  orm: ormReducer,
});

export default rootReducer;
