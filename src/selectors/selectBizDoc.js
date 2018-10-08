import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import BizDoc from '../orm/modelBizDoc';

export const createBizDocTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelBizDocs = session.BizDoc.all().toModelArray();
    return BizDoc.modelArrayToJson(modelBizDocs);
  }
);

export const createBizDocListSelector =  createBizDocTreeSelector;
