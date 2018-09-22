import actionGen from './actionGen';

// action types 
const ERROR_ENCOUNTERED = 'ERROR_ENCOUNTERED';
const ERROR_CLEARED = 'ERROR_CLEARED';

// report the error
const reportStateError = (error) => {
  return actionGen(ERROR_ENCOUNTERED, error);
}

// action indicating the clearing of the error condition
const clearStateError  = actionGen(ERROR_CLEARED);

// things exported thru the default
const actionError = {
  ERROR_ENCOUNTERED,
  ERROR_CLEARED,
  reportStateError: (error) => reportStateError(error),
  clearStateError,
}

export default actionError;
