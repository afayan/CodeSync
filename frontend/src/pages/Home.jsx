import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

function Home() {
  const [username, setUserName] = useState("nobody");
  const [islogged, setLogged] = useState(false);
  const [chartInfo, setChartInfo] = useState([]);
  const [profileInfo, setprofileInfo] = useState([]);
  const [bcolor, setbcolor] = useState("#ffe840");
  const [myRank, setMyrank] = useState("...");
  const [leaders, setLdrs] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth")) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, []);

  useEffect(() => {
    function checkLogged() {
      if (localStorage.getItem("auth")) {
        return true;
      } else {
        return false;
      }
    }

    async function getDetails() {
      console.log(localStorage.getItem("auth"));

      const resp = await fetch("/api/getUserInfo", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("auth"),
        },
        body: JSON.stringify({
          authToken: localStorage.getItem("auth"),
        }),
      });

      const data = await resp.json();
      console.log(data);
      setUserName(data.data.username);
    }

    if (checkLogged()) {
      getDetails();
      getChartInfo();
      getUserDetails();
      getRank();
    } else {
      setUserName("Welcome to CodeSync!");
    }

    async function getChartInfo() {
      console.log("lets get chart info");
      const res = await fetch("/api/getchartinfo", {
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + localStorage.getItem("auth"),
        },
      });

      const data = await res.json();
      console.log(data);
      setChartInfo(data);
    }

    async function getUserDetails() {
      const resp = await fetch("/api/getprofileInfo", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("auth"),
        },
      });
      const data = await resp.json();
      console.log("Profile data is", data);
      setprofileInfo(data);
      console.log(profileInfo);

      if (profileInfo[0]) {
        const p = Math.round(
          (profileInfo[0].solved / profileInfo[0].total) * 100
        );
        if (p == 0) {
          setbcolor("#ff4545");
        } else if (p == 100) {
          setbcolor("lightgreen");
        }
      }
    }
  }, [islogged]);


  useEffect(()=>{
      leaders.map((p)=>{
      if (p.username == username) {
        setMyrank(leaders.indexOf(p)+1)
      }
    })
  }, [leaders])

  function logout() {
    localStorage.removeItem("auth");
    console.log("Imma logout");
    setLogged(false);
  }

  async function getRank() {
    const resp = await fetch("/api/getleaders", {
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("auth"),
      },
    });

    const data = await resp.json();
    // data.leaders.map((p)=>{
    //   if (p.username == username) {
    //     setMyrank(leaders.indexOf(person)+1)
    //   }
    // })

    console.log("leaders ", data);
    setLdrs(data.leaders)
    console.log(username);
  }

  //info needed for dashboard:
  //solved, total, solved by each category

  const progressbarwidth = 400;

  return (
    <>
      <Navbar />
      <h1 className="dashboardheader">{islogged ? username+"'s dashboard": "Welcome to codesync"}</h1>
      {!islogged && <p>Pls login to start coding!</p>}

      {!islogged && (
        <button onClick={() => navigate("/registration")}>Sign in</button>
      )}

      {/* {profileInfo[0] && (
        <div className="userchart" style={{ borderColor: bcolor }}>
          <p>
            {Math.round((profileInfo[0].solved / profileInfo[0].total) * 100)}%
            completed
          </p>
        </div>
      )} */}

      <div>
        <div className="dashboardtop">
          <Link className="homepagebuttons" id="profbutton" to={"/profile"}>
          <span className="hpbtext">Profile</span> 
          </Link>
          <Link
            className="homepagebuttons"
            id="probbutton"
            to={"/problems/all"}
          >
            <span className="hpbtext">Problems</span> 
            {profileInfo[0] && (
              <div className="progressbarContainer hideOnMobile">
                <div
                  className="innerpb"
                  style={{ width: progressbarwidth + "px" }}
                >
                  <div
                    className="outerpb"
                    style={{
                      width: Math.round(
                        (profileInfo[0].solved / profileInfo[0].total) *
                          progressbarwidth
                      ),
                    }}
                  >
                    <p>
                      {Math.round(
                        (profileInfo[0].solved / profileInfo[0].total) * 100
                      )}
                      % solved
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Link>
          <Link
            className="homepagebuttons"
            id="leaderbutton"
            to={"/leaderboard"}
          >
            <span className="hpbtext">LeaderBoard</span> 
            <span className="smallrank">Rank</span>
            <p className="ranktext"> {myRank}</p>
          </Link>
        </div>

        {islogged && <Statsdiv chartInfo={chartInfo} />}
        <h1 className="dashboardheader">Problems</h1>
        <div className="typeButtonRoll">
          <Link className="dtypeButtons" to={"/problems/array"}>
            Array
          </Link>
          <Link className="dtypeButtons" to={"/problems/stack"}>
            Stack
          </Link>
          <Link className="dtypeButtons" to={"/problems/queue"}>
            Queue
          </Link>
          <Link className="dtypeButtons" to={"/problems/linkedlist"}>
            Linked List
          </Link>
          <Link className="dtypeButtons" to={"/problems/tree"}>
            Tree
          </Link>
          <Link className="dtypeButtons" to={"/problems/graph"}>
            Graph
          </Link>
          <Link className="dtypeButtons" to={"/problems/algorithm"}>
            Algorithm
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;

function Statsdiv(props) {
  // console.log(props);

  //circle charts are here

  return (
    <div className="chartSection">
      <h1 className="dashboardheader">My stats</h1>
      <div className="chartdiv">
        {props.chartInfo.map((solType) => {
          return (
            <Link to={"/problems/" + solType.qtype}>
              <Stats key={solType.qtype} solType={solType}></Stats>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Stats({ solType }) {
  //circle chart
  const [color, setcolor] = useState("white");
  const number = Math.round((solType.usercount / solType.qcount) * 100);
  useEffect(() => {
    if (number < 33) {
      setcolor("#ff4545");
    } else if (number < 66) {
      setcolor("#ffe840");
    } else {
      setcolor("lightgreen");
    }
  }, []);

  // return <div className="statinfo" style={{borderColor: color}}>
  //     <h4>{solType.qtype}</h4>
  //     <span style={{color: color}}>
  //     {number}%
  //     </span>
  // </div>

  const dos = 590 * (1 - solType.usercount / solType.qcount);

  return (
    <div className="wrapper">
      <div className="outer">
        <div className="inner">
          <pre className="stat-text">{solType.qtype + "\n" + number + "%"}</pre>
        </div>
      </div>

      {number ? (
        <svg className="circlesvg" width={"200px"} height={"200px"}>
          <circle
            cx={"100px"}
            cy={"100px"}
            r={"95"}
            style={{ strokeDashoffset: dos }}
            stroke={color}
          ></circle>
        </svg>
      ) : (
        ""
      )}
    </div>
  );
}
