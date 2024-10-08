import { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { IoClose } from "react-icons/io5";



const Navbar = () => {
  const [islogged, setLogged] = useState(0);
  const [username, setUsername] = useState("");
  const [showSidebar, setSidebar] = useState(false)

  useEffect(() => {
    async function checkLogged() {
      if (localStorage.getItem("auth")) {
        setLogged(true);
        console.log(localStorage.getItem("auth"));

        const resp = await fetch("/api/getUserInfo", {
          method: "post",
          headers: {
            "Content-type": "application/json",
            authorization: "Bearer " + localStorage.getItem("auth"),
          },
          body: JSON.stringify({}),
        });

        const data = await resp.json();
        console.log(data);

        setUsername(data.data.username);
      } else {
        setLogged(false);
      }
    }

    checkLogged();
  }, []);

  return (
    <>
      <div className="navbar" id="Navbar">
        <div className="navdiv ">
          <div className="logo">
            <Link to={"/"}>CodeSync</Link>
          </div>
          <div className="nav-items hideonPhone">
            <ul className="navul">
              <li className="navli">
                <Link to={"/home"}>Dashboard</Link>
              </li>
              <li className="navli">
                <a href="#obj">About Us</a>
              </li>
              <li className="navli">
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="auth-buttons hideonPhone">
            {!islogged && (
              <Link to={"/Registration"}>
                <button className="button">Login</button>
              </Link>
            )}
            {!islogged && (
              <Link to={"/Registration"}>
                <button className="button">SignUp</button>
              </Link>
            )}

            {islogged && <Link to={"/profile"}>Hello {username}</Link>}
          </div>
{ !showSidebar? <FiMenu className="menuicon" size={'25px'} onClick={()=>setSidebar(true)}/> :             <IoClose color="white" size={'23px'} onClick={()=>setSidebar(false)} />
}        </div>
      </div>

   {showSidebar &&<div className="sidebarNav">
        <ul>
       
          <li>
            <Link to={"/home"}>Home</Link>
          </li>
          <li>
            <Link to={"/"}>About us</Link>
          </li>
          <li>
            <Link to={"/"}>Contact us</Link>
          </li>
          {islogged && (
            <li>
              <Link to={"/profile"}>Profile</Link>
            </li>
          )}

          {!islogged && (
            <li>
              <Link to={"/logsign"}>login/signup</Link>
            </li>
          )}
        </ul>
      </div>}
    </>
  );
};

export default Navbar;
