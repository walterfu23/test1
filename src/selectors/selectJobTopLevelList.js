import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import JobTopLevelList from '../orm/modelJobTopLevelList';

export const createJobTopLevelListTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelJobTopLevelLists = session.JobTopLevelList.all().toModelArray();
    return JobTopLevelList.modelArrayToJson(modelJobTopLevelLists);
  }
);

export const createJobTopLevelListListSelector = createJobTopLevelListTreeSelector;
