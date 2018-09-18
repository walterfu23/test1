import { put, takeEvery, call } from 'redux-saga/effects';
import {ActionTypesBizDoc} from '../constants/actionTypes';
import Api from '../apis/Api';

//==================================================================
function* fetchBizDocs(action) {
  try {
      const data = yield call(Api.getBizDocs);
      yield put({type: ActionTypesBizDoc.FETCH_BizDoc_SUCCESSFUL, data});
  } catch (error) {
      yield put({type: ActionTypesBizDoc.FETCH_BizDoc_FAILED, error});
  }
} 

export function * watchFetchBizDocs() {
  yield takeEvery(ActionTypesBizDoc.FETCH_BizDoc_REQUESTED, 
    fetchBizDocs);
}

//==================================================================
function* createBizDoc(action) {
    try {
        console.log('createBizDoc', action);
        const data = yield call(Api.createBizDoc, ...action.payload);
//        yield put({type: ActionTypesBizDoc.CREATE_BizDoc_SUCCESSFUL, data});
    } catch (error) {
        yield put({type: ActionTypesBizDoc.CREATE_BizDoc_FAILED, error});
    }
}

export function* watchCreateBizDoc() {
    yield takeEvery(ActionTypesBizDoc.CREATE_BizDoc_REQUESTED,
        createBizDoc);
}
//==================================================================
