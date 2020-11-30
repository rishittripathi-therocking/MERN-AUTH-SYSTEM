import React from 'react';
import {BrowserRouter,Route, Redirect, Switch} from 'react-router-dom';
import Register from './screens/Register';
import Main from './Main';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Activate from './screens/Activate';


function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      <Switch>
        <Route path='/' exact render={props => <Main {...props} />} />
        <Route path='/register' exact render={props => <Register {...props} />} />
        <Route path='/register' exact render={props => <Activate {...props} />} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
 