import { useState } from 'react';
import "./LR.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, SnackbarContent } from '@material-ui/core';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    setIsLoading(false);

    if (response.ok) {
      localStorage.setItem('token', (data.token));
      localStorage.setItem('paid', (data.paid));
      localStorage.setItem('userId', (data.id));
      window.location.reload(true);
      window.location.href = '/'; 
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
       <button type="submit" disabled={isLoading}>
  {isLoading ? 'Logging in...' : 'Login'}
</button>

      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login