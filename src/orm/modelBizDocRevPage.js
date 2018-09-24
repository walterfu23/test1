import { fk, attr, Model } from 'redux-orm';

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
      PgType: attr(),

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

  // convert the model to json
  toJson = () => {
    const jsonBizDocRev = this.RevId ? this.RevId.toJson() : undefined;
    return {
      ...this.ref,
      BizDocRev: jsonBizDocRev,
    };
  }

}; 
