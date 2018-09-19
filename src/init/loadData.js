import actionGen from '../actions/actionGen';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';

// const action = (store, type) => {
//   store.dispatch({ type });
// }

const loadData = store => {
  loadBizDoc(store);
  loadBizDocRev(store);
  loadBizDocRevPage(store);
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

export default loadData;
