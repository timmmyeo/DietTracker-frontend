import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Dashboard from './components/dashboard/Dashboard'
import SignIn from './components/auth/SignIn'
import SetMessengerID from "./components/dashboard/SetMessengerId"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>      
        <Route exact path='/' component={Dashboard} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/messengerID' component={SetMessengerID} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
