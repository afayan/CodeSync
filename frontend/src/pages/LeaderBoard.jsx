import React, { useEffect, useState } from "react";

function LeaderBoard() {

  const [userid, setUserId] = useState(-1)
  const [leaders, setLeaders] = useState([])
  const [islogged, setLogged] = useState(false)
  
  useEffect(()=>{

    function checkLogged() {

        // console.log(localStorage.getItem('auth'));
        

        if (localStorage.getItem('auth')) {
            setLogged(true)
            getLb()
        }

        else{
            setLogged(false)
        }
    }

    async function getLb() {
        const resp = await fetch('/api/getleaders', {
            headers:{
                'Content-type':'application/json',
                'authorization':"Bearer "+localStorage.getItem('auth')
            }
        })

        const data = await resp.json()
        setLeaders(data)
        console.log(leaders); 
    }

    checkLogged()
  },[])

  return (
    <div>
      <h1>Leaderboard</h1>

      <div className="leaderRoll">

        {leaders.map((person)=>{
        return <div key={person.user_id} className="lbnames">{person.username} solved:{person.question_count}  </div>
        })}
      </div>
    </div>
  )
}

export default LeaderBoard
