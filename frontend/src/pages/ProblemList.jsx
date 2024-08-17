import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProblemList() {

    const [problist, setProbList] = useState([])

    useEffect(()=>{
        async function getProbList() {
            console.log("Getting problem list...");
            
            const response = await fetch('api/getProblemList')
            const data = await response.json()

            setProbList(data)
        }

        getProbList()
    }, [])


    console.log(problist);
    

  return (
    <div>
      <h1>Problem List</h1>
      {problist.map((problem)=>{

        //to continue

        return <Link to={`/problem:${problem.q_id}`} key={problem.q_id}>
            {problem.qname}
             </Link>;
      })}
    </div>
  )
}

export default ProblemList
