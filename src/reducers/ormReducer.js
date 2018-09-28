import orm from '../orm/orm';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';

export default function ormReducer(dbState, action) {
  const session = orm.session(dbState);
  const {
    BizDoc,
    BizDocRev,
    BizDocRevPage,
  } = session;

  switch (action.type) {
    case actionBizDoc.FETCH_BizDoc_SUCCESSFUL:
      BizDoc.hydrateArray(action.payload.data.value);
      break;
    case actionBizDoc.CREATE_BizDoc_SUCCESSFUL:
      BizDoc.hydrate(action.payload.data);
      break;
    case actionBizDoc.DELETE_BizDoc_SUCCESSFUL:
      BizDoc.withId(action.payload.Id).delete();
      break;
    case actionBizDoc.UPDATE_BizDoc_SUCCESSFUL:
      BizDoc.withId(action.payload.Id).update(action.payload);
      break;

    case actionBizDocRev.FETCH_BizDocRev_SUCCESSFUL:
      BizDocRev.hydrateArray(action.payload.data.value);
      break;
    case actionBizDocRev.CREATE_BizDocRev_SUCCESSFUL:
      BizDocRev.hydrate(action.payload.data);
      break;
    case actionBizDocRev.DELETE_BizDocRev_SUCCESSFUL:
      BizDocRev.withId(action.payload.Id).delete();
      break;
    case actionBizDocRev.UPDATE_BizDocRev_SUCCESSFUL:
      BizDocRev.withId(action.payload.Id).update(action.payload);
      break;

    case actionBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.hydrateArray(action.payload.data.value);
      break;
    default:
      break;
  } // switch

  // the state property of Session always points to the current database.
  // Updates don't mutate the original state, so this reference is not
  // equal to `dbState` that was an argument to this reducer.
  return session.state;
} // ormReducer()
