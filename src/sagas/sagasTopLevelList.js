import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionTopLevelList from '../actions/actionTopLevelList';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchTopLevelLists() {
  yield takeEvery(actionTopLevelList.FETCH_TopLevelList_REQUESTED, fetchTopLevelLists);
}

function* fetchTopLevelLists(action) {
  try {
    yield put(actionControl.setShowLoadingTopLevelList(true));  // show loading panel
    const data = yield call(Api.getRecs, 'TopLevelList');
    yield put(actionGen(actionTopLevelList.FETCH_TopLevelList_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingTopLevelList(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('TopLevelList_main', error));
  }
}

//==================================================================
export function* watchCreateTopLevelList() {
  yield takeEvery(actionTopLevelList.CREATE_TopLevelList_REQUESTED, createTopLevelList);
}

function* createTopLevelList(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'TopLevelList', recPure);
    yield put(actionGen(actionTopLevelList.CREATE_TopLevelList_SUCCESSFUL, data));
    yield put(actionControl.setShowFormTopLevelList(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('TopLevelList_form', error));
  }
}

//==================================================================
export function* watchDeleteTopLevelList() {
  yield takeEvery(actionTopLevelList.DELETE_TopLevelList_REQUESTED, deleteTopLevelList);
}

function* deleteTopLevelList(action) {
  try {
    yield call(Api.deleteRec, 'TopLevelList', action.payload);
    yield put(actionGen(actionTopLevelList.DELETE_TopLevelList_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentTopLevelList({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('TopLevelList_main', error));
  }
}

//==================================================================
export function* watchUpdateTopLevelList() {
  yield takeEvery(actionTopLevelList.UPDATE_TopLevelList_REQUESTED, updateTopLevelList);
}

function* updateTopLevelList(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'TopLevelList', recPure);
    yield put(actionGen(actionTopLevelList.UPDATE_TopLevelList_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentTopLevelList(rec));  // update the current rec
    yield put(actionControl.setShowFormTopLevelList(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('TopLevelList_form', error));
  }
}


//==================================================================
