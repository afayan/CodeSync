import React, { useEffect, useRef, useState } from "react";

function Output(props) {
  const outputRef = useRef(" ");
  const [status , setStatus] = useState('')
  const [error , setError] = useState('')
  const baseURL = "https://emkc.org/api/v2/piston/execute"; //post
  const [TR , setTR] = useState('T')  //toggle testcase or result
  const [wInput ,setWrongIp] = useState()
  const [expectedIP, setEOP] = useState()
  const [yInput , setYIP] = useState()
  const [resultBoxColor , setRBC] = useState('white')
  const [aicheckRemark , setAIcheckRemark] = useState('')
  const [output2, setOP2] = useState('Your output here')

  const a = [1,2,11,55]
  const red = '#f7564a'


  async function check() {
    //function to check if the code is correct or not

    setEOP('processing...')
    setWrongIp('processing...')
    setYIP('processing...')
    setRBC('yellow')
    setTR('R')


    setError('')
    const checkData = {}
    checkData.usercode = props.code
    checkData.qid = props.qid

    // console.log(checkData);

    const response = await fetch('/api/checktc', {
      method : 'post',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(checkData)
    })

    const data = await response.json()  
    console.log(data.remark);

    data.remark === 'correct' ? setRBC('lightgreen') : setRBC(red)

    if (data.error) {
      setError(data.error)
    }
    
    setStatus(s => data.remark)
    

    setEOP(data.expected_output)
    setWrongIp(data.input)
    setYIP(data.your_output)

    if (data.remark == 'correct') {
      props.setSolved(true)

      setEOP('all passed')
      setWrongIp('all passed')
      setYIP('all passed')


      const resp = await fetch('/api/solved', {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          userid : props.userid,
          qid : props.qid,
        })
      })


      const solvedStatus = await resp.json()
      console.log(solvedStatus);
      
    }

  }


  async function checkByAI() {
    //function to check problem with AI

    setAIcheckRemark('AI is checking your code...')
    setRBC('yellow')
    setTR('R')

    console.log(props.desc1);

    const dataToCheckByAI = {
      code : props.code,
      //userid, code, qid
      desc : props.desc1,
      userid : props.userid,
      qid : props.qid,
    }
    
    const resp = await fetch('/api/checkbyai', {
      method : 'post',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(dataToCheckByAI)
    })
    
    const aiResult = await resp.json()

    console.log(aiResult);
    
    console.log(aiResult.response);
    setAIcheckRemark(aiResult.response)

    if (aiResult.response.includes('pass')) {
      props.setSolved(true)
      setRBC('lightgreen')
      console.log("RBC IS "+resultBoxColor);
      
    }

    else{

      setRBC(red)
      console.log(resultBoxColor);
      
    }

    
  }

  async function exec() {
    // console.log("Lets code");
    // console.log(props.code);

    setTR('T')
    try {


      console.log(typeof props.code);
      const finalCode = props.code;
      console.log(finalCode);
      
      
      const response = await fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language: "c",
          version: "10.2.0",

          aliases: ["gcc"],
          runtime: "gcc",

          files: [
            {
              name: "my_cool_code.c",
              content: finalCode,
            },
          ],
          stdin: "",
          args: [],
          compile_timeout: 10000,
          run_timeout: 3000,
        }),
      });

      const data = await response.json();
      let o  = data.run.stderr || data.run.stdout;
      setOP2(o)
      // console.log(data);

      console.log(data.remark);
      
    } catch (error) {
      alert("an error occurred, please try again later");
      console.log(error);
    }
  }

  if (props.checkBy == 'testcase') {
    //if check by testcase
    return(
      <div className="outputBox">
        <button className="executeButton" onClick={()=>setTR("T")}>Testcase</button>
        <button className="executeButton" onClick={()=>setTR("R")}>Result</button>
        <button className="executeButton" onClick={()=>check()}>Run</button>

      {TR == 'T' ?  <div className="testcaseContainer">
        <h2> Testcases</h2>
        <div className="testcaseRow">

        {props.testcases.map((tc)=>{
          return <div className="tcTerminal" key={tc.t_id}>
           {tc.ip}
          </div>
        })}
        </div>
      
      </div> : 
      <div className="resultWindow" style={{"borderColor": resultBoxColor , 'color': resultBoxColor  }} >
        <h1>Result</h1>
        <h4>input : {wInput}</h4>
        <h4>{status}</h4>
        <p>{error}</p>
        <p>Your Output : {yInput}</p>
        <p>Expected : {expectedIP}</p>
      </div>
      
      }
      </div>
    );

  }

  //else if check by ai, terminal visible
  return (
    <div className="outputBox">
      
      <button className="executeButton" onClick={() => exec()}>
        Run Code
      </button>

      <button className="executeButton" onClick={()=>checkByAI()}>
        submit
      </button>

      <button className="executeButton" onClick={()=>setTR("R")}>Result</button>

      {
        TR === 'R' ? <div  className="resultWindow" style={{'borderColor' : resultBoxColor , 'color': resultBoxColor }}>
          {aicheckRemark} 
        </div> : <div>
          <pre className="terminal">{output2}</pre>
        </div>
      }

   

    </div>
  );
}

export default Output;
