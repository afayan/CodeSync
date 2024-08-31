import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {

    const [username, setUserName] = useState('nobody')
    const navigate = useNavigate()


    useEffect(()=>{

        function checkLogged() {
            if(localStorage.getItem('auth')){
              return true
            }
      
            else{
              return false
            }
          }

        async function getDetails() {
            
       

        console.log(localStorage.getItem('auth'));
        

        const resp = await fetch('/api/getUserInfo', {
            method: 'post',
            headers: {
                'Content-type' : 'application/json',
                'authorization' : "Bearer "+localStorage.getItem("auth")
            },
            body : JSON.stringify(
                {
                    authToken: localStorage.getItem("auth")
                }
            )
        })


        const data = await resp.json()
        console.log(data);
        setUserName(data.data.username)
    }

    if (checkLogged()) {  
        getDetails()
    }
    }, [])

    function logout() {
        // localStorage.setItem('auth', ' ')
        // navigate('/login')   

        console.log("Imma logout");
        
    }

    return(
        <>
        <h1>Hello {username}</h1>

        <button onClick={logout()}>Logout</button>

        <div style={{display:"flex", flexDirection:"column"}}>
        <Link to={'/Add'}>Add problem</Link>
        <Link to={'/problems/all'} >Problems</Link>


        <h1>Problems</h1>
        <Link to={'/problems/array'}>Array</Link>
        <Link to={'/problems/stack'}>Stack</Link>
        <Link to={'/problems/queue'}>Queue</Link>
        <Link to={'/problems/linkedlist'}>Linked List</Link>
        <Link to={'/problems/tree'}>Tree</Link>
        <Link to={'/problems/graph'}>Graph</Link>
        </div>
        </>
    );
}

export default Home

