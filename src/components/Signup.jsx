import { useNavigate, Link, Navigate } from 'react-router-dom';
import '../app.css'; 

function Signup({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      confirmPassword: form.confirmPassword.value
    };

    const res = await fetch('http://localhost:5000/auth/signup', {
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


  return (
    <div className="auth_container">
      <form className="auth_form" onSubmit={handleSignup}>
        <h2>Sign Up</h2>
        <input type="text" name="username" placeholder="Username" required />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );

}

export default Signup;

