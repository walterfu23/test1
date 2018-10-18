import { attr, Model } from 'redux-orm';
import utils from '../utils/utils';
import Category from './modelCategory';

export default class TopLevelList extends Model {

  // the model is known by this name. This is the name
  // used in relationships with other models.
  static get modelName() {
    return 'TopLevelList';
  }

  // fields
  static get fields() {
    return {
      Id: attr(),
      Active: attr(),
      ListName: attr(),
      ListLabel: attr(),
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
    const catModelArray = this.categories.toModelArray();
    const catsDown = Category.modelArrayToJson(catModelArray);
    const categories = catsDown.map(catDown => ({
      ...catDown,
      TopLevelList: this.ref,       // the parent
    }));
    const json = {
      ...this.ref,
      categories,
    }
    return json;
  }

  getDispLabel = () => {
    return this.ListLabel;
  }

  // filter the list for entries with at least one category
  static entriesWithCat = (list) => {
    const filteredList = list.filter(listItem => listItem.categories.length > 0);
    return filteredList;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort the list by its list label
  static sortByListLabel = (list) =>
    list.sort((rec1, rec2) => utils.strCompare(rec1.ListLabel, rec2.ListLabel));

};

