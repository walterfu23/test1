
import actionBizDoc from '../actions/actionBizDoc';

const defaultState = {
  uid: 'fuw',
  BizDoc: undefined,
  BizDocRev: undefined,
  BizDocRevPage: undefined,
}

const currentItemReducer = (prevState = defaultState, action) => {
  switch (action.type) {
    case actionBizDoc.DELETE_BizDoc_REQUESTED:
      return {
        ...prevState,
        BizDoc: action.payload,
      }
      case actionBizDoc.DELETE_BizDoc_SUCCESSFUL:
      return {
        ...prevState,
        BizDoc: action.payload,
      }
    default:
      return prevState;
  }
}

export default currentItemReducer;
