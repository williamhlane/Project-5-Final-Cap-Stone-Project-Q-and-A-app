
import './App.css';
import Categories from './componite/Categories';
import Questions from './componite/Questions';
import LogInScreen from './componite/LogInScreen';
import Resetpassword from './componite/Resetpassword';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
let loggedIn = true;
function App() {
const backEnd = "http://localhost:3001";
  const [showLogIn, setShowLogIn] = useState(false);
////////////////////////////////////////////////////////
/*
var myHeaders = new Headers({
    'Content-Type': 'text/xml'
});
      res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3000']);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
*/
////////////////////////////////////////////////////////
  //once logged in only use ONE useState for ALL information, store it in 

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>LINUX FORUM</h1>
          <div id="headerLogIn">
            {loggedIn ? <a href="">Log Out</a> : <a onClick={() => setShowLogIn(true)}>Log In</a>}
          </div>
        </header>

        {loggedIn ? <Categories /> : <div id="notLoggedIn"><h1>Welcome</h1><br /><h3>Please log in.</h3></div>}
        {loggedIn ? <Questions /> : <div id="notLoggedIn2"><p>Welcom to the linux forum</p></div>}
        {showLogIn ?  <LogInScreen setShowLogIn={setShowLogIn} backEnd={backEnd} /> : null }
        <Route path="/resetpassword">
          <Resetpassword />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
