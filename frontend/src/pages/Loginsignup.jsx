import React, { useState } from 'react'
import '../loginsignup.css'
import { useNavigate } from 'react-router-dom';




export const Loginsignup = () => {

    const [action,setAction] = useState("Sign up");

    const [email , setEmail] = useState()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [confP,setConfPass] = useState()
    const navigate = useNavigate()

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
          navigate('/home')
        }
        else{
          alert('wrong credentials')
        }
      }



      async function signup() {
        console.log(username, password, email, confP);  
        
        if (!username || !password || !email || !confP) {
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
                name : username,
                email : email,
                password : password
            })
        })

        const data = await response.json()
        console.log(data);
        
        alert("account created! Sign in to start")

        setUsername('')
        setPassword('')
        setEmail('')
    }



  return (
    <div className="container">
    <div className="header">
        <div className="text">{action}</div>   
        <div className="underline"></div>           
    </div>

    <div className="inputs">
        {action==="Login"?<div></div>:        <div className="input">
            <img src="" alt="" />
            <input type="text" placeholder='Name' onChange={(e)=>setUsername(t=>e.target.value)}/>
        </div>}
        

        <div className="input">
            <img src="" alt="" />
            <input type="email" placeholder='Email' onChange={(e)=>setEmail(t=>e.target.value)} />
        </div>
        

        <div className="input">
            <img src="" alt="" />
            <input type="password" placeholder='Password' onChange={(e)=>setPassword(t=>e.target.value)}/>
        </div>

        {action != "Login"? <div className="input">
            <img src="" alt="" />
            <input type="password" placeholder='Confirm Password' onChange={(e)=>setConfPass(t=>e.target.value)}/>
        </div>
  :  <p></p> } 


     </div>

     {action === "Login"? <button onClick={login} className='logButtons'>Login</button>:<button className='logButtons' onClick={signup} >Signup</button> } 
     <div className="submit-container">
        <div className={action==="Login"?"submit gray":"submit"}onClick={()=>{setAction("Sign up")}}>Sign up</div>
        <div className={action==="Sign up"?"submit gray":"submit"}onClick={()=>{setAction("Login")}}>Login</div>
     </div>
</div>
  )
}
