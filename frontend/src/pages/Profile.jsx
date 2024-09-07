import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function Profile() {

  const [islogged, setLogged] = useState(0)
  const [username , setUsername] = useState('')
  const [userid, setUserid] = useState(-1)
  const [role, setRole] = useState('user')
  const [isAdmin, setadmin] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentTab, setCurrentTab] = useState('p')  //profile info, admin settings, logout 
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

    <>
    <h1>Profile</h1>
    <div className='profilepage'>
      <div className="sidebar">
        <button onClick={()=>setCurrentTab('p')}>Profile</button>
        {isAdmin && <button onClick={()=>setCurrentTab('a')}>Admin</button>}
        <button onClick={()=>LogOut()}>Logout</button>
      </div>

 {currentTab === 'a' && <div className="rightcolumn">

        <h2>Add problem</h2>
        <Link className="homepagebuttons" to={'/Add'}>Add problem</Link>
        <h2>Make admin</h2>
        <input type="text" placeholder='enter username' onChange={(e)=>setSearch(e.target.value)} />
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

      {
        currentTab === 'p' && <div className='rightcolumn'>
          <h1>My profile</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, obcaecati odit provident explicabo accusamus dicta laborum minus aperiam quas earum!</p>
        </div>
      }


    </div>

    </>

  )
}

export default Profile
