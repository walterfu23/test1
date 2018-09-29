import actionGen from './actionGen';

// ============= UserInfo =================
const FETCH_USER_INFO_REQUESTED = 'FETCH_USER_INFO_REQUESTED';
const FETCH_USER_INFO_SUCCESSFUL = 'FETCH_USER_INFO_SUCCESSFUL';
const FETCH_USER_INFO_FAILED = 'FETCH_USER_INFO_FAILED';
const fetchUserInfo = () => {
  return actionGen(FETCH_USER_INFO_REQUESTED);
}

const SET_USER_INFO = 'SET_USER_INFO';
const getUserInfo = (state) => {
  return state.control.UserInfo;
}
const setUserInfo = (userInfo) => {
  return actionGen(SET_USER_INFO, userInfo);
}

// ============= BizDoc =================
const SHOW_LOADING_BizDoc = 'SHOW_LOADING_BizDoc';
const getShowLoadingBizDoc = (state) => {
  return state.control.BizDoc.showLoading;
}
const setShowLoadingBizDoc = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDoc, showFlag);
}

const SHOW_FORM_BizDoc = 'SHOW_FORM_BizDoc';
const getShowFormBizDoc = (state) => {
  return state.control.BizDoc.showForm;
}
const setShowFormBizDoc = (showFlag) => {
  return actionGen(SHOW_FORM_BizDoc, showFlag);
}

const CTRL_UPD_CRNT_BizDoc = 'CTRL_UPD_CRNT_BizDoc';
const getCurrentBizDoc = (state) => {
  return state.control.BizDoc.current;
}
const setCurrentBizDoc = (bizDoc) => {
  return actionGen(CTRL_UPD_CRNT_BizDoc, bizDoc);
}

// ============= BizDocRev =================
const SHOW_LOADING_BizDocRev = 'SHOW_LOADING_BizDocRev';
const getShowLoadingBizDocRev = (state) => {
  return state.control.BizDocRev.showLoading;
}
const setShowLoadingBizDocRev = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDocRev, showFlag);
}

const SHOW_FORM_BizDocRev = 'SHOW_FORM_BizDocRev';
const getShowFormBizDocRev = (state) => {
  return state.control.BizDocRev.showForm;
}
const setShowFormBizDocRev = (showFlag) => {
  return actionGen(SHOW_FORM_BizDocRev, showFlag);
}

const CTRL_UPD_CRNT_BizDocRev = 'CTRL_UPD_CRNT_BizDocRev';
const getCurrentBizDocRev = (state) => {
  return state.control.BizDocRev.current;
}
const setCurrentBizDocRev = (bizDocRev) => {
  return actionGen(CTRL_UPD_CRNT_BizDocRev, bizDocRev);
}

// ============= BizDocRevPage =================
const SHOW_LOADING_BizDocRevPage = 'SHOW_LOADING_BizDocRevPage';
const getShowLoadingBizDocRevPage = (state) => {
  return state.control.BizDocRevPage.showLoading;
}
const setShowLoadingBizDocRevPage = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDocRevPage, showFlag);
}

const SHOW_FORM_BizDocRevPage = 'SHOW_FORM_BizDocRevPage';
const getShowFormBizDocRevPage = (state) => {
  return state.control.BizDocRevPage.showForm;
}
const setShowFormBizDocRevPage = (showFlag) => {
  return actionGen(SHOW_FORM_BizDocRevPage, showFlag);
}

const CTRL_UPD_CRNT_BizDocRevPage = 'CTRL_UPD_CRNT_BizDocRevPage';
const getCurrentBizDocRevPage = (state) => {
  return state.control.BizDocRevPage.current;
}
const setCurrentBizDocRevPage = (bizDocRevPage) => {
  return actionGen(CTRL_UPD_CRNT_BizDocRevPage, bizDocRevPage);
}

// things exported thru the default
const actionControl = {
  // ============= UserInfo =================
  FETCH_USER_INFO_REQUESTED,
  FETCH_USER_INFO_SUCCESSFUL,
  FETCH_USER_INFO_FAILED,
  fetchUserInfo: () => fetchUserInfo(),

  SET_USER_INFO,
  getUserInfo: (state) => getUserInfo(state),
  setUserInfo: (userInfo) => setUserInfo(userInfo),

  // ============= BizDoc =================
  SHOW_LOADING_BizDoc,
  getShowLoadingBizDoc: (state) => getShowLoadingBizDoc(state),
  setShowLoadingBizDoc: (showFlag) => setShowLoadingBizDoc(showFlag),

  SHOW_FORM_BizDoc,
  getShowFormBizDoc: (state) => getShowFormBizDoc(state),
  setShowFormBizDoc: (showFlag) => setShowFormBizDoc(showFlag),

  CTRL_UPD_CRNT_BizDoc,
  getCurrentBizDoc: (state) => getCurrentBizDoc(state),
  setCurrentBizDoc: (bizDoc) => setCurrentBizDoc(bizDoc),

  // ============= BizDocRev =================  
  SHOW_LOADING_BizDocRev,
  getShowLoadingBizDocRev: (state) => getShowLoadingBizDocRev(state),
  setShowLoadingBizDocRev: (showFlag) => setShowLoadingBizDocRev(showFlag),

  SHOW_FORM_BizDocRev,
  getShowFormBizDocRev: (state) => getShowFormBizDocRev(state),
  setShowFormBizDocRev: (showFlag) => setShowFormBizDocRev(showFlag),

  CTRL_UPD_CRNT_BizDocRev,
  getCurrentBizDocRev: (state) => getCurrentBizDocRev(state),
  setCurrentBizDocRev: (bizDocRev) => setCurrentBizDocRev(bizDocRev),

  // ============= BizDocRevPage =================
  SHOW_LOADING_BizDocRevPage,
  getShowLoadingBizDocRevPage: (state) => getShowLoadingBizDocRevPage(state),
  setShowLoadingBizDocRevPage: (showFlag) => setShowLoadingBizDocRevPage(showFlag),

  SHOW_FORM_BizDocRevPage,
  getShowFormBizDocRevPage: (state) => getShowFormBizDocRevPage(state),
  setShowFormBizDocRevPage: (showFlag) => setShowFormBizDocRevPage(showFlag),

  CTRL_UPD_CRNT_BizDocRevPage,
  getCurrentBizDocRevPage: (state) => getCurrentBizDocRevPage(state),
  setCurrentBizDocRevPage: (bizDocRevPage) => setCurrentBizDocRevPage(bizDocRevPage),

}; // actionControl

export default actionControl;
