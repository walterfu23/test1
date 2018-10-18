import { fk, attr, Model } from 'redux-orm';

export default class SubCategory extends Model {
  static get modelName() {
    return 'SubCategory';
  }

  static get fields() {
    return {
      CatId: fk('Category', 'subCategories'),

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

  // get only field's own props. Do not get its parent.
  // getting the parent will lead to infinite loop when CatId.toJson() is called.
  static modelArrayToJsonShallow = (modelArray) => {
    const jsonArray = modelArray.map(
      model => model.ref
    );
    return jsonArray;
  }

  // convert the model to json
  toJson = () => {
    // compose the json to return
    const jsonCategory = this.CatId && this.CatId.toJson();
    const json = {
      ...this.ref,
      Category: jsonCategory,
    };
    return json;
  }

  getDispLabel = () => {
    const parentDispLabelToUse = this.Cat ? this.CatId.getDispLabel() : '';
    const label = this.ref.Name;
    const dispLabel = parentDispLabelToUse + '-' + label;
    return dispLabel;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort list by Cat, then by DispOrder value
  static sortByCatDispOrder = (list) =>
    list.sort((rec1, rec2) => {
      if ( rec1.Category && rec2.Category ) {
        let diff = rec1.Category.DispOrder - rec2.Category.DispOrder;
        diff = diff === 0 ? rec1.DispOrder - rec2.DispOrder : diff;
        return diff;
      } else {
        return rec1.DispOrder - rec2.DispOrder
      }
    });

  // filter list to get subcategories with the given catId
  static filterByCatId = (list, catId) =>
    list.filter(subCategory => subCategory.CatId.Id === catId);

  // return Category if one of the subCategory entries in the list
  // has the CatId.Id matching the given catId value.
  static findCategory = (list, catId) => {
    const recFound = list.find(subCategory =>
      subCategory.Cat.Id === catId);
    return recFound;
  }
  
}; // SubCategory
