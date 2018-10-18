
// action types 
const FETCH_SubCategory_REQUESTED = 'FETCH_SubCategory_REQUESTED';
const FETCH_SubCategory_SUCCESSFUL = 'FETCH_SubCategory_SUCCESSFUL';
const FETCH_SubCategory_FAILED = 'FETCH_SubCategory_FAILED';

const CREATE_SubCategory_REQUESTED = 'CREATE_SubCategory_REQUESTED';
const CREATE_SubCategory_SUCCESSFUL = 'CREATE_SubCategory_SUCCESSFUL';
const CREATE_SubCategory_FAILED = 'CREATE_SubCategory_FAILED';

const DELETE_SubCategory_REQUESTED = 'DELETE_SubCategory_REQUESTED';
const DELETE_SubCategory_SUCCESSFUL = 'DELETE_SubCategory_SUCCESSFUL';
const DELETE_SubCategory_FAILED = 'DELETE_SubCategory_FAILED';

const UPDATE_SubCategory_REQUESTED = 'UPDATE_SubCategory_REQUESTED';
const UPDATE_SubCategory_SUCCESSFUL = 'UPDATE_SubCategory_SUCCESSFUL';
const UPDATE_SubCategory_FAILED = 'UPDATE_SubCategory_FAILED';

// items that are available to anyone
const actionSubCategory = {
  FETCH_SubCategory_REQUESTED,
  FETCH_SubCategory_SUCCESSFUL,
  FETCH_SubCategory_FAILED,
  CREATE_SubCategory_REQUESTED,
  CREATE_SubCategory_SUCCESSFUL,
  CREATE_SubCategory_FAILED,
  DELETE_SubCategory_REQUESTED,
  DELETE_SubCategory_SUCCESSFUL,
  DELETE_SubCategory_FAILED,
  UPDATE_SubCategory_REQUESTED,
  UPDATE_SubCategory_SUCCESSFUL,
  UPDATE_SubCategory_FAILED,

}

export default actionSubCategory;
