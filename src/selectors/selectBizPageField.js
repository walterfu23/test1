import { createSelector } from 'redux-orm';
import orm from '../orm/orm';
import BizPageField from '../orm/modelBizPageField';

export const createBizPageFieldTreeSelector = createSelector(
  orm,
  state => state.orm,
  session => {
    const modelBizPageFields = session.BizPageField.all().toModelArray();
    return BizPageField.modelArrayToJson(modelBizPageFields);
  }
);

export const createBizPageFieldListSelector =  createBizPageFieldTreeSelector;

// createSelector, //unified selector, that creates ORM selector or selector from reselect
// createRecordSelector, //to select single record with query info for relations and etc
// createListSelector, //to select all records with query info for relations and etc
// createTreeSelector, //to select all records resolved as tree with query info for relations and etc
// createGroupedSelector, //to select all records grouped by field, with query info for relations and etc
// createMapSelector,//to select all records indexed by id with query info for relations and etc
