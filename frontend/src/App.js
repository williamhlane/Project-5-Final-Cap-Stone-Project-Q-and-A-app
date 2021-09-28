
import './App.css';
import Categories from './componite/Categories';
import Questions from './componite/Questions';
import LogInScreen from './componite/LogInScreen';
import Resetpassword from './componite/Resetpassword';
import CreateUserScreen from './componite/CreateUserScreen';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
function App() {
  const backEnd = "http://localhost:3001";
  const [showLogIn, setShowLogIn] = useState(false);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [appState2, setappState] = useState({ loggedIn: false });


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
      console.log('rl' , res);
      appState.loggedIn = true;
      appState.username = res.username;
      setappState(appState);
    } else {
      alert(`Error: ${res.status}`);
    }

  }).catch((error) => {
    alert(`Error 2 : ${error}.`)
  })

  let appState = appState2;
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>LINUX FORUM</h1>
          <div id="headerLogIn">
            {appState2.loggedIn ? <a href="">Log Out</a> : <a onClick={() => setShowLogIn(true)}>Log In </a>}
            {appState2.loggedIn ? null : <a onClick={() => setShowCreateUser(true)}> Create User</a>}
          </div>
        </header>

        {appState2.loggedIn ? <Categories /> : <div id="notLoggedIn"><h1>Welcome</h1><br /><h3>Please log in.</h3></div>}
        {appState2.loggedIn ? <Questions /> : <div id="notLoggedIn2"><p>Welcom to the linux forum</p></div>}
        {showLogIn ? <LogInScreen setShowLogIn={setShowLogIn} backEnd={backEnd} appState={appState} setappState={setappState} /> : null}
        {showCreateUser ? <CreateUserScreen setShowCreateUser={setShowCreateUser} backEnd={backEnd} /> : null}

        <Route path="/resetpassword">
          <Resetpassword />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
