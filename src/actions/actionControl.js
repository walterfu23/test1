import actionGen from './actionGen';

// action types 
const SHOW_LOADING_BizDoc = 'SHOW_LOADING_BizDoc';
const SHOW_FORM_BizDoc = 'SHOW_FORM_BizDoc';

// loading panel. true: show the panel
const getShowLoadingBizDoc = (state) => {
  return state.control.BizDoc.showLoading;
}
const setShowLoadingBizDoc = (showFlag) => {
  return actionGen(SHOW_LOADING_BizDoc, showFlag);
}

// BizDoc form. true: show the form
const getShowFormBizDoc = (state) => {
  return state.control.BizDoc.showForm;
}
const setShowFormBizDoc = (showFlag) => {
  return actionGen(SHOW_FORM_BizDoc, showFlag);
}

// things exported thru the default
const actionControl = {
  SHOW_LOADING_BizDoc,
  SHOW_FORM_BizDoc,
  
  getShowLoadingBizDoc: (state) => getShowLoadingBizDoc(state),
  setShowLoadingBizDoc: (showFlag) => setShowLoadingBizDoc(showFlag),

  getShowFormBizDoc: (state) => getShowFormBizDoc(state),
  setShowFormBizDoc: (showFlag) => setShowFormBizDoc(showFlag),
}

export default actionControl;
