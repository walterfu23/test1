import { all } from 'redux-saga/effects';
import watchIncrementAsync from './sagasCounter';
import { 
  watchFetchBizDocs, 
  watchCreateBizDoc,
} from './sagasBizDoc';
import watchFetchBizDocRevs from './sagasBizDocRev';
import watchFetchBizDocRevPages from './sagasBizDocRevPage';

export default function* rootSaga() {
  yield all([
    watchIncrementAsync(),
    watchFetchBizDocs(),
    watchCreateBizDoc(),
    watchFetchBizDocRevs(),
    watchFetchBizDocRevPages(),
  ]);
}
