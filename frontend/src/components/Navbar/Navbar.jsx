import { useEffect, useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {

    const [islogged, setLogged] = useState(0)
    const [username , setUsername] = useState('')
  
   
  
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
                
            }
    
            else{
                setLogged(false)
            }
        }
  
        checkLogged()}
  
    ,[])


  return (
    <>
        <div className="navbar" id="Navbar">
            <div className="navdiv">
                <div className="logo">
                    <a href="#">CodeSync</a>
                </div>
                <div className="nav-items">
                    <ul>
                        <li><Link to={'/home'}>Problems</Link></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="auth-buttons">
                { !islogged && <Link to={'/logsign'}><button className="button">Login</button></Link> }
                { !islogged && <Link to={'/logsign'}><button className="button">SignUp</button></Link>}  

                {islogged && <Link to={'/profile'}>Hello {username}</Link> }
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
