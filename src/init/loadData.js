import actionGen from '../actions/actionGen';
import actionControl from '../actions/actionControl';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import actionBizPageField from '../actions/actionBizPageField';
import actionTopLevelList from '../actions/actionTopLevelList';
import actionCategory from '../actions/actionCategory';
import actionSubCategory from '../actions/actionSubCategory';
import actionJob from '../actions/actionJob';
import actionJobTopLevelList from '../actions/actionJobTopLevelList';
import actionJobSubcatDoc from '../actions/actionJobSubcatDoc';

// const action = (store, type) => {
//   store.dispatch({ type });
// }

const loadData = store => {
  loadBizDoc(store);
  loadBizDocRev(store);
  loadBizDocRevPage(store);
  loadBizPageField(store);
  loadUserInfo(store);
  loadTopLevelList(store);
  loadCategory(store);
  loadSubCategory(store);
  loadJob(store);
  loadJobTopLevelList(store);
  loadJobSubcatDoc(store);
}

const loadBizDoc = storeOrm => {
  storeOrm.dispatch(actionGen(actionBizDoc.FETCH_BizDoc_REQUESTED));
}

const loadBizDocRev = storeOrm => {
  storeOrm.dispatch(actionGen(actionBizDocRev.FETCH_BizDocRev_REQUESTED));
}

const loadBizDocRevPage = storeOrm => {
  storeOrm.dispatch(actionGen(actionBizDocRevPage.FETCH_BizDocRevPage_REQUESTED));
}

const loadBizPageField = storeOrm => {
  storeOrm.dispatch(actionGen(actionBizPageField.FETCH_BizPageField_REQUESTED));
}

const loadUserInfo = store => {
  //  store.dispatch(actionControl.fetchUserInfo());
  const userInfoDef = {
    uid: window.drpUid || 'fuw0',    // drpUid is the variable defined in the asp.net
  }
  store.dispatch(actionControl.setUserInfo(userInfoDef));
}

const loadTopLevelList = storeOrm => {
  storeOrm.dispatch(actionGen(actionTopLevelList.FETCH_TopLevelList_REQUESTED));
}

const loadCategory = storeOrm => {
  storeOrm.dispatch(actionGen(actionCategory.FETCH_Category_REQUESTED));
}

const loadSubCategory = storeOrm => {
  storeOrm.dispatch(actionGen(actionSubCategory.FETCH_SubCategory_REQUESTED));
}

const loadJob = storeOrm => {
  storeOrm.dispatch(actionGen(actionJob.FETCH_Job_REQUESTED));
}

const loadJobTopLevelList = storeOrm => {
  storeOrm.dispatch(actionGen(actionJobTopLevelList.FETCH_JobTopLevelList_REQUESTED));
}

const loadJobSubcatDoc = storeOrm => {
  storeOrm.dispatch(actionGen(actionJobSubcatDoc.FETCH_JobSubcatDoc_REQUESTED));
}

export default loadData;
