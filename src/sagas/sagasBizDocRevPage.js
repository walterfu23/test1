import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import Api from '../apis/Api';

//================================================================
export default function* watchFetchBizDocRevPages() {
    yield takeEvery(actionBizDocRevPage.FETCH_BizDocRevPage_REQUESTED,
        fetchBizDocRevPages);
}

function* fetchBizDocRevPages(action) {
    try {
        const data = yield call(Api.getBizDocRevPages);
        yield put(
            actionGen(
                actionBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL,
                data
            )
        );
    } catch (error) {
        yield put(
            actionGen(
                actionBizDocRevPage.FETCH_BizDocRevPage_FAILED,
                error
            )
        );
    }
}

