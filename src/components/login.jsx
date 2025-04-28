import { useNavigate, Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import '../app.css';

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      email: form.email.value,
      password: form.password.value
    };

    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert((await res.json()).message || 'Something went wrong.');
    }
  };



  const handleGoogleSuccess = async (credentialResponse) => {
    console.log(credentialResponse);

    const res = await fetch('http://localhost:5000/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: credentialResponse.credential })
    });

    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('token', token);
      setIsLoggedIn(true);
      navigate('/');
    } else {
      alert('Google login failed.');
    }
  };


  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <button type="submit">Login</button>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            console.log('Login Failed');
          }}
        />


        {/* <button onClick={() => googleLogin()}>Login with Google </button> */}
        {/* <a href="http://localhost:5000/auth/google" className="google-btn">Continue with Google</a> */}
        
        <a href="http://localhost:5000/auth/facebook" className="facebook-btn">Continue with Facebook</a>

        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </form>
    </div>
  );
}


export default Login;


