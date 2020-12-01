import React from 'react';
import {BrowserRouter,Route, Redirect, Switch} from 'react-router-dom';
import Register from './screens/Register';
import Main from './Main';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Activate from './screens/Activate';
import Login from './screens/Login';
import Forget from './screens/forget';
import ResetPassword from './screens/ResetPassword';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Switch>
        <Route path='/' exact render={props => <Main {...props} />} />
        <Route path='/register' exact render={props => <Register {...props} />} />
        <Route path='/login' exact render={props => <Login {...props} />} />
        <Route path='/users/password/forget' exact render={props => <Forget {...props} />} />
        <Route path='/users/activate/:token' exact render={props => <Activate {...props} />} />
        <Route path='/users/password/reset/:token' exact render={props => <ResetPassword {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
 