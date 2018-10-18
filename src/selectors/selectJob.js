import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import Job from '../orm/modelJob';

export const createJobTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelJobs = session.Job.all().toModelArray();
    return Job.modelArrayToJson(modelJobs);
  }
);

export const createJobListSelector = createJobTreeSelector;
