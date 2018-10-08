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
      RevName: attr(),
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

  toJson = () => {
    // get the children array ready
    const childModelArray = this.pages.toModelArray();
    const childrenDown = BizDocRevPage.modelArrayToJson(childModelArray);
    const children = childrenDown.map(childDown => ({
      ...childDown,
      BizDocRev: this.ref,     // the parent
    }))

    const dispLabel = this.getDispLabel();

    // now compose the json
    const json = {
      ...this.ref,
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


  // sort the list by RevName 
  static sortByRevName = (list) =>
    list.sort((rec1, rec2) => utils.strCompare(rec1.RevName, rec2.RevName));

  // filter the list for entries with at least one page
  static entriesWithPage = (list) => {
    const filteredList = list.filter(rev => rev.pages.length > 0);
    return filteredList;
  }
  static entriesWithPageOrig = (list, listPages) => {
    const gotPage = (rev) => {
      const entry = BizDocRevPage.findBizDocRev(listPages, rev.Id);
      return entry ? true : false;
    }
    const filteredList = list.filter(rev => gotPage(rev));
    return filteredList;
  }

}; // BizDocRev

