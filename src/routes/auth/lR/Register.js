import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./LR.css";

function Register() {
  const [name, setName] = useState('');
  const [registerAsWriter, setRegisterAsWriter] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleRegisterAsWriterChange = (e) => {
    setRegisterAsWriter(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password ,user: registerAsWriter ? 1 : 2 }),
    });

    const data = await response.json();

    setIsLoading(false);

    if (response.ok) {
      localStorage.setItem('token', (data.token));
      localStorage.setItem('paid', (data.paid));
      localStorage.setItem('userId', (data.user_id));
      localStorage.setItem('userType', (data.user_type));

      window.location.reload(true);
      window.location.href = '/';
      // if(data.paid==1){
      //   window.location.href = '/';
      //   window.location.reload(true);
      // }
      // else{
      //   // checkout.show({amount: 1000})
        
      // }

      console.log(data);
    } else {
      // Error - display the error message
      setError(data.message);
    }
    setIsLoading(false);

  };
  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
      <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
             <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          id="register-as-writer"
          name="register-as-writer"
          value="writer"
          checked={registerAsWriter}
          onChange={handleRegisterAsWriterChange}
        />
        <label htmlFor="register-as-writer" style={{ marginLeft: '0.5rem' }}>
          Register as Writer
        </label>
      </div>


       <button type="submit" disabled={isLoading}>
  {isLoading ? 'Logging in...' : 'Login'}
</button>

      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Register