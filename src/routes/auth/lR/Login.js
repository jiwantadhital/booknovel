import { useState } from 'react';
import "./LR.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import KhaltiCheckout from "khalti-checkout-web";
import config from "../../../components/khalti/khalti_config";
function Login() {
  let checkout = new KhaltiCheckout(config);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handlePaid = async () => {
    const response = await fetch('http://localhost:8000/api/add/paid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "id": localStorage.getItem('forPaid')
      }),
    });
  
    const data = await response.json();
    if (response.ok) {
     
      console.log(data);
    } else {
      console.log("Error");
      // Error - display the error message
    }
  
  };  
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


    if (response.ok) {
      if(localStorage.getItem('paid')==="1"){
        handlePaid();
      }
      localStorage.setItem('token', (data.token));
      localStorage.setItem('paid', (data.paid));
      localStorage.setItem('userId', (data.user_id));
      localStorage.setItem('forPaid', (data.user_id));
      localStorage.setItem('userType', (data.user_type));
      setTimeout(() => {
        setIsLoading(false);

        window.location.reload(true);
        window.location.href = '/';
      }, 500);

      // if(data.paid==1){
      //   window.location.href = '/';
      //   window.location.reload(true);
      // }
      // else{
      //   // checkout.show({amount: 1000})
        
      // }

      console.log(data);
    } else {
      setIsLoading(false);

      // Error - display the error message
      setError(data.message);
    }

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