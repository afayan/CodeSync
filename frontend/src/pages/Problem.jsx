import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "../components/Output";
import Description from "../components/Description";
import { useParams } from "react-router-dom";

function Problem() {
  //description, usecase

  //get info, testcases using useEffect
  //create solved/unsolved useState variable
  //function checkTestCases, useState solved to be passed to Output component
  //if test cases are true, send req to backend and update
  // => solved

  const qid = useParams().qid

  console.log(qid);
  


  const defValue = `//start coding

      #include <stdio.h>

      int doSomething(int n1,int n2){
          return n1 + n2;
      }`;

  const [value, setValue] = useState(defValue);
  const editorRef = useRef("");
  const [solved, setSolved] = useState(false);
  const [testcases, setTestcases] = useState([]);
  const [problemData, setProbData] = useState([])
  const [checkBy, setCheckBy] = useState('')
  
  // const [q_id, setQid] = useState(-1)

  useEffect(() => {
    //dummy values. Actual should be called from backend
    
    async function getProblemInfo() {
      const response = await fetch('/api/getprobleminfo/'+qid)
      const data = await response.json()
      setProbData(data)
      setValue(data[0].defcode)
      setCheckBy(data[0].checkBy)
    }

    async function getTestcases() {
      const response = await fetch('/api/getTestcases/'+qid)
      const data = await response.json()
      console.log(data);
      setTestcases(data)
    }

    getProblemInfo()
    getTestcases()
    
  }, []);

  function checkTestCases() {
    console.log("Check test cases");
    console.log(testcases);
  }

  // console.log(value);
  return (
    <div className="problemContainer">
      <div className="editorBox">
        <Editor
          height="90vh"
          width={"100vh"}
          defaultLanguage="c"
          defaultValue={defValue}
          value={value}
          onChange={(value, e) => setValue((e1) => value)}
          className="editor"
        />
      </div>

      <Output testcases = {testcases} qid = {qid} checkBy = {checkBy} checkTestCases={checkTestCases()} code={value} />

      <Description value={value} problemData = {problemData} setValue = {setValue}/>
    </div>
  );
}

export default Problem;
