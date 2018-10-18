import { put, takeEvery, call } from 'redux-saga/effects';
import actionGen from '../actions/actionGen';
import actionError from '../actions/actionError';
import actionControl from '../actions/actionControl';
import actionCategory from '../actions/actionCategory';
import Api from '../apis/Api';
import utils from '../utils/utils';
import AppConst from '../utils/AppConst';

//==================================================================
export function* watchFetchCategorys() {
  yield takeEvery(actionCategory.FETCH_Category_REQUESTED, fetchCategorys);
}

function* fetchCategorys(action) {
  try {
    yield put(actionControl.setShowLoadingCategory(true));  // show loading panel
    const data = yield call(Api.getRecs, 'Category');
    yield put(actionGen(actionCategory.FETCH_Category_SUCCESSFUL, data));
    yield put(actionControl.setShowLoadingCategory(false));  // hide loading panel
  } catch (error) {
    yield put(actionError.reportStateError('Category_main', error));
  }
}

//==================================================================
export function* watchCreateCategory() {
  yield takeEvery(actionCategory.CREATE_Category_REQUESTED, createCategory);
}

function* createCategory(action) {
  try {
    yield put(actionError.clearStateError);
    const recPure = utils.cloneDelProps(action.payload, 'Id', ...AppConst.ADDED_FIELDS);
    const data = yield call(Api.createRec, 'Category', recPure);
    yield put(actionGen(actionCategory.CREATE_Category_SUCCESSFUL, data));
    yield put(actionControl.setShowFormCategory(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('Category_form', error));
  }
}

//==================================================================
export function* watchDeleteCategory() {
  yield takeEvery(actionCategory.DELETE_Category_REQUESTED, deleteCategory);
}

function* deleteCategory(action) {
  try {
    yield call(Api.deleteRec, 'Category', action.payload);
    yield put(actionGen(actionCategory.DELETE_Category_SUCCESSFUL, action.payload));
    yield put(actionControl.setCurrentCategory({}));  // update the current rec
  } catch (error) {
    yield put(actionError.reportStateError('Category_main', error));
  }
}

//==================================================================
export function* watchUpdateCategory() {
  yield takeEvery(actionCategory.UPDATE_Category_REQUESTED, updateCategory);
}

function* updateCategory(action) {
  try {
    const rec = yield call(Api.updateRecPrep, action.payload);
    const recPure = utils.cloneDelProps(rec, ...AppConst.ADDED_FIELDS);
    yield call(Api.updateRec, 'Category', recPure);
    yield put(actionGen(actionCategory.UPDATE_Category_SUCCESSFUL, rec));
    yield put(actionControl.setCurrentCategory(rec));  // update the current rec
    yield put(actionControl.setShowFormCategory(false));  // hide the form
  } catch (error) {
    yield put(actionError.reportStateError('Category_form', error));
  }
}

//==================================================================
