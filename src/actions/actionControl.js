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

// ============= BizPageField =================
const SHOW_LOADING_BizPageField = 'SHOW_LOADING_BizPageField';
const getShowLoadingBizPageField = (state) => {
  return state.control.BizPageField.showLoading;
}
const setShowLoadingBizPageField = (showFlag) => {
  return actionGen(SHOW_LOADING_BizPageField, showFlag);
}

const SHOW_FORM_BizPageField = 'SHOW_FORM_BizPageField';
const getShowFormBizPageField = (state) => {
  return state.control.BizPageField.showForm;
}
const setShowFormBizPageField = (showFlag) => {
  return actionGen(SHOW_FORM_BizPageField, showFlag);
}

const CTRL_UPD_CRNT_BizPageField = 'CTRL_UPD_CRNT_BizPageField';
const getCurrentBizPageField = (state) => {
  return state.control.BizPageField.current;
}
const setCurrentBizPageField = (bizPageField) => {
  return actionGen(CTRL_UPD_CRNT_BizPageField, bizPageField);
}

// ============= TopLevelList =================
const SHOW_LOADING_TopLevelList = 'SHOW_LOADING_TopLevelList';
const getShowLoadingTopLevelList = (state) => {
  return state.control.TopLevelList.showLoading;
}
const setShowLoadingTopLevelList = (showFlag) => {
  return actionGen(SHOW_LOADING_TopLevelList, showFlag);
}

const SHOW_FORM_TopLevelList = 'SHOW_FORM_TopLevelList';
const getShowFormTopLevelList = (state) => {
  return state.control.TopLevelList.showForm;
}
const setShowFormTopLevelList = (showFlag) => {
  return actionGen(SHOW_FORM_TopLevelList, showFlag);
}

const CTRL_UPD_CRNT_TopLevelList = 'CTRL_UPD_CRNT_TopLevelList';
const getCurrentTopLevelList = (state) => {
  return state.control.TopLevelList.current;
}
const setCurrentTopLevelList = (bizDoc) => {
  return actionGen(CTRL_UPD_CRNT_TopLevelList, bizDoc);
}

// ============= Category =================
const SHOW_LOADING_Category = 'SHOW_LOADING_Category';
const getShowLoadingCategory = (state) => {
  return state.control.Category.showLoading;
}
const setShowLoadingCategory = (showFlag) => {
  return actionGen(SHOW_LOADING_Category, showFlag);
}

const SHOW_FORM_Category = 'SHOW_FORM_Category';
const getShowFormCategory = (state) => {
  return state.control.Category.showForm;
}
const setShowFormCategory = (showFlag) => {
  return actionGen(SHOW_FORM_Category, showFlag);
}

const CTRL_UPD_CRNT_Category = 'CTRL_UPD_CRNT_Category';
const getCurrentCategory = (state) => {
  return state.control.Category.current;
}
const setCurrentCategory = (category) => {
  return actionGen(CTRL_UPD_CRNT_Category, category);
}

// ============= SubCategory =================
const SHOW_LOADING_SubCategory = 'SHOW_LOADING_SubCategory';
const getShowLoadingSubCategory = (state) => {
  return state.control.SubCategory.showLoading;
}
const setShowLoadingSubCategory = (showFlag) => {
  return actionGen(SHOW_LOADING_SubCategory, showFlag);
}

const SHOW_FORM_SubCategory = 'SHOW_FORM_SubCategory';
const getShowFormSubCategory = (state) => {
  return state.control.SubCategory.showForm;
}
const setShowFormSubCategory = (showFlag) => {
  return actionGen(SHOW_FORM_SubCategory, showFlag);
}

const CTRL_UPD_CRNT_SubCategory = 'CTRL_UPD_CRNT_SubCategory';
const getCurrentSubCategory = (state) => {
  return state.control.SubCategory.current;
}
const setCurrentSubCategory = (subCategory) => {
  return actionGen(CTRL_UPD_CRNT_SubCategory, subCategory);
}

// ============= Job =================
const SHOW_LOADING_Job = 'SHOW_LOADING_Job';
const getShowLoadingJob = (state) => {
  return state.control.Job.showLoading;
}
const setShowLoadingJob = (showFlag) => {
  return actionGen(SHOW_LOADING_Job, showFlag);
}

const SHOW_FORM_Job = 'SHOW_FORM_Job';
const getShowFormJob = (state) => {
  return state.control.Job.showForm;
}
const setShowFormJob = (showFlag) => {
  return actionGen(SHOW_FORM_Job, showFlag);
}

const CTRL_UPD_CRNT_Job = 'CTRL_UPD_CRNT_Job';
const getCurrentJob = (state) => {
  return state.control.Job.current;
}
const setCurrentJob = (Job) => {
  return actionGen(CTRL_UPD_CRNT_Job, Job);
}

// ============= JobTopLevelList =================
const SHOW_LOADING_JobTopLevelList = 'SHOW_LOADING_JobTopLevelList';
const getShowLoadingJobTopLevelList = (state) => {
  return state.control.JobTopLevelList.showLoading;
}
const setShowLoadingJobTopLevelList = (showFlag) => {
  return actionGen(SHOW_LOADING_JobTopLevelList, showFlag);
}

