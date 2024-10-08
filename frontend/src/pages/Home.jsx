import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Home() {

    const [username, setUserName] = useState('nobody')
    const [islogged, setLogged] = useState(false)
    const [chartInfo, setChartInfo] = useState([])
    const navigate = useNavigate()


    useEffect(()=>{
        if (localStorage.getItem('auth')) {
            setLogged(true)
        }
        else{
            setLogged(false)
        }
    },[])


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
        setUserName( data.data.username + "'s dashboard")
    }

    if (checkLogged()) {  
        getDetails()
        getChartInfo()
    }

    else{
        setUserName('Welcome to CodeSync!')
    }

    async function getChartInfo() {
        console.log("lets get chart info");
        const res = await fetch('/api/getchartinfo', {
            headers: {
                'Content-type' : 'application/json',
                'authorization' : "Bearer "+localStorage.getItem("auth")
            },
        })

        const data = await res.json()
        console.log(data);
        setChartInfo(data)
        
    }

    }, [islogged])

    

    function logout() {        
        localStorage.removeItem('auth')
        console.log("Imma logout");
        setLogged(false)
    }

    //info needed for dashboard:
    //solved, total, solved by each category 
    

    return(
        <>
        <Navbar/>
        <h1>{username}</h1>
        {!islogged && <p>Pls login to start coding!</p> }

       {!islogged && <button onClick={()=>navigate('/registration')}>Sign in</button>}

        {islogged && <Statsdiv chartInfo = {chartInfo}/>}

        <div style={{display:"flex", flexDirection:"column", color:"white"}}>
        <Link className="homepagebuttons" to={'/profile'}>Profile</Link>
        <Link className="homepagebuttons" to={'/problems/all'} >Problems</Link>
        <Link className="homepagebuttons" to={'/leaderboard'}>LeaderBoard</Link>

        <h1>Problems</h1>
        <div className="typrButtonRoll">

        <Link className="dtypeButtons" to={'/problems/array'}>Array</Link>
        <Link className="dtypeButtons" to={'/problems/stack'}>Stack</Link>
        <Link className="dtypeButtons" to={'/problems/queue'}>Queue</Link>
        <Link className="dtypeButtons" to={'/problems/linkedlist'}>Linked List</Link>
        <Link className="dtypeButtons" to={'/problems/tree'}>Tree</Link>
        <Link className="dtypeButtons" to={'/problems/graph'}>Graph</Link>
        <Link className="dtypeButtons" to={'/problems/algorithm'}>Algorithm</Link>

        </div>
        </div>
        </>
    );
}

export default Home


function Statsdiv(props) {

    // console.log(props);

        
        return(
            <div className="chartSection">
            <h1>My stats</h1>
            <div>
            {props.chartInfo.map((solType)=>{
                return <div key={solType.qtype}>
                    <p>{solType.qtype}</p>
                    <p>solved : {solType.usercount}/{solType.qcount} </p>
                </div> 
            })}

            </div>
            </div>
        )
    }

