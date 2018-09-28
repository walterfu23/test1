import actionControl from '../actions/actionControl';

const initialState = {
  UserInfo: {
    uid: undefined,     // user id
  },
  BizDoc: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
  BizDocRev: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
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
          ...prevState.BizDocRev,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_BizDocRev:
      return {
        ...prevState,
        BizDocRev: {
          ...prevState.BizDocRev,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_BizDoc:
      return {
        ...prevState,
        BizDoc: {
          ...prevState.BizDoc,
          current: action.payload,
        }
      }
    case actionControl.CTRL_UPD_CRNT_BizDocRev:
      return {
        ...prevState,
        BizDocRev: {
          ...prevState.BizDocRev,
          current: action.payload,
        }
      }
    default:
      return prevState;
  }
}

export default controlReducer;
