import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionJob from '../actions/actionJob';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchJobs() {
  yield takeEvery(actionJob.FETCH_Job_REQUESTED, fetchJobs);
}

function* fetchJobs(action) {
  try {
    yield put(actionControl.setShowLoadingJob(true));  // show loading panel
    const data = yield call(Api.getRecs, 'Job');
    yield put(actionGen(actionJob.FETCH_Job_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingJob(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('Job_main', error));
  }
}

//==================================================================
export function* watchCreateJob() {
  yield takeEvery(actionJob.CREATE_Job_REQUESTED, createJob);
}

function* createJob(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'Job', recPure);
    yield put(actionGen(actionJob.CREATE_Job_SUCCESSFUL, data));
    yield put(actionControl.setShowFormJob(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('Job_form', error));
  }
}

//==================================================================
export function* watchDeleteJob() {
  yield takeEvery(actionJob.DELETE_Job_REQUESTED, deleteJob);
}

function* deleteJob(action) {
  try {
    yield call(Api.deleteRec, 'Job', action.payload);
    yield put(actionGen(actionJob.DELETE_Job_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentJob({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('Job_main', error));
  }
}

//==================================================================
export function* watchUpdateJob() {
  yield takeEvery(actionJob.UPDATE_Job_REQUESTED, updateJob);
}

function* updateJob(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'Job', recPure);
    yield put(actionGen(actionJob.UPDATE_Job_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentJob(rec));  // update the current rec
    yield put(actionControl.setShowFormJob(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('Job_form', error));
  }
}

//==================================================================
