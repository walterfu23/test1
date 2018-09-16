import { combineReducers } from 'redux';
import ormReducer from '../reducers/ormReducer';
import counterReducer from '../reducers/counterReducer';

const rootReducer = combineReducers({
  orm: ormReducer,
  counter: counterReducer,  
});

export default rootReducer;
