
// action types 
const FETCH_Category_REQUESTED = 'FETCH_Category_REQUESTED';
const FETCH_Category_SUCCESSFUL = 'FETCH_Category_SUCCESSFUL';
const FETCH_Category_FAILED = 'FETCH_Category_FAILED';

const CREATE_Category_REQUESTED = 'CREATE_Category_REQUESTED';
const CREATE_Category_SUCCESSFUL = 'CREATE_Category_SUCCESSFUL';
const CREATE_Category_FAILED = 'CREATE_Category_FAILED';

const DELETE_Category_REQUESTED = 'DELETE_Category_REQUESTED';
const DELETE_Category_SUCCESSFUL = 'DELETE_Category_SUCCESSFUL';
const DELETE_Category_FAILED = 'DELETE_Category_FAILED';

const UPDATE_Category_REQUESTED = 'UPDATE_Category_REQUESTED';
const UPDATE_Category_SUCCESSFUL = 'UPDATE_Category_SUCCESSFUL';
const UPDATE_Category_FAILED = 'UPDATE_Category_FAILED';

// items that are available to anyone
const actionCategory = {
  FETCH_Category_REQUESTED,
  FETCH_Category_SUCCESSFUL,
  FETCH_Category_FAILED,
  CREATE_Category_REQUESTED,
  CREATE_Category_SUCCESSFUL,
  CREATE_Category_FAILED,
  DELETE_Category_REQUESTED,
  DELETE_Category_SUCCESSFUL,
  DELETE_Category_FAILED,
  UPDATE_Category_REQUESTED,
  UPDATE_Category_SUCCESSFUL,
  UPDATE_Category_FAILED,

}

export default actionCategory;
