
import './App.css';
import Categories from './componite/Categories';
import Questions from './componite/Questions';
import LogInScreen from './componite/LogInScreen';
import Resetpassword from './componite/Resetpassword';
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, BrowserRouter } from "react-router-dom";
let loggedIn = false;


function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>FORUM</h1>
          <div id="headerLogIn">
            {loggedIn ? <a href="">Log Out</a> : <a href="./login">Log In</a>}
          </div>
        </header>

        <Categories />
        <Questions />
        <Route path="/resetpassword">
          <Resetpassword />
        </Route>        
        <Route path="/login">
          <LogInScreen />
        </Route>

      </div>
    </BrowserRouter>
  );
}

export default App;
