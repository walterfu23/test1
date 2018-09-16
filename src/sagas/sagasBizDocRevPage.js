import { put, takeEvery, call } from 'redux-saga/effects';
import { ActionTypesBizDocRevPage } from '../constants/actionTypes';
import Api from '../apis/Api';

function* fetchBizDocRevPages(action) {
    try {
        const data = yield call(Api.getBizDocRevPages);
        yield put({ type: ActionTypesBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL, data });
    } catch (error) {
        yield put({ type: ActionTypesBizDocRevPage.FETCH_BizDocRevPage_FAILED, error });
    }
}

export default function* watchFetchBizDocRevPages() {
    yield takeEvery(ActionTypesBizDocRevPage.FETCH_BizDocRevPage_REQUESTED,
        fetchBizDocRevPages);
}

