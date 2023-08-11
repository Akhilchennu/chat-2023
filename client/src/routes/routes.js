import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Login from '../containers/Login';
import Signup from '../containers/signUp';
import HomePage from '../containers/homePage';
import Login from '../containers/login';
// import Dashboard from '../containers/Dashboard';
// import PageNotFound from '../containers/PageNotFound'
// import  PrivateRoutes  from './privateRoutes.js';

const pageRoutes=() =>{
  return (
    <BrowserRouter>
    <Routes>
    <Route exact path='/' element={<HomePage/>}/>
    {/* <Route exact path='/login' component={Login}/>  */}
     <Route exact path='/signup' element={<Signup/>}/>
     <Route exact path='/login' element={<Login/>}/>
    {/* <PrivateRoutes exact path='/dashboard' component={Dashboard} />
    <Route path="*" component={PageNotFound} />  */}
    </Routes>
    </BrowserRouter>
  );
}

export default pageRoutes;
