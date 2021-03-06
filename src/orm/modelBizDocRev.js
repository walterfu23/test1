import { fk, attr, Model } from 'redux-orm';
import utils from '../utils/utils';
import BizDocRevPage from './modelBizDocRevPage';

export default class BizDocRev extends Model {
  static get modelName() {
    return 'BizDocRev';
  }

  static get fields() {
    return {
      DocId: fk('BizDoc', 'revs'),

      Id: attr(),
      Active: attr(),
      LangOrig: attr(),
      LangNormalized: attr(),
      RevOrig: attr(),
      RevNormalized: attr(),

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
    // get the children array ready
    const childModelArray = this.pages.toModelArray();
    const childrenDown = BizDocRevPage.modelArrayToJson(childModelArray);
    const children = childrenDown.map(childDown => ({
      ...childDown,
      BizDocRev: this.ref,     // the parent
    }));

    const BizDoc = this.DocId.ref;
    const dispLabel = this.getDispLabel();

    // now compose the json
    const json = {
      ...this.ref,
      BizDoc,
      dispLabel,
      pages: children,
    }
    return json;
  }

  getDispLabel = () => {
    const jsonBizDoc = this.DocId ? this.DocId.ref : undefined;
    const docNumToUse = jsonBizDoc ? jsonBizDoc.DocNum : '';
    const langToUse = this.ref.LangNormalized;
    const revToUse = this.ref.RevNormalized;
    const dispLabel = docNumToUse + '-' + langToUse + '-' + revToUse;
    return dispLabel;
  }

  // sort the list by its id in reverse order
  static sortByIdDesc = (list) =>
  list.sort((rec1, rec2) => rec2.Id - rec1.Id);

  // sort the list by dispLabel 
  static sortByRevDispLabel = (list) =>
    list.sort((rec1, rec2) => utils.strCompare(rec1.dispLabel, rec2.dispLabel));

  // filter the list for entries with at least one page
  static entriesWithPage = (list) => {
    const filteredList = list.filter(rev => rev.pages.length > 0);
    return filteredList;
  }

}; // BizDocRev

