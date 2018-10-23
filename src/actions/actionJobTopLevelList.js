
// action types 
const FETCH_JobTopLevelList_REQUESTED = 'FETCH_JobTopLevelList_REQUESTED';
const FETCH_JobTopLevelList_SUCCESSFUL = 'FETCH_JobTopLevelList_SUCCESSFUL';
const FETCH_JobTopLevelList_FAILED = 'FETCH_JobTopLevelList_FAILED';

const CREATE_JobTopLevelList_REQUESTED = 'CREATE_JobTopLevelList_REQUESTED';
const CREATE_JobTopLevelList_SUCCESSFUL = 'CREATE_JobTopLevelList_SUCCESSFUL';
const CREATE_JobTopLevelList_FAILED = 'CREATE_JobTopLevelList_FAILED';

const DELETE_JobTopLevelList_REQUESTED = 'DELETE_JobTopLevelList_REQUESTED';
const DELETE_JobTopLevelList_SUCCESSFUL = 'DELETE_JobTopLevelList_SUCCESSFUL';
const DELETE_JobTopLevelList_FAILED = 'DELETE_JobTopLevelList_FAILED';

const UPDATE_JobTopLevelList_REQUESTED = 'UPDATE_JobTopLevelList_REQUESTED';
const UPDATE_JobTopLevelList_SUCCESSFUL = 'UPDATE_JobTopLevelList_SUCCESSFUL';
const UPDATE_JobTopLevelList_FAILED = 'UPDATE_JobTopLevelList_FAILED';

// actions
//const actionJobTopLevelListFetchRequested = action(FETCH_JobTopLevelList_REQUESTED);


const actionJobTopLevelList = {
  FETCH_JobTopLevelList_REQUESTED,
  FETCH_JobTopLevelList_SUCCESSFUL,
  FETCH_JobTopLevelList_FAILED,
  CREATE_JobTopLevelList_REQUESTED,
  CREATE_JobTopLevelList_SUCCESSFUL,
  CREATE_JobTopLevelList_FAILED,
  DELETE_JobTopLevelList_REQUESTED,
  DELETE_JobTopLevelList_SUCCESSFUL,
  DELETE_JobTopLevelList_FAILED,
  UPDATE_JobTopLevelList_REQUESTED,
  UPDATE_JobTopLevelList_SUCCESSFUL,
  UPDATE_JobTopLevelList_FAILED,
}

export default actionJobTopLevelList;
