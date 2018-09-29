import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import Api from '../apis/Api';

//==================================================================
export default function* watchFetchUserInfo() {
  yield takeEvery(actionControl.FETCH_USER_INFO_REQUESTED, fetchUserInfo);
}

function* fetchUserInfo(action) {
  try {
    yield put(actionControl.setShowLoadingBizDoc(true));  // show loading panel
    const data = yield call(Api.fetchUserInfo);
    yield put(actionGen(actionControl.FETCH_USER_INFO_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingBizDoc(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('BizDoc_main', error));
  }
}


//==================================================================
