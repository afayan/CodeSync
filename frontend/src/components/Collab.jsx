import React, { useEffect, useState } from 'react'

function Collab(props) {

    const [query, searchQuery] = useState('')
    const [searchResults, setSR] = useState([])

    async function searchFriend() {
        const res = await fetch('/api/getfriends', {
            method: 'post',
            headers:{
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("auth"),
            },
            body: JSON.stringify({
                query: query
            })
        })

        const data = await res.json()
        setSR(data)
    }

    function createRoom() {
        console.log(props.code);  
    }

    function updateCode(params) {
        console.log("im updating lol");
    }

    useEffect(()=>{
        updateCode()
    }, [props.code])

  return (
    <div>
      <h1>Collaborate</h1>
      <input type="text" name="" id="" placeholder='enter room id' onChange={(e)=>searchQuery(e.target.value)} />
      {/* <button onClick={()=>searchFriend()}>Join Room</button> */}
      <br />
      <button onClick={()=>createRoom()}>create room</button>
    </div>
  )
}

export default Collab
