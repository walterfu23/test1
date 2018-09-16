import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import loadData from './init/loadData';

const store = configureStore();
loadData(store);

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
