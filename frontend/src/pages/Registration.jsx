import "./registration.css";
import Logo from "../components/Logo/Logo";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Registration() {
  const [isSignUp, setIsSignUp] = useState(true); 
  const [buttonText, setButtonText] = useState(isSignUp ? 'Sign Up' : 'Login'); 

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confP, setConfPass] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setButtonText(isSignUp ? 'Login' : 'Sign Up'); 
  };

  const handleMouseEnter = () => {
    setButtonText(isSignUp ? 'Thanks!' : 'Welcome!'); 
  };

  const handleMouseLeave = () => {
    setButtonText(isSignUp ? 'Sign Up' : 'Login'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (isSignUp) {
      if (!username || !password || !email || !confP) {
        alert("Something is empty");
        return false;
      }

      if (confP !== password) {
        alert("Passwords do not match");
        return false;
      }

      const response = await fetch('/api/signup', {
        method: 'post',
        headers: {
          "Content-type": 'application/json'
        },
        body: JSON.stringify({
          name: username,
          email: email,
          password: password
        })
      });

      const data = await response.json();
      console.log(data);
      alert("Account created! Sign in to start");

      setUsername('');
      setPassword('');
      setEmail('');
      setConfPass('');

    } else {
      const response = await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message) {
        localStorage.setItem('auth', data.accessToken);
        navigate('/home');
      } else {
        alert('Wrong credentials');
      }
    }
  };

  return (
    <>
      <Logo />
      <div className="page">
      <div className="container">
        <div className="form-box">
          <div className="form-header">
            <h2 id="form-title">{isSignUp ? 'Sign Up' : 'Login'}</h2>
          </div>
          <form id="form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div id="extra-field" className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isSignUp && (
              <div className="input-group">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confP}
                  onChange={(e) => setConfPass(e.target.value)}
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className="reg-button"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
      <div className="arrow-container">
        <button id="toggle-btn" className="arrow-btn" onClick={toggleForm}>➔</button>
        <p className="message">
          {isSignUp ? 'Already registered? Click the arrow to Login!' : 'Are you a new user? Click the arrow to Sign Up!'}
        </p>
      </div>
      </div>
    </>
  );
}

export default Registration;
