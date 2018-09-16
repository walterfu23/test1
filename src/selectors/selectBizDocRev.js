import { createSelector } from 'redux-orm';
import orm from '../orm/orm';

export const createBizDocRevTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelBizDocRevs = session.BizDocRev.all().toModelArray();
    return modelBizDocRevs.map(
      modelBizDocRev => modelBizDocRev.toJson()
    );
  }
);

