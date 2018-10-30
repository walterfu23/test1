import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionJobSubcatDoc from '../actions/actionJobSubcatDoc';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchJobSubcatDocs() {
  yield takeEvery(actionJobSubcatDoc.FETCH_JobSubcatDoc_REQUESTED, fetchJobSubcatDocs);
}

function* fetchJobSubcatDocs(action) {
  try {
    yield put(actionControl.setShowLoadingJobSubcatDoc(true));  // show loading panel
    const data = yield call(Api.getRecs, 'JobSubcatDoc');
    yield put(actionGen(actionJobSubcatDoc.FETCH_JobSubcatDoc_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingJobSubcatDoc(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('JobSubcatDoc_main', error));
  }
}

//==================================================================
export function* watchCreateJobSubcatDoc() {
  yield takeEvery(actionJobSubcatDoc.CREATE_JobSubcatDoc_REQUESTED, createJobSubcatDoc);
}

function* createJobSubcatDoc(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'JobSubcatDoc', recPure);
    yield put(actionGen(actionJobSubcatDoc.CREATE_JobSubcatDoc_SUCCESSFUL, data));
    yield put(actionControl.setShowFormJobSubcatDoc(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('JobSubcatDoc_form', error));
  }
}

//==================================================================
export function* watchDeleteJobSubcatDoc() {
  yield takeEvery(actionJobSubcatDoc.DELETE_JobSubcatDoc_REQUESTED, deleteJobSubcatDoc);
}

function* deleteJobSubcatDoc(action) {
  try {
    yield call(Api.deleteRec, 'JobSubcatDoc', action.payload);
    yield put(actionGen(actionJobSubcatDoc.DELETE_JobSubcatDoc_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentJobSubcatDoc({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('JobSubcatDoc_main', error));
  }
}

//==================================================================
export function* watchUpdateJobSubcatDoc() {
  yield takeEvery(actionJobSubcatDoc.UPDATE_JobSubcatDoc_REQUESTED, updateJobSubcatDoc);
}

function* updateJobSubcatDoc(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    console.log('recPure', recPure);
    yield call(Api.updateRec, 'JobSubcatDoc', recPure);
    yield put(actionGen(actionJobSubcatDoc.UPDATE_JobSubcatDoc_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentJobSubcatDoc(rec));  // update the current rec
    yield put(actionControl.setShowFormJobSubcatDoc(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('JobSubcatDoc_form', error));
  }
}

//==================================================================
