import axios from 'axios';
import moment from 'moment';

//const urlBase = 'http://localhost:57097/odata/';
const urlBase = 'http://localhost/DRPOData/odata/';
//const urlBase = 'http://ssasvstgapp1/DRPOData/odata/';

// get all records
const getRecs = (modelName) => {
  const url = urlBase + modelName;
  const ret = axios.get(url);
  return ret;
}

// create a record
const createRec = (modelName, rec = {}) => {
  const url = urlBase + modelName;
  const now = moment();
  const recToUse = {
    ...rec,
    CreateTime: now,
    ModTime: now,
  };
  return axios.post(url, recToUse);
}

// delete the record
const deleteRec = (modelName, { Id }) => {
  const url = urlBase + modelName + '/' + Id;
  return axios.delete(url);
}

// prepare to update the record. this is needed to get the
// ModTime value for redux-orm, after update is successful.
const updateRecPrep = (rec) => {
  const now = moment();
  const recToUse = {
    ...rec,
    ModTime: now,
  }
  return recToUse;
}

// update the record
const updateRec = (modelName, recToUse) => {
  const url = urlBase + modelName + '/' + recToUse.Id;
  return axios.put(url, recToUse);
}

// The api has these functions 
const Api = {
  getRecs,
  createRec,
  deleteRec,
  updateRecPrep,
  updateRec,
}

export default Api;

