import axios from 'axios';
import moment from 'moment';

const urlBase = 'http://localhost:57090/odata/';
//const urlBase = 'http://ssalt465hdy/BooksOData/odata/';
//const urlBase = 'http://localhost/BooksOData/odata/';

const getBizDocs = () => {
  const url = urlBase + 'BizDoc';
  return axios.get(url);
}

const createBizDoc = ({Active, DocNum, DocName, Comment} = {}) => {
  const url = urlBase + 'BizDoc';
  const now = moment();
  const uid = 'fuw';
  const bizDocToUse = {
    Active,
    DocNum,
    DocName,
    Comment,
    Creator: uid,
    CreateTime: now,
    Modifier: uid,
    ModTime: now,
  }; 
  return axios.post( url, bizDocToUse );
}

const deleteBizDoc = ({Id} ) => {
  const url = urlBase + 'BizDoc/' + Id;
  return axios.delete( url );
}

const updateBizDocPrep = (bizDoc ) => {
  const now = moment();
  const uid = 'fuw';
  const bizDocToUse = {
    ...bizDoc,
    Modifier: uid,
    ModTime: now,
  }
  return bizDocToUse;
}

const updateBizDoc = (bizDocToUse ) => {
  const url = urlBase + 'BizDoc/' + bizDocToUse.Id;
  return axios.put( url, bizDocToUse );
}

const getBizDocRevs = () => {
  const url = urlBase + 'BizDocRev';
  return axios.get(url);
}

const getBizDocRevPages = () => {
  const url = urlBase + 'BizDocRevPage';
  return axios.get(url);
}

const getTest = () => {
  return axios.get('https://jsonplaceholder.typicode.com/todos/1');
}

const Api = {
  getBizDocs,
  createBizDoc,
  deleteBizDoc,
  updateBizDocPrep,
  updateBizDoc,

  getBizDocRevs,
  getBizDocRevPages,
  getTest
}

export default Api;

