import { all } from 'redux-saga/effects';
import {
  watchFetchBizDocs,
  watchCreateBizDoc,
  watchDeleteBizDoc,
  watchUpdateBizDoc,
} from './sagasBizDoc';
import {
  watchFetchBizDocRevs,
  watchCreateBizDocRev,
  watchDeleteBizDocRev,
  watchUpdateBizDocRev,
} from './sagasBizDocRev';
import {
  watchFetchBizDocRevPages,
  watchCreateBizDocRevPage,
  watchDeleteBizDocRevPage,
  watchUpdateBizDocRevPage,
} from './sagasBizDocRevPage';
import {
  watchFetchBizPageFields,
  watchCreateBizPageField,
  watchDeleteBizPageField,
  watchUpdateBizPageField,
} from './sagasBizPageField';
import {
  watchFetchTopLevelLists,
  watchCreateTopLevelList,
  watchDeleteTopLevelList,
  watchUpdateTopLevelList,
} from './sagasTopLevelList';
import {
  watchFetchCategorys,
  watchCreateCategory,
  watchDeleteCategory,
  watchUpdateCategory,
} from './sagasCategory';
import {
  watchFetchSubCategorys,
  watchCreateSubCategory,
  watchDeleteSubCategory,
  watchUpdateSubCategory,
} from './sagasSubCategory';
import {
  watchFetchJobs,
  watchCreateJob,
  watchDeleteJob,
  watchUpdateJob,
} from './sagasJob';
import {
  watchFetchJobTopLevelLists,
  watchCreateJobTopLevelList,
  watchDeleteJobTopLevelList,
  watchUpdateJobTopLevelList,
} from './sagasJobTopLevelList';

export default function* rootSaga() {
  yield all([
    watchFetchBizDocs(),
    watchCreateBizDoc(),
    watchDeleteBizDoc(),
    watchUpdateBizDoc(),

    watchFetchBizDocRevs(),
    watchCreateBizDocRev(),
    watchDeleteBizDocRev(),
    watchUpdateBizDocRev(),

    watchFetchBizDocRevPages(),
    watchCreateBizDocRevPage(),
    watchDeleteBizDocRevPage(),
    watchUpdateBizDocRevPage(),

    watchFetchBizPageFields(),
    watchCreateBizPageField(),
    watchDeleteBizPageField(),
    watchUpdateBizPageField(),

    watchFetchTopLevelLists(),
    watchCreateTopLevelList(),
    watchDeleteTopLevelList(),
    watchUpdateTopLevelList(),

    watchFetchCategorys(),
    watchCreateCategory(),
    watchDeleteCategory(),
    watchUpdateCategory(),

    watchFetchSubCategorys(),
    watchCreateSubCategory(),
    watchDeleteSubCategory(),
    watchUpdateSubCategory(),

    watchFetchJobs(),
    watchCreateJob(),
    watchDeleteJob(),
    watchUpdateJob(),

    watchFetchJobTopLevelLists(),
    watchCreateJobTopLevelList(),
    watchDeleteJobTopLevelList(),
    watchUpdateJobTopLevelList(),

  ]);
}
