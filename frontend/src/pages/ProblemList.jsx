import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { SiTicktick } from "react-icons/si";


function ProblemList() {

    const type = useParams().type
    console.log(type);
  
    const [problist, setProbList] = useState([])
    const [solvedList , setSolvedList] = useState([])

    useEffect(()=>{
        async function getProbList() {
            console.log("Getting problem list...");
            
            const response = await fetch('/api/getProblemList/'+type)
            const data = await response.json()

            setProbList(data)
        }

        async function getSolvedList() {

          //dummy user id
            const userid = 2
            const resp = await fetch('/api/getSolvedProblems/'+userid)
            const data = await resp.json()

            console.log(data);
            setSolvedList(data.quids)
        }

        getProbList()
        getSolvedList()
    }, [])


    console.log(problist);
    

  return (
    <div>
      <h1>Problem List</h1>
      {problist.map((problem)=>{

        //to continue
        return <Link className='questionButtons' to={'/problem/'+problem.q_id} key={problem.q_id}>
            {problem.qname} -- {problem.qtype}   {solvedList.includes(problem.q_id)? <SiTicktick  style={{'color':"lightgreen"}} /> : "" }
             </Link>;
      })}
    </div>
  )
}

export default ProblemList
