import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import SignUp from './components/SignUpPage.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='signup' element={<SignUp />} /> 
    </Routes>
  </BrowserRouter>
, document.getElementById('root'));