import React from 'react'
import Login from './lR/Login'
import Register from './lR/Register'
import "./lR/LR.css";
import { Tab, Tabs, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function LoginRegister() {
  return (
 


    
    <div className="login-and-register">
      <Tabs defaultActiveKey="login" id="login-register-tabs">
        <Tab eventKey="login" title="Login">
          <div className="form-container">
            <form className="login-form">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="btn btn-primary">Login</button>
            </form>
          </div>
        </Tab>
        <Tab eventKey="register" title="Register">
          <div className="form-container">
            <form className="register-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
              </div>
              <button type="submit" className="btn btn-primary">Register</button>
            </form>
          </div>
        </Tab>
      </Tabs>

    </div>
  )
}

export default LoginRegister