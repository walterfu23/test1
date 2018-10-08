import { fk, attr, Model } from 'redux-orm';

export default class BizPageField extends Model {
  static get modelName() {
    return 'BizPageField';
  }

  static get fields() {
    return {
      PgId: fk('BizDocRevPage', 'fields'),

      Id: attr(),
      Active: attr(),
      Name: attr(),
      Type: attr(),
      RegEx: attr(),
      X1: attr(),
      Y1: attr(),
      X2: attr(),
      Y2: attr(),

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
  // getting the parent will lead to infinite loop when PgId.toJson() is called.
  static modelArrayToJsonShallow = (modelArray) => {
    const jsonArray = modelArray.map(
      model => model.ref
    );
    return jsonArray;
  }

  // convert the model to json
  toJson = () => {
    const jsonBizDocRevPage = this.PgId ? this.PgId.toJson() : undefined;
    const json = {
      ...this.ref,
      BizDocRevPage: jsonBizDocRevPage,
    };
    return json;
  }

}; 
