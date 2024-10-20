import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GoAlert } from "react-icons/go";
import { IoIosAddCircleOutline } from "react-icons/io";



function Profile() {

  const [islogged, setLogged] = useState(0)
  const [username , setUsername] = useState('')
  const [userid, setUserid] = useState(-1)
  const [role, setRole] = useState('user')
  const [isAdmin, setadmin] = useState(false)
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [currentTab, setCurrentTab] = useState('p')  //profile info, admin settings, logout 
  const [profileInfo, setProfileInfo] = useState({})
  const [useless, setUseless] = useState([])
  const navigate = useNavigate()
  const [problems, setProblems] = useState([])
  const [confirmdelete, setcfdelete] = useState(false)
  const [q_to_delete, setQTD] = useState(null)

 

  useEffect(()=>{
      async function checkLogged() {
          if (localStorage.getItem('auth')) {
              setLogged(true)
              // console.log(localStorage.getItem('auth'));
  
              const resp = await fetch('/api/getUserInfo', {
                  method: 'post',
                  headers: {
                      'Content-type' : 'application/json',
                      'authorization' : "Bearer "+localStorage.getItem("auth")
                  },
                  body : JSON.stringify({})
              })

              const data = await resp.json()
              // console.log(data);

              setUsername(data.data.username)
              setUserid(data.data.userid)
              setRole(data.data.role)
              
              data.data.role === 'admin' ? setadmin(true) : setadmin(false)
          }
  
          else{
              setLogged(false)
              navigate('/registration')
          }
      }

      async function getProfileInfo() {
        const resp = await fetch('/api/getprofileInfo', {
          headers:{
            'authorization' : "Bearer "+localStorage.getItem("auth")
          }
        })
        const data = await resp.json()
        console.log("Profile data is", data); 
        setProfileInfo(data[0])        
      }

      checkLogged()
      getProfileInfo()
      getUseless()
      getProblemsToDelete()
    }
  ,[])

  async function getUseless() {
    const resp = await fetch('/api/getuseless')
    const data = await resp.json()
    console.log("data is ",data);
    setUseless(data)
  }

  function LogOut() {
    localStorage.removeItem('auth')
    navigate('/Registration')
  }

  async function getProblemsToDelete() {
    const resp = await fetch('/api/getProblemList/all')
    const data = await resp.json()
    
    
    setProblems(data)

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


  async function deleteQuestion(qid) {
    const resp = await fetch('/api/deleteproblem/'+qid , {
      headers: {
        'Content-type' : 'application/json',
        'authorization' : "Bearer "+localStorage.getItem("auth")
    } 
    })


    const data = await resp.json()
   if (data.status === 'success') {
    alert('question deleted successfully')
    setQTD(null)
    setcfdelete(false)

    getProblemsToDelete()
   } 
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
    <h1 className="dashboardheader">Profile</h1>
    <div className='profilepage'>
      <div className="profile-sidebar">
        <button onClick={()=>setCurrentTab('p')}>Profile</button>
        {isAdmin && <button onClick={()=>setCurrentTab('a')}>Admin</button>}
        <button onClick={()=>LogOut()}>Logout</button>
      </div>

 {currentTab === 'a' && <div className="rightcolumn">

      <h1>Admin settings</h1>

        <h2>Add problem</h2>
        <Link style={{top:'10px' , backgroundColor: 'black'}} className="homepagebuttons" to={'/Add'}>
        <IoIosAddCircleOutline style={{transform: 'translate(-3px,2px)'}}/>Add problem 
        </Link>
        {/* <h2>Make admin</h2>
        <input type="text" placeholder='enter username' onChange={(e)=>setSearch(e.target.value)} />
        <button onClick={searchUser}>Search</button> */}

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

        <div className='uselessroll'>
        <h2>Inactive users</h2>
          {useless.map((element)=>{
            return <div className='resultBars' key={element.username}>{element.username}</div>
          })}
        </div>

        <div className="uselessroll" style={{backgroundColor: 'black'}}>
          <h2 style={{color: '#f7564a'}} >Delete problem <GoAlert />
          </h2>  
            {problems.map((p)=>{
              return <div className='deleteQuestionContainers' key={p.q_id}>{p.qname}
              <button onClick={()=>{setcfdelete(true) ; setQTD(p)}}>Delete</button>
              </div>
            })}   
            
        </div>

       {confirmdelete && <div className='deletebanner'>
          <h2><GoAlert style={{marginRight:'14px'}} size={30}/>delete {q_to_delete.qname}?</h2>
          <button onClick={()=>deleteQuestion(q_to_delete.q_id)}>Yes</button>
          <button onClick={()=>{setcfdelete(false) ; setQTD(null)}}>Cancel</button>
        </div>}


        {confirmdelete && <div className='blurbox'></div>}
      </div>}

      {
        currentTab === 'p' && <div className='rightcolumn'>
          <h2>Profile info</h2>
          {profileInfo.username ? 
          <div>
          
          <div className='profileInfo'>
            <p>username: {profileInfo.username}</p>
            <p>email: {profileInfo.email}</p>
            <p>status: {profileInfo.role}</p>
          </div> 

          <h2>Account info</h2>
          <div className="profileInfo">
            <p>Solved : {profileInfo.solved}/{profileInfo.total}</p>
            <p>Progress: {Math.round((profileInfo.solved/profileInfo.total)*100)}% completed</p>
          </div>
          </div>
          :
          <p>
            loading
          </p> 
        }
        </div>
      }
    </div>

    </>

  )
}

export default Profile
