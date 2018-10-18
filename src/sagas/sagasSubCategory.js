import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionSubCategory from '../actions/actionSubCategory';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchSubCategorys() {
  yield takeEvery(actionSubCategory.FETCH_SubCategory_REQUESTED, fetchSubCategorys);
}

function* fetchSubCategorys(action) {
  try {
    yield put(actionControl.setShowLoadingSubCategory(true));  // show loading panel
    const data = yield call(Api.getRecs, 'SubCategory');
    yield put(actionGen(actionSubCategory.FETCH_SubCategory_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingSubCategory(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('SubCategory_main', error));
  }
}

//==================================================================
export function* watchCreateSubCategory() {
  yield takeEvery(actionSubCategory.CREATE_SubCategory_REQUESTED, createSubCategory);
}

function* createSubCategory(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'SubCategory', recPure);
    yield put(actionGen(actionSubCategory.CREATE_SubCategory_SUCCESSFUL, data));
    yield put(actionControl.setShowFormSubCategory(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('SubCategory_form', error));
  }
}

//==================================================================
export function* watchDeleteSubCategory() {
  yield takeEvery(actionSubCategory.DELETE_SubCategory_REQUESTED, deleteSubCategory);
}

function* deleteSubCategory(action) {
  try {
    yield call(Api.deleteRec, 'SubCategory', action.payload);
    yield put(actionGen(actionSubCategory.DELETE_SubCategory_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentSubCategory({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('SubCategory_main', error));
  }
}

//==================================================================
export function* watchUpdateSubCategory() {
  yield takeEvery(actionSubCategory.UPDATE_SubCategory_REQUESTED, updateSubCategory);
}

function* updateSubCategory(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'SubCategory', recPure);
    yield put(actionGen(actionSubCategory.UPDATE_SubCategory_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentSubCategory(rec));  // update the current rec
    yield put(actionControl.setShowFormSubCategory(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('SubCategory_form', error));
  }
}

//==================================================================
