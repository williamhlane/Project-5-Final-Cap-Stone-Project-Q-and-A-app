
import './App.css';
import Categories from './componite/Categories';
import Questions from './componite/Questions';
import LogInScreen from './componite/LogInScreen';
import Resetpassword from './componite/Resetpassword';
import CreateUserScreen from './componite/CreateUserScreen';
import AccountSettings from './componite/AccountSettings';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
function App() {
  const backEnd = "http://localhost:3001";
  const [showLogIn, setShowLogIn] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [appState2, setappState] = useState();
  let appState = {
    loggedIn: false,
    username: null,
    alreadySetAppState: false
  };
  if (typeof (appState2) !== 'undefined') {
    appState = appState2;
  }
  fetch(`${backEnd}/users/session`, {
    method: 'POST',
    mode: 'cors',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    return res.json()
  }).then((res) => {
    if (res.authenticated === "true") {
      appState.loggedIn = true;
      appState.username = res.username;
    } else {
      appState.loggedIn = false;
    }
    if (!appState.alreadySetAppState) {
      appState.alreadySetAppState = true;
      setappState(appState);
    }
  }).catch((error) => {
    alert(`Error 2 : ${error}.`)
  })

  const logOut = () => {
    fetch(`${backEnd}/users/logout`,
      {
        mode: 'cors',
        credentials: 'include'
      }).then((res) =>{
        return res.json();
      }).then((res) => {
        alert(`${res.message}`);
      }).catch((e) => {
        alert(`Error logging out ${e}.`);
      });
      window.location.reload(true);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>LINUX FORUM</h1>
          <div id="headerLogIn">
          {appState.loggedIn ? <a onClick={() => setShowAccountSettings(true)}>Account Settings </a> : null}
            {appState.loggedIn ? <a onClick={logOut}> Log Out</a> : <a onClick={() => setShowLogIn(true)}>Log In </a>}
            {appState.loggedIn ? null : <a onClick={() => setShowCreateUser(true)}> Create User</a>}
          </div>
        </header>
   
        {appState.loggedIn ? <Categories /> : <div id="notLoggedIn"><h1>Welcome</h1><br /><h3>Please log in.</h3></div>}
        {appState.loggedIn ? <Questions /> : <div id="notLoggedIn2"><p>Welcom to the linux forum</p></div>}
        {showLogIn ? <LogInScreen setShowLogIn={setShowLogIn} backEnd={backEnd} appState={appState} setappState={setappState} /> : null}
        {showCreateUser ? <CreateUserScreen setShowCreateUser={setShowCreateUser} backEnd={backEnd} /> : null}
        {showAccountSettings ? <AccountSettings appState2={appState2} backEnd={backEnd}
        setShowAccountSettings={setShowAccountSettings} /> : null }
        <Route path="/resetpassword">
          <Resetpassword />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
