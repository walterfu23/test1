import { fk, attr, many, Model } from 'redux-orm';

class SsaModel extends Model {
  static get modelName() {
    return 'SsaModel';
  }

  static get fields() {
    return {
      Creator: attr(),
      CreateTime: attr(),
      Modifier: attr(),
      ModTime: attr()    
    }
  }
};

export class BizDoc extends Model {

  // the model is know by this name. This is the name
  // used in relationships with other models.
  static get modelName() {
    return 'BizDoc';
  }

  // fields
  static get fields() {
    return {
      Id: attr(),
      Active: attr(),
      DocName: attr(),
      DocNum: attr(),
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

  // hydrate a list of records
  static hydrateArray(dataArray) {
    dataArray.map(data=>this.hydrate(data));
  }
}; // BizDoc

export class BizDocRev extends Model {
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
}; // BizDocRev

export class BizDocRevPage extends Model {
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
}; // BizDocRevPage
