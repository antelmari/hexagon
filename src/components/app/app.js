import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import { links } from "../../api/functions";

import Main from "../pages/main/main";
import Authorization from "../pages/authorization/authorization";
import Registration from "../pages/registration/registration";

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, loggedIn] = useState(false);
  const [inputData, setInputData] = useState([]);

  useEffect(() => {
    if(isLoggedIn) {
      links.statistics(localStorage.getItem('jwt'))
        .then((res) => {
          setInputData(res);
        })
        .catch((err) => {
          console.log(err);
        })  
    }
  }, [isLoggedIn]);
  
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    token && 
    links.statistics(token)
      .then((res) => {
        loggedIn(true);
        setInputData(res);
        navigate('/', {replace: true});
      })
  }, []);

  return (
    <Routes>
        {/* главная */}
        <Route path="/" element={ isLoggedIn ?
          <Main inputData={ inputData } setInputData={ setInputData } isLoggedIn={ isLoggedIn } loggedIn={ loggedIn } /> :
          <Navigate to='/authorization' replace />}/>

        {/* авторизация */}
        <Route path="/authorization" element={ <Authorization loggedIn={ loggedIn }/> }/>

        {/* регистрация */}
        <Route path="/registration" element={ <Registration/> }/>
    </Routes>
  );
}

export default App;