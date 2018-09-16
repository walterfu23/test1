import {ActionTypesCounter} from '../constants/actionTypes';

const counterReducer = (
  counterVal = 0,
  action
) => {
  switch (action.type) {
    case ActionTypesCounter.INCREMENT:
      return counterVal + 1;
    case ActionTypesCounter.DECREMENT:
      return counterVal - 1;
    default:
      return counterVal;
  }
}

export default counterReducer;
