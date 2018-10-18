import { fk, attr, Model } from 'redux-orm';
import SubCategory from './modelSubCategory';

export default class Category extends Model {
  static get modelName() {
    return 'Category';
  }

  static get fields() {
    return {
      ListId: fk('TopLevelList', 'categories'),

      Id: attr(),
      Active: attr(),
      Val: attr(),
      Name: attr(),
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

  // convert the model to json
  toJson = () => {
    // get the children array ready. Children are subcategories.
    const childModelArray = this.subCategories.toModelArray();
    const childrenDown = SubCategory.modelArrayToJsonShallow(childModelArray);
    const children = childrenDown.map(childDown => ({
      ...childDown,
      Category: this.ref,     // the parent
    }));

    // compose the json to return
    const parentRef = this.ListId.ref;
    const parentDispLabel = this.ListId.ListLabel;
    parentRef.dispLabel = parentDispLabel;
    const dispLabel = this.getDispLabel();
    const json = {
      ...this.ref,
      TopLevelList: parentRef,
      dispLabel,
      subCategories: children,
    };
    return json;
  }

  getDispLabel = () => {
    const parentDispLabelToUse = this.ListId ? this.ListId.getDispLabel() : '';
    const label = this.ref.Name;
    const dispLabel = parentDispLabelToUse + '-' + label;
    return dispLabel;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort list by DispOrder value
  static sortByDispOrder = (list) =>
    list.sort((rec1, rec2) => rec1.DispOrder - rec2.DispOrder);

  // filter list to get entries with the given listId
  static filterByTopLevelListId = (list, listId) =>
    list.filter(category => category.TopLevelList.Id === listId);

  // return TopLevelList if one of the category entries in the list
  // has the ListId.Id matching the given listId value.
  static findTopLevelList = (list, listId) => {
    const recFound = list.find(category =>
      category.TopLevelList.Id === listId);
    return recFound;
  }
}; // Category
