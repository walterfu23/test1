import { attr, Model } from 'redux-orm';

export default class BizDoc extends Model {

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

  // convert the model to json
  toJson = () => ({
    ...this.ref,
  })
}; 

