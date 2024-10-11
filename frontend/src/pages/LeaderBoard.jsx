import React, { useEffect, useState } from "react";

function LeaderBoard() {
  const [userid, setUserId] = useState(-1);
  const [leaders, setLeaders] = useState([]);
  const [islogged, setLogged] = useState(false);
  const [rank, setRank] = useState("N/A")
  

  useEffect(() => {
    function checkLogged() {
      // console.log(localStorage.getItem('auth'));

      if (localStorage.getItem("auth")) {
        setLogged(true);
        getLb();
      } else {
        setLogged(false);
      }
    }

    async function getLb() {
      const resp = await fetch("/api/getleaders", {
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("auth"),
        },
      });

      const data = await resp.json();
      setLeaders(data.leaders);
      setUserId(data.me)
    }
    checkLogged();
  }, []);

  useEffect(()=>{
    function checkRank() {
      leaders.map((person)=>{
  
        if (person.userid == userid) {
          setRank(leaders.indexOf(person)+1)  
        }

      })
    }

    console.log(leaders);
    
    checkRank()
  }, [leaders, userid])

  return (
    <div className="lb">
      <h1 className="lbheader">Leaderboard</h1>

      <p className="rank">My Rank: {rank}</p>

      <div className="leaderRoll">
        {leaders.map((person) => {
          return (
            <div key={person.user_id} className={person.user_id == userid? "lbnames highlighted" : 'lbnames'}>
              {person.username} solved:{person.question_count}{" "}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default LeaderBoard;
