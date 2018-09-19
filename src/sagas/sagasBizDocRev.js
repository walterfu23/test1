import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionBizDocRev from '../actions/actionBizDocRev';
import Api from '../apis/Api';

//====================================================================
export default function* watchFetchBizDocRevs() {
  yield takeEvery(actionBizDocRev.FETCH_BizDocRev_REQUESTED, fetchBizDocRevs);
}

export function* fetchBizDocRevs(action) {
  try {
    const data = yield call(Api.getBizDocRevs);
    yield put(actionGen(actionBizDocRev.FETCH_BizDocRev_SUCCESSFUL, data));
  } catch (error) {
    yield put(actionGen(actionBizDocRev.FETCH_BizDocRev_FAILED, error));
  }
}

