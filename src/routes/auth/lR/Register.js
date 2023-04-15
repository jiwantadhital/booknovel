import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LR.css";

function Register() {
  
  return (
    <div>
       <form className="auth-form">
            <input type="text" placeholder="Username" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className='auth-button' type="submit">Register</button>
          </form>
    </div>
  )
}

export default Register