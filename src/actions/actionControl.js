import actionGen from './actionGen';

// action types 
const LOAD_USER_INFO = 'LOAD_USER_INFO';
const SHOW_LOADING_BizDoc = 'SHOW_LOADING_BizDoc';
const SHOW_FORM_BizDoc = 'SHOW_FORM_BizDoc';
const SHOW_LOADING_BizDocRev = 'SHOW_LOADING_BizDocRev';
const SHOW_FORM_BizDocRev = 'SHOW_FORM_BizDocRev';

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

// things exported thru the default
const actionControl = {
  LOAD_USER_INFO,
  SHOW_LOADING_BizDoc,
  SHOW_FORM_BizDoc,
  SHOW_LOADING_BizDocRev,
  SHOW_FORM_BizDocRev,
  
  getUserInfo: (state) => getUserInfo(state),
  setUserInfo: (userInfo) => setUserInfo(userInfo),

  getShowLoadingBizDoc: (state) => getShowLoadingBizDoc(state),
  setShowLoadingBizDoc: (showFlag) => setShowLoadingBizDoc(showFlag),
  getShowLoadingBizDocRev: (state) => getShowLoadingBizDocRev(state),
  setShowLoadingBizDocRev: (showFlag) => setShowLoadingBizDocRev(showFlag),

  getShowFormBizDoc: (state) => getShowFormBizDoc(state),
  setShowFormBizDoc: (showFlag) => setShowFormBizDoc(showFlag),
  getShowFormBizDocRev: (state) => getShowFormBizDocRev(state),
  setShowFormBizDocRev: (showFlag) => setShowFormBizDocRev(showFlag),
}

export default actionControl;
