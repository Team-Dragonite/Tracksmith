import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import SignUp from './components/SignUpPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Dashboard from './components/Dashboard.jsx'
import ConversionRates from './components/Visualization.jsx';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/visualization' element={<ConversionRates />} />
      </Routes>
    </Provider>
  </BrowserRouter>
  , document.getElementById('root'));

