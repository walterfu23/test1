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
  watchFetchJobs,
  watchCreateJob,
  watchDeleteJob,
  watchUpdateJob,
} from './sagasJob';
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

    watchFetchJobs(),
    watchCreateJob(),
    watchDeleteJob(),
    watchUpdateJob(),

    watchFetchCategorys(),
    watchCreateCategory(),
    watchDeleteCategory(),
    watchUpdateCategory(),

    watchFetchSubCategorys(),
    watchCreateSubCategory(),
    watchDeleteSubCategory(),
    watchUpdateSubCategory(),

  ]);
}
