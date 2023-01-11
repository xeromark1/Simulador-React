import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/comboboxDisenio.css';
import './assets/css/index.css';

import {App} from './App';
import {Table} from "./Logic/Table";


const root = ReactDOM.createRoot(document.getElementById('root'));



root.render(
  <>

  <App />
  <Table />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
