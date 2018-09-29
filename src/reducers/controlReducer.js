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
  BizDocRevPage: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
};

const controlReducer = (prevState = initialState, action) => {
  switch (action.type) {

    // =============== UserInfo ================  
    case actionControl.FETCH_USER_INFO_SUCCESSFUL:
      return {
        ...prevState,
        UserInfo: {
          ...prevState.UserInfo,
          uid: action.payload,
        }
      };
    case actionControl.SET_USER_INFO:
      return {
        ...prevState,
        UserInfo: action.payload,
      };

    // =============== BizDoc ================  
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
      case actionControl.CTRL_UPD_CRNT_BizDoc:
      return {
        ...prevState,
        BizDoc: {
          ...prevState.BizDoc,
          current: action.payload,
        }
      }

    // =============== BizDocRev ================  
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
    case actionControl.CTRL_UPD_CRNT_BizDocRev:
      return {
        ...prevState,
        BizDocRev: {
          ...prevState.BizDocRev,
          current: action.payload,
        }
      }

    // =============== BizDocRevPage ================  
    case actionControl.SHOW_LOADING_BizDocRevPage:
      return {
        ...prevState,
        BizDocRevPage: {
          ...prevState.BizDocRevPage,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_BizDocRevPage:
      return {
        ...prevState,
        BizDocRevPage: {
          ...prevState.BizDocRevPage,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_BizDocRevPage:
      return {
        ...prevState,
        BizDocRevPage: {
          ...prevState.BizDocRevPage,
          current: action.payload,
        }
      }

    // =============== Default ================  
    default:
      return prevState;
  }
}

export default controlReducer;
