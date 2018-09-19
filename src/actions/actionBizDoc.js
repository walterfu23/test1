
// const ActionTypesBizDoc = {
//   FETCH_BizDoc_REQUESTED: 'FETCH_BizDoc_REQUESTED',
//   FETCH_BizDoc_SUCCESSFUL: 'FETCH_BizDoc_SUCCESSFUL',
//   FETCH_BizDoc_FAILED: 'FETCH_BizDoc_FAILED',
//   CREATE_BizDoc_REQUESTED: 'CREATE_BizDoc_REQUESTED',  // create db rec
//   CREATE_BizDoc_SUCCESSFUL: 'CREATE_BizDoc_SUCCESSFUL', 
//   CREATE_BizDoc_FAILED: 'CREATE_BizDoc_FAILED',
// }

// action types 
const FETCH_BizDoc_REQUESTED = 'FETCH_BizDoc_REQUESTED';
const FETCH_BizDoc_SUCCESSFUL = 'FETCH_BizDoc_SUCCESSFUL';
const FETCH_BizDoc_FAILED = 'FETCH_BizDoc_FAILED';

const CREATE_BizDoc_REQUESTED = 'CREATE_BizDoc_REQUESTED';
const CREATE_BizDoc_SUCCESSFUL = 'CREATE_BizDoc_SUCCESSFUL';
const CREATE_BizDoc_FAILED = 'CREATE_BizDoc_FAILED';

// actions
//const actionBizDocFetchRequested = action(FETCH_BizDoc_REQUESTED);



const actionBizDoc = {
  FETCH_BizDoc_REQUESTED,
  FETCH_BizDoc_SUCCESSFUL,
  FETCH_BizDoc_FAILED,
  CREATE_BizDoc_REQUESTED,
  CREATE_BizDoc_SUCCESSFUL,
  CREATE_BizDoc_FAILED,

}

export default actionBizDoc;
