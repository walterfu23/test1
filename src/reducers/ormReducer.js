import orm from '../orm/orm';
import actionBizDoc from '../actions/actionBizDoc';
import actionBizDocRev from '../actions/actionBizDocRev';
import actionBizDocRevPage from '../actions/actionBizDocRevPage';
import actionBizPageField from '../actions/actionBizPageField';
import actionTopLevelList from '../actions/actionTopLevelList';
import actionJob from '../actions/actionJob';
import actionCategory from '../actions/actionCategory';
import actionSubCategory from '../actions/actionSubCategory';

export default function ormReducer(dbState, action) {
  const session = orm.session(dbState);
  const {
    BizDoc,
    BizDocRev,
    BizDocRevPage,
    BizPageField,
    TopLevelList,
    Job,
    Category,
    SubCategory,
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

    //==================== TopLevelList ====================
    case actionTopLevelList.FETCH_TopLevelList_SUCCESSFUL:
      TopLevelList.hydrateArray(action.payload.data.value);
      break;
    case actionTopLevelList.CREATE_TopLevelList_SUCCESSFUL:
      TopLevelList.hydrate(action.payload.data);
      break;
    case actionTopLevelList.DELETE_TopLevelList_SUCCESSFUL:
      TopLevelList.withId(action.payload.Id).delete();
      break;
    case actionTopLevelList.UPDATE_TopLevelList_SUCCESSFUL:
      TopLevelList.withId(action.payload.Id).update(action.payload);
      break;

    //==================== Job ====================
    case actionJob.FETCH_Job_SUCCESSFUL:
      Job.hydrateArray(action.payload.data.value);
      break;
    case actionJob.CREATE_Job_SUCCESSFUL:
      Job.hydrate(action.payload.data);
      break;
    case actionJob.DELETE_Job_SUCCESSFUL:
      Job.withId(action.payload.Id).delete();
      break;
    case actionJob.UPDATE_Job_SUCCESSFUL:
      Job.withId(action.payload.Id).update(action.payload);
      break;

    //==================== Category ====================
    case actionCategory.FETCH_Category_SUCCESSFUL:
      Category.hydrateArray(action.payload.data.value);
      break;
    case actionCategory.CREATE_Category_SUCCESSFUL:
      Category.hydrate(action.payload.data);
      break;
    case actionCategory.DELETE_Category_SUCCESSFUL:
      Category.withId(action.payload.Id).delete();
      break;
    case actionCategory.UPDATE_Category_SUCCESSFUL:
      Category.withId(action.payload.Id).update(action.payload);
      break;

    //==================== SubCategory ====================
    case actionSubCategory.FETCH_SubCategory_SUCCESSFUL:
      SubCategory.hydrateArray(action.payload.data.value);
      break;
    case actionSubCategory.CREATE_SubCategory_SUCCESSFUL:
      SubCategory.hydrate(action.payload.data);
      break;
    case actionSubCategory.DELETE_SubCategory_SUCCESSFUL:
      SubCategory.withId(action.payload.Id).delete();
      break;
    case actionSubCategory.UPDATE_SubCategory_SUCCESSFUL:
      SubCategory.withId(action.payload.Id).update(action.payload);
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
