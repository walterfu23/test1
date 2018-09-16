import { createSelector } from 'redux-orm';
import orm from '../orm/orm';

export const createBizDocTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelBizDocs = session.BizDoc.all().toModelArray();
    return modelBizDocs.map(
      modelBizDoc => modelBizDoc.toJson()
    );
  }
);

export const createBizDocListSelector =  createBizDocTreeSelector;
