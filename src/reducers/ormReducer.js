import orm from '../orm/orm';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import actionBizPageField from '../actions/actionBizPageField';

export default function ormReducer(dbState, action) {
  const session = orm.session(dbState);
  const {
    BizDoc,
    BizDocRev,
    BizDocRevPage,
    BizPageField,
  } = session;

  switch (action.type) {
    //==================== BizDoc ====================
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

    //==================== BizDocRev ====================
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

    //==================== BizDocRevPage ====================
    case actionBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.hydrateArray(action.payload.data.value);
      break;
    case actionBizDocRevPage.CREATE_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.hydrate(action.payload.data);
      break;
    case actionBizDocRevPage.DELETE_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.withId(action.payload.Id).delete();
      break;
    case actionBizDocRevPage.UPDATE_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.withId(action.payload.Id).update(action.payload);
      break;

    //==================== BizPageField ====================
    case actionBizPageField.FETCH_BizPageField_SUCCESSFUL:
      BizPageField.hydrateArray(action.payload.data.value);
      break;
    case actionBizPageField.CREATE_BizPageField_SUCCESSFUL:
      BizPageField.hydrate(action.payload.data);
      break;
    case actionBizPageField.DELETE_BizPageField_SUCCESSFUL:
      BizPageField.withId(action.payload.Id).delete();
      break;
    case actionBizPageField.UPDATE_BizPageField_SUCCESSFUL:
      BizPageField.withId(action.payload.Id).update(action.payload);
      break;

    //==================== default ====================
    default:
      break;
  } // switch

  // the state property of Session always points to the current database.
  // Updates don't mutate the original state, so this reference is not
  // equal to `dbState` that was an argument to this reducer.
  return session.state;
} // ormReducer()
