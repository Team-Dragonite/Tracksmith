import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignInPage.jsx';


const App = () => {
  return (
    <SignIn />
  )
}


ReactDOM.render(<App />, document.getElementById('root'));