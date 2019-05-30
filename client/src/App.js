import React from 'react';
//import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom'
import Users from './components/Users'
function App() {
  return (
    <div className="App">
      <Route path="/users" render={(props) => <Users {...props} />} />
    </div>
  );
}

export default App;
