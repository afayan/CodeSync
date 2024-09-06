import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {

  const [islogged, setLogged] = useState(0)
  const [username , setUsername] = useState('')
  const [userid, setUserid] = useState(-1)
  const [role, setRole] = useState('user')
  const [isAdmin, setadmin] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const navigate = useNavigate()

 

  useEffect(()=>{
      async function checkLogged() {
          if (localStorage.getItem('auth')) {
              setLogged(true)
              console.log(localStorage.getItem('auth'));
  
              const resp = await fetch('/api/getUserInfo', {
                  method: 'post',
                  headers: {
                      'Content-type' : 'application/json',
                      'authorization' : "Bearer "+localStorage.getItem("auth")
                  },
                  body : JSON.stringify({})
              })

              const data = await resp.json()
              console.log(data);

              setUsername(data.data.username)
              setUserid(data.data.userid)
              setRole(data.data.role)
              
              data.data.role === 'admin' ? setadmin(true) : setadmin(false)
          }
  
          else{
              setLogged(false)
              navigate('/logsign')
          }
      }

      checkLogged()}

  ,[])

  function LogOut() {
    localStorage.removeItem('auth')
    navigate('/logsign')
  }

  async function searchUser() {
    console.log(search);
    
    const resp = await fetch('/api/searchuser', {
      method:'post',
      headers:{
        "Content-type": 'application/json'
      },
      body: JSON.stringify({
        query: search,
        userid: userid
      })
    })

    const data = await resp.json()
    console.log(data);
    setSearchResults(data)
  }

  async function makeAdmin(id) {
    
    console.log(id);

    const resp = await fetch('/api/makeAdmin', {
      method: 'post',
      headers: {
          'Content-type' : 'application/json',
          'authorization' : "Bearer "+localStorage.getItem("auth")
      },
      body : JSON.stringify(
          {
              id: id
          }
      )
  })


  const data = await resp.json()
  console.log(data);
  }

  return (
    <div>
      <h1>Profile</h1>
      <div className="sidebar">
        <button onClick={()=>LogOut()}>Logout</button>
        {isAdmin && <button>Admin</button>}
      </div>

 {isAdmin && <div className="rightcolumn">
        <h2>Search user</h2>
        <input type="text" onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={searchUser}>Search</button>

        <div className="namesearchresults">
          {searchResults.map((element)=>{
            return <div className='resultBars' key={element.userid}>{element.username}
            {element.role === 'admin' ?
            <button onClick={()=>makeAdmin(element.userid)}>Revoke admin</button>
            :
            <button onClick={()=>makeAdmin(element.userid)}>Make admin</button>
          }
            </div>
          })}
        </div>
      </div>}


    </div>
  )
}

export default Profile
