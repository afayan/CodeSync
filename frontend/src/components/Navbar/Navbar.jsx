import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
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
                    <Link to={'/logsign'}><button className="button">Login</button></Link>
                    <Link to={'/logsign'}><button className="button">SignUp</button></Link>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
