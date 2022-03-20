import logo from './logo.svg';
import './App.css';
import Login from "./screens/Login"
import Pantry from "./screens/Pantry"
import React, { useState } from 'react';
function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState()
  const [pantry, setPantry] = useState()
  
   function logIn(user, pantry){
   console.log(user)
    if(user != undefined)
    {
     
      setUser(user)
      setPantry(pantry)
      setLoggedIn(true)

    }
  }

  if(loggedIn == false){
  return (
    <div>
      <Login logIn = {logIn}></Login>
     
    </div>
  );
  }
  else if(loggedIn == true){
    return(
      <div>
        <Pantry pantry={pantry} user={user}></Pantry>
      </div>
    )
  }
}

export default App;