const SHOW_FORM_JobTopLevelList = 'SHOW_FORM_JobTopLevelList';
const getShowFormJobTopLevelList = (state) => {
  return state.control.JobTopLevelList.showForm;
}
const setShowFormJobTopLevelList = (showFlag) => {
  return actionGen(SHOW_FORM_JobTopLevelList, showFlag);
}

const CTRL_UPD_CRNT_JobTopLevelList = 'CTRL_UPD_CRNT_JobTopLevelList';
const getCurrentJobTopLevelList = (state) => {
  return state.control.JobTopLevelList.current;
}
const setCurrentJobTopLevelList = (JobTopLevelList) => {
  return actionGen(CTRL_UPD_CRNT_JobTopLevelList, JobTopLevelList);
}

//======================================================

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

  // ============= BizPageField =================
  SHOW_LOADING_BizPageField,
  getShowLoadingBizPageField: (state) => getShowLoadingBizPageField(state),
  setShowLoadingBizPageField: (showFlag) => setShowLoadingBizPageField(showFlag),

  SHOW_FORM_BizPageField,
  getShowFormBizPageField: (state) => getShowFormBizPageField(state),
  setShowFormBizPageField: (showFlag) => setShowFormBizPageField(showFlag),

  CTRL_UPD_CRNT_BizPageField,
  getCurrentBizPageField: (state) => getCurrentBizPageField(state),
  setCurrentBizPageField: (bizPageField) => setCurrentBizPageField(bizPageField),

  // ============= TopLevelList =================
  SHOW_LOADING_TopLevelList,
  getShowLoadingTopLevelList: (state) => getShowLoadingTopLevelList(state),
  setShowLoadingTopLevelList: (showFlag) => setShowLoadingTopLevelList(showFlag),

  SHOW_FORM_TopLevelList,
  getShowFormTopLevelList: (state) => getShowFormTopLevelList(state),
  setShowFormTopLevelList: (showFlag) => setShowFormTopLevelList(showFlag),

  CTRL_UPD_CRNT_TopLevelList,
  getCurrentTopLevelList: (state) => getCurrentTopLevelList(state),
  setCurrentTopLevelList: (bizDoc) => setCurrentTopLevelList(bizDoc),

  // ============= Category =================
  SHOW_LOADING_Category,
  getShowLoadingCategory: (state) => getShowLoadingCategory(state),
  setShowLoadingCategory: (showFlag) => setShowLoadingCategory(showFlag),

  SHOW_FORM_Category,
  getShowFormCategory: (state) => getShowFormCategory(state),
  setShowFormCategory: (showFlag) => setShowFormCategory(showFlag),

  CTRL_UPD_CRNT_Category,
  getCurrentCategory: (state) => getCurrentCategory(state),
  setCurrentCategory: (category) => setCurrentCategory(category),

  // ============= SubCategory =================
  SHOW_LOADING_SubCategory,
  getShowLoadingSubCategory: (state) => getShowLoadingSubCategory(state),
  setShowLoadingSubCategory: (showFlag) => setShowLoadingSubCategory(showFlag),

  SHOW_FORM_SubCategory,
  getShowFormSubCategory: (state) => getShowFormSubCategory(state),
  setShowFormSubCategory: (showFlag) => setShowFormSubCategory(showFlag),

  CTRL_UPD_CRNT_SubCategory,
  getCurrentSubCategory: (state) => getCurrentSubCategory(state),
  setCurrentSubCategory: (subCategory) => setCurrentSubCategory(subCategory),

  // ============= Job =================  
  SHOW_LOADING_Job,
  getShowLoadingJob: (state) => getShowLoadingJob(state),
  setShowLoadingJob: (showFlag) => setShowLoadingJob(showFlag),

  SHOW_FORM_Job,
  getShowFormJob: (state) => getShowFormJob(state),
  setShowFormJob: (showFlag) => setShowFormJob(showFlag),

  CTRL_UPD_CRNT_Job,
  getCurrentJob: (state) => getCurrentJob(state),
  setCurrentJob: (job) => setCurrentJob(job),

  // ============= JobTopLevelList =================  
  SHOW_LOADING_JobTopLevelList,
  getShowLoadingJobTopLevelList: (state) => getShowLoadingJobTopLevelList(state),
  setShowLoadingJobTopLevelList: (showFlag) => setShowLoadingJobTopLevelList(showFlag),

  SHOW_FORM_JobTopLevelList,
  getShowFormJobTopLevelList: (state) => getShowFormJobTopLevelList(state),
  setShowFormJobTopLevelList: (showFlag) => setShowFormJobTopLevelList(showFlag),

  CTRL_UPD_CRNT_JobTopLevelList,
  getCurrentJobTopLevelList: (state) => getCurrentJobTopLevelList(state),
  setCurrentJobTopLevelList: (JobTopLevelList) => setCurrentJobTopLevelList(JobTopLevelList),


}; // actionControl

export default actionControl;
