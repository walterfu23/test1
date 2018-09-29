import actionGen from './actionGen';

// report the error
const ERROR_ENCOUNTERED = 'ERROR_ENCOUNTERED';
const reportStateError = (loc, error) => {
  const payload = { loc, error, };
  return actionGen(ERROR_ENCOUNTERED, payload);
}

// action indicating the clearing of the error condition
const ERROR_CLEARED = 'ERROR_CLEARED';
const clearStateError = actionGen(ERROR_CLEARED);

// things exported thru the default
const actionError = {
  ERROR_ENCOUNTERED,
  reportStateError: (loc, error) => reportStateError(loc, error),

  ERROR_CLEARED,
  clearStateError,
}

export default actionError;
