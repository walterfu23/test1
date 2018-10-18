import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import TopLevelList from '../orm/modelTopLevelList';

export const createTopLevelListTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelTopLevelLists = session.TopLevelList.all().toModelArray();
    return TopLevelList.modelArrayToJson(modelTopLevelLists);
  }
);

export const createTopLevelListListSelector =  createTopLevelListTreeSelector;
