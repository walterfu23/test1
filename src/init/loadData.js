import {
  ActionTypesBizDoc, 
  ActionTypesBizDocRev,
  ActionTypesBizDocRevPage,
} from '../constants/actionTypes';

const action = (store, type) => {
  store.dispatch({ type });
}

const loadData = store => {
  loadBizDoc(store);
  loadBizDocRev(store);
  loadBizDocRevPage(store);
}

const loadBizDoc = storeOrm => {
  action(storeOrm, ActionTypesBizDoc.FETCH_BizDoc_REQUESTED);
}

const loadBizDocRev = storeOrm => {
  action(storeOrm, ActionTypesBizDocRev.FETCH_BizDocRev_REQUESTED);
}

const loadBizDocRevPage = storeOrm => {
  action(storeOrm, ActionTypesBizDocRevPage.FETCH_BizDocRevPage_REQUESTED);
}

export default loadData;
