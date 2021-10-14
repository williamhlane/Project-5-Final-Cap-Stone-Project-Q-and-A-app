
import './App.css';
import Categories from './componite/Categories';
import Questions from './componite/Questions';
import LogInScreen from './componite/LogInScreen';
import Resetpassword from './componite/Resetpassword';
import CreateUserScreen from './componite/CreateUserScreen';
import AccountSettings from './componite/AccountSettings';
import React from 'react';
import { useState } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
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
    console.log(`Error 2 : ${error}.`)
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
        console.log(`Error logging out ${e}.`);
      });
      window.location.reload(true);
  }
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>LINUX FORUM</h1>
          <div id="headerLogIn">
          {appState.loggedIn ? <span href="#" onClick={() => setShowAccountSettings(true)}>Account Settings </span> : null}
            {appState.loggedIn ? <span href="#" onClick={logOut}> Log Out</span> : <span onClick={() => setShowLogIn(true)}>Log In </span>}
            {appState.loggedIn ? null : <span href="#" onClick={() => setShowCreateUser(true)}> Create User</span>}
          </div>
        </header>
   
        {appState.loggedIn ? <Categories appState2={appState2} backEnd={backEnd} /> : <div id="notLoggedIn"><h1>Welcome</h1><br /><h3>Please log in.</h3></div>}
        {appState.loggedIn ? <Questions /> : <div id="notLoggedIn2"><p>Welcom to the linux forum</p></div>}
        {showLogIn ? <LogInScreen setShowLogIn={setShowLogIn} backEnd={backEnd} appState={appState} setappState={setappState} /> : null}
        {showCreateUser ? <CreateUserScreen setShowCreateUser={setShowCreateUser} backEnd={backEnd} /> : null}
        {showAccountSettings ? <AccountSettings appState2={appState2} backEnd={backEnd}
        setShowAccountSettings={setShowAccountSettings} /> : null }
        <Route path="/resetpassword">
          <Resetpassword backEnd={backEnd} />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
 