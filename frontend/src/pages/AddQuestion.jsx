import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";

function AddQuestion() {
  const [tc, showTC] = useState(false); //if the user wants check by testcase or not
  const [tcIndex, setTCIndex] = useState(0) //current testcase index
  const [testCases, setTestcases] = useState([]); //array to store testcases
  const [defaultCode, setDefCode] = useState('//enter your default code here \n #include<stdio.h>')  //default code of question
  const [funcName , setFuncName] = useState() //function name
  const [answerCode , setAnsCode] = useState('//enter your solution code here \n #include<stdio.h>') //solution

  //form inputs
  const qname = useRef(0)
  const desc = useRef(0)


  // console.log(funcName);
  
  //function to delete testcase
  function deleteTestCase(index){
    setTestcases(testc => testc.filter((tc)=>{
      return tc.no != index
    }))
    console.log(index + " deleted");
  }


  async function saveQuestion() {
    //function to save entire question

    const questionData = {}

    //name, description, checkBy, testcases (array)
    //create JSON and send it to backend

    questionData.desc = desc.current.value
    questionData.qname = qname.current.value
    questionData.defaultCode = defaultCode
    
    tc?questionData.checkBy = 'testcase' : questionData.checkBy = 'ai'

    questionData.testcases = testCases
    questionData.funcName = funcName
    questionData.solution = answerCode

    console.log(questionData);

    //fetch API
    //go to another page

    const resp = await fetch('api/submitquestion', {
      method:'post',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    })

    const data = await resp.json()
    console.log(data);
  }


  //returns the main form
  return (
    <>
      <div className="addQuestionForm">
        <h1>Add question</h1>
        <input
          type="text"
          className="addQuestionText"
          name=""
          id=""
          placeholder="Problem Name"
          ref={qname}
        />
        <textarea
          name=""
          className="addQuestionText"
          id=""
          placeholder="Add a description (markdown supported). Add testcases and examples too"
          rows={15}
          ref={desc}
        ></textarea>

        <h2>Default code which user will see</h2>
        <Editor width={'60%'}
        height={'20vh'}
        defaultLanguage="c"
        value={defaultCode}
        onChange={(value, e)=> {setDefCode(c=>value)}}
        />


        <h2>Solution</h2>
        <Editor width={'60%'}
        height={'20vh'}
        defaultLanguage="c"
        value={answerCode}
        onChange={(value, e)=> {setAnsCode(c=>value)}}
        />

        <div className="addQuestion">
          <span className="radioButtonSpan">
            <label>check Using AI</label>
            <input type="radio" name="chackingType" id="" onClick={()=>{showTC(false)}} />
          </span>

          <span className="radioButtonSpan">
            <label>check Using Testcases</label>
            <input type="radio" name="chackingType" id="" onClick={()=>{showTC(true)}} />
          </span>
        </div>
        
        <button onClick={saveQuestion}>Submit question</button>

        {tc && <input type="text" placeholder="Enter the function name" onChange={(e)=>{setFuncName(e.target.value)}}></input> }
        {tc && <AddTestCase tcIndex = {tcIndex} setTCIndex = {setTCIndex} funcName={funcName} answerCode = {answerCode} setTestcases={setTestcases} />}

        <div className="tcRoll">
          {
            testCases.map((tc)=>{
              return(
                <div key={tc.no}>

                  <ul>
                  <li>{tc.ip}</li>
                  <li>{tc.ipType}</li>
                  <li>{tc.op}</li>
                  </ul>
                  <button
                  onClick={()=>deleteTestCase(tc.no)}
                  >Delete testcase</button>
                </div>
              );
            })
          }
        </div>

      </div>
    </>
  );
}

export default AddQuestion;

function AddTestCase(props) {


    const defaultRunnerCode = `int main(void){
    //print the output by calling your function
}`

    const [code, setCode] = useState(defaultRunnerCode); //code for running testcase
    const [saved, isSaved] = useState(false);
    const opType = useRef(0)
    const op = useRef(0)
    const ip = useRef(0)
    const ipType = useRef(0)
    const [remark , setRemark] = useState('')
    var testCaseInfo = {};

        function savetestCase() {
            //function takes the testcase and appends it to main array

            if(!code.includes(props.funcName)){

              //check if function is added in testcase runner function

              alert("Function not in code")
              return 0
            }

            testCaseInfo.no = props.tcIndex
            testCaseInfo.op = op.current.value
            testCaseInfo.opType = opType.current.value
            testCaseInfo.ip = ip.current.value
            testCaseInfo.ipType = ipType.current.value
            testCaseInfo.runnercode = code;

            console.log(testCaseInfo);

            props.setTestcases(arr => [...arr, testCaseInfo]);
            isSaved(true);
            props.setTCIndex(c=>c+1)
            setCode(defaultRunnerCode)
        }

        async function checkTcValidity() {
          //check if testcase is valid or not
          const fcode = props.answerCode + "\n" + code
          console.log(fcode);
          setRemark('...')

          var c = {}
          c.op = op.current.value
          c.code = fcode

          console.log(c);
          

          const res = await fetch('/api/tcvalid', {
            method: 'post',
            headers:{
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(c)
          })

          const data = await res.json()

          if (data.error) {
            setRemark(data.error)
          }

          else{

            setRemark(r=>data.status)
          }
          console.log(data); 
        }

        return (
            <div className="testCases">
            <h3>Testcase</h3>
            <input type="text" placeholder="input (to be displayed in testcase" ref={ip}/>
            <select type="text" placeholder="ip type" ref={ipType}>
              <option value="string">String</option>
              <option value="int">int</option>
              <option value="char">char</option>
              <option value="float">float</option>
              <option value="void">void</option>
              <option value="struct">struct</option>  
            </select>
            <br />
            <textarea type="text" placeholder="desired output" ref={op}/>
            <select name="optype" id="optype" ref={opType}>
              <option value="string">String</option>
              <option value="int">int</option>
              <option value="char">char</option>
              <option value="float">float</option>
              <option value="void">void</option>
              <option value="struct">struct</option>
            </select>
            <br />
            <Editor
                defaultLanguage="c"
                height={"20vh"}
                value={code}
                onChange={(value, e) => setCode((e1) => value)}
            />
            <button onClick={savetestCase}>save</button>
            <button onClick={checkTcValidity}>check testcase</button>
            <h2>{remark}</h2>
            {saved && <button>Delete</button>}
            </div>
        );
}

function testCaseBox(props) {
    return(
        <>
        
        </>
    );
}


// height="90vh"
// width={"100vh"}
// defaultLanguage="c"
// defaultValue={defValue}
// value={value}
// onChange={(value, e) => setValue((e1) => value)}
// className="editor"