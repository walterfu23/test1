
import actionError from '../actions/actionError';

const initialState = {
  error: {},
};

const errorReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionError.ERROR_ENCOUNTERED:
      return {
        error: action.payload,
      };
    case actionError.ERROR_CLEARED:
      return initialState;
    default:
      return prevState;
  }
}

export default errorReducer;
