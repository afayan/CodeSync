import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

function Collab(props) {
  const [query, searchQuery] = useState("");
  const [searchResults, setSR] = useState([]);

  async function searchFriend() {
    const res = await fetch("/api/getfriends", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + localStorage.getItem("auth"),
      },
      body: JSON.stringify({
        query: query,
      }),
    });

    const data = await res.json();
    setSR(data);
  }

  // function createRoom() {
  //     console.log(props.code);
  //     props.socket.emit('join', query)
  // }

  // function sendMessage() {
  //     props.socket.emit('collab', props.code, query)
  // }

  // function updateCode() {
  //     console.log("im updating lol");
  // }

  // useEffect(()=>{
  //     sendMessage()
  // }, [props.code])

  async function generateRoom() {
    
  }


  return (
    <div>
      <h1>Collaborate</h1>
      <div className="collabButtonList">
        <button className="collabButtons" onClick={()=>generateRoom()}> Generate roomid </button>
        <button className="collabButtons"> Join room </button>
        <button className="collabButtons"> Disconnect </button>
      </div>
    </div>
  );
}

export default Collab;
