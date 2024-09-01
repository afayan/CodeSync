import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function DummySignup() {

    const [name , setName ] = useState()
    const [email, setEmail] = useState()
    const [password , setPassword] = useState()
    const [confP, setConfPass] = useState()


    async function signup() {
        console.log(name, password, email, confP);  
        
        if (!name || !password || !email || !confP) {
            alert("Something is empty")
            return false
        }

        //validate the form
        //send data to database after validation

        if (confP != password) {
            alert("passwords do not match")
            return false
        }


        const response = await fetch('/api/signup', {
            method : 'post',
            headers : {
                "Content-type" : 'application/json'
            },
            body : JSON.stringify({
                name : name,
                email : email,
                password : password
            })
        })

        const data = await response.json()
        console.log(data);
        
        alert("account created! Sign in to start")
    }

  return (
    <div>
      <div className="codesyncforms">
            <h1>Signup</h1>
            <input type="text"  onChange={(e)=>setName(n => e.target.value)}  placeholder='name'/>
            <input type="email"  onChange={(e)=>setEmail(n => e.target.value)} placeholder='email'/>
            <input type="password"  onChange={(e)=>setPassword(n => e.target.value)} placeholder='password'/>
            <input type="password" onChange={(e)=>setConfPass(n => e.target.value)}  placeholder='confirm password'/>
            <button onClick={signup}>Create account</button>
            <Link to={'/login'} >Log in</Link>
        </div>
    </div>
  )
}

export default DummySignup
