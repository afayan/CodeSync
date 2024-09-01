import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Home() {

    const [username, setUserName] = useState('nobody')
    const [islogged, setLogged] = useState(true)
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
        setUserName( "Hello "+ data.data.username + "!")
    }

    if (checkLogged()) {  
        getDetails()
    }

    else{
        setUserName('Welcome to CodeSync!')
    }
    }, [islogged])

    function logout() {
        // localStorage.setItem('auth', ' ')
        // navigate('/login')  
        
        localStorage.removeItem('auth')

        console.log("Imma logout");
        setLogged(false)
    }

    return(
        <>
        <h1>{username}</h1>
        {!islogged && <p>Pls login to start coding!</p> }

        <button onClick={()=>logout()}>Logout</button>

        <div style={{display:"flex", flexDirection:"column", color:"white"}}>
        <Link className="homepagebuttons" to={'/Add'}>Add problem</Link>
        <Link className="homepagebuttons" to={'/problems/all'} >Problems</Link>
        <Link className="homepagebuttons" to={'/leaderboard'}>LeaderBoard</Link>


        <h1>Problems</h1>
        <Link className="homepagebuttons" to={'/problems/array'}>Array</Link>
        <Link className="homepagebuttons" to={'/problems/stack'}>Stack</Link>
        <Link className="homepagebuttons" to={'/problems/queue'}>Queue</Link>
        <Link className="homepagebuttons" to={'/problems/linkedlist'}>Linked List</Link>
        <Link className="homepagebuttons" to={'/problems/tree'}>Tree</Link>
        <Link className="homepagebuttons" to={'/problems/graph'}>Graph</Link>
        </div>
        </>
    );
}

export default Home