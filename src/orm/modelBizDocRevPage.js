import { fk, attr, Model } from 'redux-orm';
import BizPageField from './modelBizPageField';

export default class BizDocRevPage extends Model {
  static get modelName() {
    return 'BizDocRevPage';
  }

  static get fields() {
    return {
      RevId: fk('BizDocRev', 'pages'),

      Id: attr(),
      Active: attr(),
      PgNum: attr(),
      PgKey1: attr(),
      PgKey2: attr(),

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
    const childModelArray = this.fields.toModelArray();
    const childrenDown = BizPageField.modelArrayToJsonShallow(childModelArray);
    const children = childrenDown.map(childDown => ({
      ...childDown,
      BizDocRevPage: this.ref,     // the parent
    }))

    // compose the json to return
    const bizDocRevRef = this.RevId.ref;
    const bizDocRevDispLabel = this.RevId.getDispLabel();
    bizDocRevRef.dispLabel = bizDocRevDispLabel;
    const dispLabel = this.getDispLabel();
    const json = {
      ...this.ref,
      BizDocRev: bizDocRevRef,
      dispLabel,
      fields: children,
    };
    return json;
  }

  getDispLabel = () => {
    const jsonBizDocRev = this.RevId ? this.RevId.ref : undefined;
    const revDispLabelToUse = jsonBizDocRev ? this.RevId.getDispLabel() : '';
    const pgNumToUse = this.ref.PgNum;
    const dispLabel = revDispLabelToUse + '-' + pgNumToUse;
    return dispLabel;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
    list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort list by PgNum value
  static sortByPgNum = (list) =>
    list.sort((rec1, rec2) => rec1.PgNum - rec2.PgNum);

  // filter list to get entries with the given docRevId
  static filterByDocRevId = (list, docRevId) =>
    list.filter(bizDocRevPage => bizDocRevPage.BizDocRev.Id === docRevId);

  // return BizDocRev if one of the page entries in the list
  // has the BizDocRev.Id matching the given bizDocRevId value.
  static findBizDocRev = (list, bizDocRevId) => {
    const recFound = list.find(bizDocRevPage =>
      bizDocRevPage.BizDocRev.Id === bizDocRevId);
    return recFound;
  }
}; // BizDocRevPage
