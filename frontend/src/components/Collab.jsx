import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Collab(props) {
  const [room, setRoom] = useState();
  const [searchResults, setSR] = useState([]);
  // const [socket, setSocket] = useState(null)
  // const [live, setLive] = useState(props.live)
  const [people, setPeople] = useState([])
  const [username, setUname] = useState('')

  const socket = props.socket
  const setSocket = props.setSocket

  async function generateRoom() {

  }
  
  async function joinRoom() {
    //validate from backend
    //warning! your data may be lost
    const newsocket = io("http://localhost:5000")
    setSocket(newsocket)

    const res = await fetch('/api/getUserInfo', {
      method:'post',
      headers: {
        "Content-Type": "application/json",
        authorization : 'Bearer '+localStorage.getItem('auth')
      },
      body: JSON.stringify({})
    })

    const data = await res.json()
    console.log(data);
    
    console.log(data.data.username);
    props.setUname(data.data.username)
    newsocket.emit('join', room, data.data.username)
    props.setLive(true)
  }

  async function disconnect() {

    const u = props.username
    //break connection
    socket.emit('leave', {u, room})
    socket.disconnect()
    setSocket(null)
    props.setLive(false)
    setPeople([])
  }

  useEffect(()=>{

    if (socket) {
      socket.on('joined', (users)=>{
        console.log(users);
        
        setPeople(users)
        // console.log(user+" joined");
      })
    }
  },[socket])

  console.log("uname is "+ props.username);
  

  return (
    <div>
      <h1>Collaborate</h1>
      {props.live && <p>You are live</p> }
      <div className="collabButtonList">
        <button className="collabButtons" onClick={()=>generateRoom()}> Generate roomid </button>
        {!props.live && <button className="collabButtons" onClick={()=>joinRoom()}> Join room </button>}
        <input type="text" placeholder="room id" onChange={(e)=>setRoom(e.target.value)}/>
       {props.live && <button className="collabButtons" onClick={()=>disconnect()}> Disconnect </button>}
      </div>

      <ul>
        {people.map((people)=>{
          return <li key={people}>{people}</li>
        })}
      </ul>
    </div>
  );
}

export default Collab;
