import actionControl from '../actions/actionControl';

const initialState = {
  BizDoc: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
  },
};

const controlReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionControl.SHOW_LOADING_BizDoc:
      return {
        ...prevState,
        BizDoc: {
          ...prevState.BizDoc,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_BizDoc:
      return {
        ...prevState,
        BizDoc: {
          ...prevState.BizDoc,
          showForm: action.payload,
        }
      };
    default:
      return prevState;
  }
}

export default controlReducer;
