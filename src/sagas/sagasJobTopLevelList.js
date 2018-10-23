import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionJobTopLevelList from '../actions/actionJobTopLevelList';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchJobTopLevelLists() {
  yield takeEvery(actionJobTopLevelList.FETCH_JobTopLevelList_REQUESTED, fetchJobTopLevelLists);
}

function* fetchJobTopLevelLists(action) {
  try {
    yield put(actionControl.setShowLoadingJobTopLevelList(true));  // show loading panel
    const data = yield call(Api.getRecs, 'JobTopLevelList');
    yield put(actionGen(actionJobTopLevelList.FETCH_JobTopLevelList_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingJobTopLevelList(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('JobTopLevelList_main', error));
  }
}

//==================================================================
export function* watchCreateJobTopLevelList() {
  yield takeEvery(actionJobTopLevelList.CREATE_JobTopLevelList_REQUESTED, createJobTopLevelList);
}

function* createJobTopLevelList(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'JobTopLevelList', recPure);
    yield put(actionGen(actionJobTopLevelList.CREATE_JobTopLevelList_SUCCESSFUL, data));
    yield put(actionControl.setShowFormJobTopLevelList(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('JobTopLevelList_form', error));
  }
}

//==================================================================
export function* watchDeleteJobTopLevelList() {
  yield takeEvery(actionJobTopLevelList.DELETE_JobTopLevelList_REQUESTED, deleteJobTopLevelList);
}

function* deleteJobTopLevelList(action) {
  try {
    yield call(Api.deleteRec, 'JobTopLevelList', action.payload);
    yield put(actionGen(actionJobTopLevelList.DELETE_JobTopLevelList_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentJobTopLevelList({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('JobTopLevelList_main', error));
  }
}

//==================================================================
export function* watchUpdateJobTopLevelList() {
  yield takeEvery(actionJobTopLevelList.UPDATE_JobTopLevelList_REQUESTED, updateJobTopLevelList);
}

function* updateJobTopLevelList(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'JobTopLevelList', recPure);
    yield put(actionGen(actionJobTopLevelList.UPDATE_JobTopLevelList_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentJobTopLevelList(rec));  // update the current rec
    yield put(actionControl.setShowFormJobTopLevelList(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('JobTopLevelList_form', error));
  }
}

//==================================================================
