import React from 'react';
import {  Routes, Route } from 'react-router-dom';
import Login_smart from './containers/Login_Container';
import {Landing} from './components/Landing';
import SignUp from './components/Signup';
import {Dashboard} from './containers/Dashboard';
// import AuthComponent from './containers/AuthComponent';

function App() {
  return (
    <>
   
     
        <Routes>
          <Route  path="/"  exact element={<Landing/>} />
          <Route  path="/login" exact element={<Login_smart/>} />
          <Route  path="/signup" exact element={<SignUp/>} />
          {/* <AuthComponent> */}
            <Route  path="/dashboard" exact element={<Dashboard/>} />
          {/* </AuthComponent> */}
        </Routes>
     
    
    </>
  );
}

export default App;
