import "./Navbar.css"

const Navbar = () => {
  return (
    <>
        <div className="navbar" id="Navbar">
            <div className="navdiv">
                <div className="logo">
                    <a href="#">CodeSync</a>
                </div>
                <ul>
                    <li><a href="#">Problems</a></li>
                    <li><a href="#">About US</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <button className="button">
                        Login
                    </button>
                    <button className="button">
                        SignUp
                    </button>
                </ul>
            </div>

        </div>
    </>
  )
}

export default Navbar