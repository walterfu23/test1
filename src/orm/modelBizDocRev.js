import { fk, attr, Model } from 'redux-orm';

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

  toJson = () => {
    const jsonBizDoc = this.DocId ? this.DocId.toJson() : undefined;
    return {
      ...this.ref,
      BizDoc: jsonBizDoc,
    };
  }

}; // BizDocRev

