import { fk, attr, Model } from 'redux-orm';
import utils from '../utils/utils';

export default class Job extends Model {
  static get modelName() {
    return 'Job';
  }

  static get fields() {
    return {
      ListId: fk('TopLevelList', 'jobs'),

      Id: attr(),
      Active: attr(),
      Name: attr(),
      Label: attr(),
      DispOrder: attr(),
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

  toJson = () => {
    // get the children array ready
    // const childModelArray = this.pages.toModelArray();
    // const childrenDown = JobPage.modelArrayToJson(childModelArray);
    // const children = childrenDown.map(childDown => ({
    //   ...childDown,
    //   Job: this.ref,     // the parent
    // }))

    const TopLevelList = this.ListId.ref;
    const dispLabel = this.getDispLabel();

    // now compose the json
    const json = {
      ...this.ref,
      TopLevelList,
      dispLabel,
      //      pages: children,
    }
    return json;
  }

  getDispLabel = () => {
    const listLabelToUse = this.ListId ? this.ListId.getDispLabel() : '';
    return listLabelToUse;
  }

  // sort the list by DispOrder 
  static sortByDispOrder = (list) =>
    list.sort((rec1, rec2) => rec1.DispOrder - rec2.DispOrder);

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort the list by dispLabel 
  static sortByDispLabel = (list) =>
    list.sort((rec1, rec2) => utils.strCompare(rec1.dispLabel, rec2.dispLabel));

  // filter the list for entries with at least one page
  static entriesWithPage = (list) => {
    const filteredList = list.filter(rev => rev.pages.length > 0);
    return filteredList;
  }

}; // Job

