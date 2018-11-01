import { fk, attr, Model } from 'redux-orm';
import utils from '../utils/utils';
//import BizPageField from './modelBizPageField';

export default class JobTopLevelList extends Model {
  static get modelName() {
    return 'JobTopLevelList';
  }

  static get fields() {
    return {
      JobId: fk('Job', 'jobTopLevelLists'),
      ListId: fk('TopLevelList', 'jobTopLevelLists'),

      Id: attr(),
      Active: attr(),
      Comment: attr(),

      Creator: attr(),
      CreateTime: attr(),
      Modifier: attr(),
      ModTime: attr()
    };
  }

  // id attribute
  static get options() {
    return {
      idAttribute: 'Id',
    };
  }

  // hydrate one record
  static hydrate(data) {
    return this.create(data);
  }

  // remove one record
  static delete(data) {
    return this.withId(data.Id).delete();
  }

  // hydrate a list of records
  static hydrateArray(dataArray) {
    dataArray.map(data => this.hydrate(data));
  }

  // convert modelArray to json array
  static modelArrayToJson = (modelArray) => {
    const jsonArray = modelArray.map(
      model => model.toJson()
    );
    return jsonArray;
  }

  // convert the model to json
  toJson = () => {
    // get the children array ready. Children are fields.
    // const childModelArray = this.fields.toModelArray();
    // const childrenDown = BizPageField.modelArrayToJsonShallow(childModelArray);
    // const children = childrenDown.map(childDown => ({
    //   ...childDown,
    //   JobTopLevelList: this.ref,     // the parent
    // }))

    // compose the json to return
    const jobRef = this.JobId.ref;
    jobRef.dispLabel = this.JobId.Label;
    const listRef = this.ListId.ref;
    listRef.dispLabel = this.ListId.ListLabel;
    const dispLabel = this.getDispLabel();
    const json = {
      ...this.ref,
      Job: jobRef,
      TopLevelList: listRef,
      dispLabel,
    };
    return json;
  }

  getDispLabel = () => {
    const jsonJob = this.JobId && this.JobId.ref;
    const jobDispLabelToUse = jsonJob ? this.JobId.Label : '';
    const jsonTopLevelList = this.ListId && this.ListId.ref;
    const topLevelListDispLabelToUse = jsonTopLevelList ?
      this.ListId.ListLabel : '';
    const dispLabel = jobDispLabelToUse + '-' + topLevelListDispLabelToUse;
    return dispLabel;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  static sortByDispLabel = (list) =>
    list.sort((rec1, rec2) =>
      utils.strCompare(rec1.getDispLabel(), rec2.getDispLabel()));

  // filter list to get entries with the given jobId
  static filterByJobId = (list, jobId) =>
    list.filter(JobTopLevelList => JobTopLevelList.JobId === jobId);

  // filter list to get entries with the given listId
  static filterByListId = (list, listId) =>
    list.filter(jobTopLevelList => jobTopLevelList.ListId === listId);

  // returns true if ListId of a list item matches provided listId
  static listIdInList = (list, listId) => {
    for (var listItem of list) {
      if (listItem.ListId === listId) {
        return true;      
      }
    }
    return false;
  }

  // filter listTopLevelList using the listid in listJobTopLevelList
  static filterByListJobTopLevelList = (listTopLevelList, listJobTopLevelList) =>
    listTopLevelList.filter(itemTopLevelList =>
      JobTopLevelList.listIdInList(listJobTopLevelList, itemTopLevelList.Id));

}; // JobTopLevelList
