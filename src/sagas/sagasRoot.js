import { all } from 'redux-saga/effects';
import { 
  watchFetchBizDocs, 
  watchCreateBizDoc,
  watchDeleteBizDoc,
  watchUpdateBizDoc,
} from './sagasBizDoc';
import watchFetchBizDocRevs from './sagasBizDocRev';
import watchFetchBizDocRevPages from './sagasBizDocRevPage';

export default function* rootSaga() {
  yield all([
    watchFetchBizDocs(),
    watchCreateBizDoc(),
    watchDeleteBizDoc(),
    watchUpdateBizDoc(),

    watchFetchBizDocRevs(),
    watchFetchBizDocRevPages(),
  ]);
}
