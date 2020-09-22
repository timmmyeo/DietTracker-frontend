import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>      
        <Route exact path='/' component={Dashboard} />
        <Route path='/login' component={SignIn} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
