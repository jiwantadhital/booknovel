import React, { useState } from 'react';
import Login from './lR/Login'
import Register from './lR/Register'
import "./lR/LR.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Header'
import Footer from '../../components/Footer';
function LoginRegister() {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <div>
                                                          <Header/>

    <div className='aC'>

    <div class="auth-container">
<div className="auth-component-container">

      <div className="auth-tab-bar">
        <div
          className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
          onClick={() => handleTabClick("login")}
        >
          Login
        </div>
        <div
          className={`auth-tab ${activeTab === "register" ? "active" : ""}`}
          onClick={() => handleTabClick("register")}
        >
          Register
        </div>
      </div>
     
      <div className="auth-form-container">
        {activeTab === "login" && (
          <Login/>
        )}
        {activeTab === "register" && (
         <Register/>
        )}
      </div>
    </div>
    </div>

    </div>
    <Footer/>

    </div>
  )
}

export default LoginRegister