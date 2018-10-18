
// action types 
const FETCH_TopLevelList_REQUESTED = 'FETCH_TopLevelList_REQUESTED';
const FETCH_TopLevelList_SUCCESSFUL = 'FETCH_TopLevelList_SUCCESSFUL';
const FETCH_TopLevelList_FAILED = 'FETCH_TopLevelList_FAILED';

const CREATE_TopLevelList_REQUESTED = 'CREATE_TopLevelList_REQUESTED';
const CREATE_TopLevelList_SUCCESSFUL = 'CREATE_TopLevelList_SUCCESSFUL';
const CREATE_TopLevelList_FAILED = 'CREATE_TopLevelList_FAILED';

const DELETE_TopLevelList_REQUESTED = 'DELETE_TopLevelList_REQUESTED';
const DELETE_TopLevelList_SUCCESSFUL = 'DELETE_TopLevelList_SUCCESSFUL';
const DELETE_TopLevelList_FAILED = 'DELETE_TopLevelList_FAILED';

const UPDATE_TopLevelList_REQUESTED = 'UPDATE_TopLevelList_REQUESTED';
const UPDATE_TopLevelList_SUCCESSFUL = 'UPDATE_TopLevelList_SUCCESSFUL';
const UPDATE_TopLevelList_FAILED = 'UPDATE_TopLevelList_FAILED';

// actions
//const actionTopLevelListFetchRequested = action(FETCH_TopLevelList_REQUESTED);


const actionTopLevelList = {
  FETCH_TopLevelList_REQUESTED,
  FETCH_TopLevelList_SUCCESSFUL,
  FETCH_TopLevelList_FAILED,
  CREATE_TopLevelList_REQUESTED,
  CREATE_TopLevelList_SUCCESSFUL,
  CREATE_TopLevelList_FAILED,
  DELETE_TopLevelList_REQUESTED,
  DELETE_TopLevelList_SUCCESSFUL,
  DELETE_TopLevelList_FAILED,
  UPDATE_TopLevelList_REQUESTED,
  UPDATE_TopLevelList_SUCCESSFUL,
  UPDATE_TopLevelList_FAILED,
}

export default actionTopLevelList;
