import React, { useState } from 'react'

function DummyLogin() {

  const [email, setEmail] = useState()
  const [password , setPassword] = useState()

  async function login() {
    
    const response = await fetch('/api/login', {
      method : 'post',
      headers : {
          "Content-type" : 'application/json'
      },
      body : JSON.stringify({
          email : email,
          password : password
      })
  })

  const data = await response.json()
  console.log(data);
    
  }



  return (
    <div>
        <div className="codesyncforms">
            <h1>Login</h1>
            <input type="text" placeholder='name'/>
            <input type="email" placeholder='email'/>

            <button onClick={login}>Login</button>
        </div>

    </div>
  )
}

export default DummyLogin
