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

  ]);
}
