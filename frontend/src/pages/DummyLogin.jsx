import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function DummyLogin() {


  const navigate = useNavigate()

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function login() {
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

    // data.message ? navigate('/') : alert("wrong credentials")
 
    if (data.message) {
      localStorage.setItem('auth', data.accessToken)
      alert('yoo')
      navigate('/')
    }
    else{
      alert('wrong credentials')
    }

  }

  return (
    <div>
      <div className="codesyncforms">
        <h1>Login</h1>
        <input type="email" onChange={(e)=>setEmail(n => e.target.value)} placeholder="email" />
        <input type="text" onChange={(e)=>setPassword(n => e.target.value)} placeholder="password" />
        <button onClick={login}>Login</button>
        <Link to={'/signup'} >Sign Up</Link>
      </div>
    </div>
  );
}

export default DummyLogin;
