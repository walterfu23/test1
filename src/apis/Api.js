import axios from 'axios';

//const urlBase = 'http://localhost:57090/odata/book';
//const urlBase = 'http://ssalt465hdy/BooksOData/odata/';
const urlBase = 'http://localhost/BooksOData/odata/';

const getBizDocs = () => {
  const url = urlBase + 'BizDoc';
  return axios.get(url);
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
  getBizDocRevs,
  getBizDocRevPages,
  getTest
}

export default Api;

