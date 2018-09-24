import actionControl from '../actions/actionControl';

const initialState = {
  UserInfo: {
    uid: undefined,     // user id
  },
  BizDoc: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
  },
  BizDocRev: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
  },
};

const controlReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionControl.LOAD_USER_INFO:
      return {
        ...prevState,
        UserInfo: {
          ...prevState.UserInfo,
          uid: 'fuw',      // hard code the value for now
        }
      };
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
    case actionControl.SHOW_LOADING_BizDocRev:
      return {
        ...prevState,
        BizDocRev: {
          ...prevState.BizDoc,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_BizDocRev:
      return {
        ...prevState,
        BizDocRev: {
          ...prevState.BizDoc,
          showForm: action.payload,
        }
      };
    default:
      return prevState;
  }
}

export default controlReducer;
