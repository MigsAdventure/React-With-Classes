import React from 'react';
import {render} from 'react-dom';
import './stores/ProductStore'; //no new variables are created its just to inititalize the store
import Layout from './components/Layout';

render(
  <Layout/>,
  document.getElementById('root')
  )