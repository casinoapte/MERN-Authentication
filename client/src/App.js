import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Router, Route } from 'react-router-dom';
import axios from 'axios'
import UserContext from './contexts/UserContext'
import Home from './pages/Home';
import Header from './components/header/Header';
import Login from './components/auth/login/Login';
import Register from './components/auth/register/Register';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  useEffect(() => {
    const checkLoggedIn = async () => {

      let token = localStorage.getItem("auth-token");

      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }

      const tokenRes = await axios.post(
        "http://localhost:5000/auth/userRoutes/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );

      console.log(tokenRes.data);

      if (tokenRes.data) {
        const userRes = await axios.get(
          "http://localhost:5000/auth/userRoutes/",
          { headers: { "x-auth-token": token } 
        });
        setUserData({
          token,
          user: userRes.data 
        })
      }
    };
    checkLoggedIn()
  }, [])



  return (
    <>
      <BrowserRouter>

        <UserContext.Provider value={{ userData, setUserData }}>

          <Header />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>

        </UserContext.Provider>

      </BrowserRouter>
    </>
  );
}

export default App;
