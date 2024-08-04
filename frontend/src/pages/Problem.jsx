import React, { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Output from "../components/Output";
import Description from "../components/Description";

function Problem() {
  //description, usecase

  //get info, testcases using useEffect
  //create solved/unsolved useState variable
  //function checkTestCases, useState solved to be passed to Output component
  //if test cases are true, send req to backend and update
  // => solved

  const [value, setValue] = useState("");
  const editorRef = useRef("");
  const [solved, setSolved] = useState(false)
  const [testcases, setTestcases] = useState([])


  useEffect(()=>{

    //dummy values. Actual should be called from backend
    setSolved(false)
    setTestcases([
        {
            value: 3,
            ans: 9
        },
        {
            value: 7,
            ans: 49
        },
        {
            value: 12,
            ans: 144
        },
        {
            value: 34,
            ans: 1156
        }
    ])
  },[])

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
          defaultLanguage="javascript"
          defaultValue="console.log('Hello JS')"
          value={value}
          onChange={(value, e) => setValue((e1) => value)}
          className="editor"
        />
      </div>

      <Output checkTestCases={checkTestCases()} code={value} />

      <Description value = {value}/>
    </div>
  );
}

export default Problem;
