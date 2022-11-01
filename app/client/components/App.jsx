import React from 'react'; // React is not used
import { render } from 'react-dom';
import SignInPage from './SignInPage';

const root = document.querySelector('root');

const App = () => {
  render(SignInPage, root);
};
export default App;
