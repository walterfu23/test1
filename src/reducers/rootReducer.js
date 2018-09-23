import { combineReducers } from 'redux';
import ormReducer from './ormReducer';
import controlReducer from './controlReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  control: controlReducer,
  orm: ormReducer,
  error: errorReducer,
});

export default rootReducer;
