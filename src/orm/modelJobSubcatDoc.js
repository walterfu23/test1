import { fk, attr, Model } from 'redux-orm';

export default class JobSubcatDoc extends Model {
  static get modelName() {
    return 'JobSubcatDoc';
  }

  static get fields() {
    return {
      JobId: fk('Job', 'subcatDocs'),
      SubCatId: fk('SubCategory', 'jobDocs'),
      DocId: fk('BizDoc', 'jobSubcats'),

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

  // get only field's own props. Do not get its parent.
  // getting the parent will lead to infinite loop when JobId.toJson() is called.
  static modelArrayToJsonShallow = (modelArray) => {
    const jsonArray = modelArray.map(
      model => model.ref
    );
    return jsonArray;
  }

  // convert the model to json
  toJson = () => {
    const Job = this.JobId && this.JobId.toJson();
    const SubCategory = this.SubCatId && this.SubCatId.toJson();
    const BizDoc = this.DocId && this.DocId.toJson();
    const dispLabel = SubCategory.Name + ' - ' + BizDoc.DocNum;
    const json = {
      ...this.ref,
      Job,
      SubCategory,
      BizDoc,
      dispLabel,
    };
    return json;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

}; 
