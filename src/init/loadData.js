import actionGen from '../actions/actionGen';
import actionControl from '../actions/actionControl';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import actionBizPageField from '../actions/actionBizPageField';
import actionTopLevelList from '../actions/actionTopLevelList';
import actionJob from '../actions/actionJob';
import actionCategory from '../actions/actionCategory';
import actionSubCategory from '../actions/actionSubCategory';

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
  loadJob(store);
  loadCategory(store);
  loadSubCategory(store);
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

const loadJob = storeOrm => {
  storeOrm.dispatch(actionGen(actionJob.FETCH_Job_REQUESTED));
}

const loadCategory = storeOrm => {
  storeOrm.dispatch(actionGen(actionCategory.FETCH_Category_REQUESTED));
}

const loadSubCategory = storeOrm => {
  storeOrm.dispatch(actionGen(actionSubCategory.FETCH_SubCategory_REQUESTED));
}

export default loadData;
