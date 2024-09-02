import "./Navbar.css"

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
                        <li><a href="http://localhost:5173/home">Problems</a></li>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
                <div className="auth-buttons">
                    <a href="http://localhost:5173/logsign"><button className="button">Login</button></a>
                    <a href="http://localhost:5173/logsign"><button className="button">SignUp</button></a>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
