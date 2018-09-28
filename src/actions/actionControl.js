import actionGen from './actionGen';

// action types 
const LOAD_USER_INFO = 'LOAD_USER_INFO';

const SHOW_LOADING_BizDoc = 'SHOW_LOADING_BizDoc';
const SHOW_FORM_BizDoc = 'SHOW_FORM_BizDoc';
const CTRL_UPD_CRNT_BizDoc = 'CTRL_UPD_CRNT_BizDoc';

const SHOW_LOADING_BizDocRev = 'SHOW_LOADING_BizDocRev';
const SHOW_FORM_BizDocRev = 'SHOW_FORM_BizDocRev';
const CTRL_UPD_CRNT_BizDocRev = 'CTRL_UPD_CRNT_BizDocRev';

// user info
const getUserInfo = (state) => {
  return state.control.UserInfo;
}
const setUserInfo = (userInfo) => {
  return actionGen(LOAD_USER_INFO, userInfo);
}

// loading panel. true: show the panel
const getShowLoadingBizDoc = (state) => {
  return state.control.BizDoc.showLoading;
}
const setShowLoadingBizDoc = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDoc, showFlag);
}

const getShowLoadingBizDocRev = (state) => {
  return state.control.BizDocRev.showLoading;
}
const setShowLoadingBizDocRev = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDocRev, showFlag);
}

// Add/Edit form. true: show the form
const getShowFormBizDoc = (state) => {
  return state.control.BizDoc.showForm;
}
const setShowFormBizDoc = (showFlag) => {
  return actionGen(SHOW_FORM_BizDoc, showFlag);
}

const getShowFormBizDocRev = (state) => {
  return state.control.BizDocRev.showForm;
}
const setShowFormBizDocRev = (showFlag) => {
  return actionGen(SHOW_FORM_BizDocRev, showFlag);
}

// update the current record
const getCurrentBizDoc = (state) => {
  return state.control.BizDoc.current;
}
const setCurrentBizDoc = (bizDoc) => {
  return actionGen(CTRL_UPD_CRNT_BizDoc, bizDoc);
}

const getCurrentBizDocRev = (state) => {
  return state.control.BizDocRev.current;
}
const setCurrentBizDocRev = (bizDocRev) => {
  return actionGen(CTRL_UPD_CRNT_BizDocRev, bizDocRev);
}

// things exported thru the default
const actionControl = {  
  LOAD_USER_INFO,
  getUserInfo: (state) => getUserInfo(state),
  setUserInfo: (userInfo) => setUserInfo(userInfo),

  SHOW_LOADING_BizDoc,
  getShowLoadingBizDoc: (state) => getShowLoadingBizDoc(state),
  setShowLoadingBizDoc: (showFlag) => setShowLoadingBizDoc(showFlag),

  SHOW_LOADING_BizDocRev,
  getShowLoadingBizDocRev: (state) => getShowLoadingBizDocRev(state),
  setShowLoadingBizDocRev: (showFlag) => setShowLoadingBizDocRev(showFlag),

  SHOW_FORM_BizDoc,
  getShowFormBizDoc: (state) => getShowFormBizDoc(state),
  setShowFormBizDoc: (showFlag) => setShowFormBizDoc(showFlag),

  SHOW_FORM_BizDocRev,
  getShowFormBizDocRev: (state) => getShowFormBizDocRev(state),
  setShowFormBizDocRev: (showFlag) => setShowFormBizDocRev(showFlag),

  CTRL_UPD_CRNT_BizDoc,
  getCurrentBizDoc: (state) => getCurrentBizDoc(state),
  setCurrentBizDoc: (bizDoc) => setCurrentBizDoc(bizDoc),

  CTRL_UPD_CRNT_BizDocRev,
  getCurrentBizDocRev: (state) => getCurrentBizDocRev(state),
  setCurrentBizDocRev: (bizDocRev) => setCurrentBizDocRev(bizDocRev),

}

export default actionControl;
