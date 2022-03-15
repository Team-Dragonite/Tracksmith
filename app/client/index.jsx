import React from 'react';
import ReactDOM from 'react-dom';
import ConversionRates from './components/ConversionRate.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';

const App = React.lazy(() => import('./components/App'));
const SignUp = React.lazy(() => import('./components/SignUpPage'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<React.Suspense fallback={<>...</>}>
        <App />
      </React.Suspense>} />
        <Route path='/signup' element={<React.Suspense fallback={<>...</>}>
        <SignUp />
      </React.Suspense>} /> 
        <Route path='/dashboard' element={<React.Suspense fallback={<>...</>}>
        <Dashboard />
      </React.Suspense>} /> 
        <Route path='/conversion' element={<React.Suspense fallback={<>...</>}>
        <ConversionRates />
      </React.Suspense>} /> 
      </Routes>
    </Provider>
  </BrowserRouter>
, document.getElementById('root'));