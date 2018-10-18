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
  BizPageField: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
  TopLevelList: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
  Job: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
  Category: {
    showLoading: false,  // true: show the loading panel
    showForm: false,     // true: show the Add/Edit form
    current: {},         // currently selected rec
  },
  SubCategory: {
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

    // =============== BizPageField ================  
    case actionControl.SHOW_LOADING_BizPageField:
      return {
        ...prevState,
        BizPageField: {
          ...prevState.BizPageField,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_BizPageField:
      return {
        ...prevState,
        BizPageField: {
          ...prevState.BizPageField,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_BizPageField:
      return {
        ...prevState,
        BizPageField: {
          ...prevState.BizPageField,
          current: action.payload,
        }
      }

    // =============== TopLevelList ================  
    case actionControl.SHOW_LOADING_TopLevelList:
      return {
        ...prevState,
        TopLevelList: {
          ...prevState.TopLevelList,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_TopLevelList:
      return {
        ...prevState,
        TopLevelList: {
          ...prevState.TopLevelList,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_TopLevelList:
      return {
        ...prevState,
        TopLevelList: {
          ...prevState.TopLevelList,
          current: action.payload,
        }
      }

    // =============== Job ================  
    case actionControl.SHOW_LOADING_Job:
      return {
        ...prevState,
        Job: {
          ...prevState.Job,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_Job:
      return {
        ...prevState,
        Job: {
          ...prevState.Job,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_Job:
      return {
        ...prevState,
        Job: {
          ...prevState.Job,
          current: action.payload,
        }
      }

    // =============== Category ================  
    case actionControl.SHOW_LOADING_Category:
      return {
        ...prevState,
        Category: {
          ...prevState.Category,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_Category:
      return {
        ...prevState,
        Category: {
          ...prevState.Category,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_Category:
      return {
        ...prevState,
        Category: {
          ...prevState.Category,
          current: action.payload,
        }
      }

    // =============== SubCategory ================  
    case actionControl.SHOW_LOADING_SubCategory:
      return {
        ...prevState,
        SubCategory: {
          ...prevState.SubCategory,
          showLoading: action.payload,
        }
      };
    case actionControl.SHOW_FORM_SubCategory:
      return {
        ...prevState,
        SubCategory: {
          ...prevState.SubCategory,
          showForm: action.payload,
        }
      };
    case actionControl.CTRL_UPD_CRNT_SubCategory:
      return {
        ...prevState,
        SubCategory: {
          ...prevState.SubCategory,
          current: action.payload,
        }
      }

    // =============== Default ================  
    default:
      return prevState;
  }
}

export default controlReducer;
