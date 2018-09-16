import orm from '../orm/orm';

import {
  ActionTypesBizDoc,
  ActionTypesBizDocRev,
  ActionTypesBizDocRevPage,
  ActionTypesTest,
} from '../constants/actionTypes';

export default function ormReducer(dbState, action) {
  const session = orm.session(dbState);
  const {
    BizDoc,
    BizDocRev,
    BizDocRevPage,
  } = session;

  switch (action.type) {
    //    case ActionTypesBizDoc.FETCH_BizDoc_REQUESTED:
    //      break;
    //    case ActionTypesBizDoc.FETCH_BizDoc_FAILED:
    //      break;
    case ActionTypesBizDoc.FETCH_BizDoc_SUCCESSFUL:
      //    console.log(action.data.data.value);
      //    console.log(session.state.BizDoc);
      BizDoc.hydrateArray(action.data.data.value);
      break;
    case ActionTypesBizDocRev.FETCH_BizDocRev_SUCCESSFUL:
      BizDocRev.hydrateArray(action.data.data.value);
      break;
    case ActionTypesBizDocRevPage.FETCH_BizDocRevPage_SUCCESSFUL:
      BizDocRevPage.hydrateArray(action.data.data.value);
      break;
    case ActionTypesTest.TEST_CHECK:
      // BizDoc.all().toModelArray().map(modelBizDoc => {
      //   console.log(modelBizDoc.ref);
      //   const modelBizDocRevs = modelBizDoc.revs;
      //   modelBizDocRevs.toModelArray().map(modelBizDocRev => {
      //     console.log('  ', modelBizDocRev.ref);
      //     const modelBizDocRevPages = modelBizDocRev.pages;
      //     modelBizDocRevPages.toModelArray().map(modelBizDocRevPage => {
      //       console.log('    ', modelBizDocRevPage.ref);
      //     });
      //   }); 
      // });
      // console.log(' ');
      // BizDocRevPage.all().toModelArray().map(modelBizDocRevPage => {
      //   console.log(modelBizDocRevPage.ref);
      //   const modelBizDocRev = modelBizDocRevPage.RevId;
      //   const modelBizDoc = modelBizDocRev.DocId;
      //   console.log('  ', modelBizDocRev.ref);
      //   console.log('    ', modelBizDoc.ref);
      // });
      const json = BizDocRevPage.all().toModelArray().map(
        modelBizDocRevPage => modelBizDocRevPage.toJson());
      console.log('Method1: ', json);
      break;
    default:
      break;
  } // switch

  // the state property of Session always points to the current database.
  // Updates don't mutate the original state, so this reference is not
  // equal to `dbState` that was an argument to this reducer.
  return session.state;
} // ormReducer()
