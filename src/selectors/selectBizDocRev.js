import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import BizDocRev from '../orm/modelBizDocRev';

export const createBizDocRevTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelBizDocRevs = session.BizDocRev.all().toModelArray();
    return BizDocRev.modelArrayToJson(modelBizDocRevs);
  }
);

export const createBizDocRevListSelector = createBizDocRevTreeSelector;
