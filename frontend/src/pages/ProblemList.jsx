import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { CircleCheckBig } from "lucide-react";
import Navbar from "../components/Navbar/Navbar";

function ProblemList() {
  const type = useParams().type;
  console.log(type);

  const [problist, setProbList] = useState([]);
  const [solvedList, setSolvedList] = useState([]);
  const [isLogged, setLogged] = useState(true)
  const navigate = useNavigate()


  useEffect(() => {

    function checkLogged() {
      if(localStorage.getItem('auth')){
        setLogged(true)
      }

      else{
        setLogged(false) 
        // navigate('../../login')
     }
    }

    async function getProbList() {
      console.log("Getting problem list...");

      const response = await fetch("/api/getProblemList/" + type);
      const data = await response.json();

      setProbList(data);
    }

    async function getSolvedList() {
      //dummy user id

      if (isLogged) {
      const resp = await fetch("/api/getSolvedProblems", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          'authorization' : 'Bearer '+localStorage.getItem("auth")
        },
        body: JSON.stringify({
          authToken: localStorage.getItem("auth"),
        }),
      });
      const data = await resp.json();

      console.log(data);
      setSolvedList(data.quids);

    }
    else{
      const navigate = useNavigate()
      alert("not logged in")
    }
    }

    checkLogged()
    getProbList();
    getSolvedList();
  }, []);

  console.log(problist);
  console.log(solvedList);
  

  return (
    <div>
      <Navbar/>
      {!isLogged && <p className="warning">Please login to start coding!</p> }
      <h1 className="dashboardheader">Problem List</h1>
      {problist.map((problem) => {
        //to continue
        return (
          <Link
            className="questionButtons"
            to={"/problem/" + problem.q_id}
            key={problem.q_id}
          >
            {problem.qname} -- {problem.qtype}{" "}
            {solvedList.includes(problem.q_id) ? (
              <SiTicktick id="tick" style={{'color':'lightgreen'}}/>
            ) : (
              ""
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default ProblemList;
