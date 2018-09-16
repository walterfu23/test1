import { put, takeEvery, call } from 'redux-saga/effects';
import {ActionTypesBizDocRev} from '../constants/actionTypes';
import Api from '../apis/Api';

export function * fetchBizDocRevs(action) {
  try {
      const data = yield call(Api.getBizDocRevs);
      yield put({type: ActionTypesBizDocRev.FETCH_BizDocRev_SUCCESSFUL, data});
  } catch (error) {
      yield put({type: ActionTypesBizDocRev.FETCH_BizDocRev_FAILED, error});
  }
} 

export default function * watchFetchBizDocRevs() {
  yield takeEvery(ActionTypesBizDocRev.FETCH_BizDocRev_REQUESTED, 
    fetchBizDocRevs);
}

