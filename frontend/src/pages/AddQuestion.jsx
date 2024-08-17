import React, { useState } from "react";
import Editor from "@monaco-editor/react";

function AddQuestion() {
  const [tc, showTC] = useState(false);
  const [tcIndex, setTCIndex] = useState(-1)
  const [testCases, setTestcases] = useState([]);

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
        />
        <textarea
          name=""
          className="addQuestionText"
          id=""
          placeholder="Add a description (markdown supported). Add testcases and examples too"
          rows={15}
        ></textarea>

        <div className="addQuestion">
          <span className="radioButtonSpan">
            <label>check Using AI</label>
            <input type="radio" name="chackingType" id="" />
          </span>

          <span className="radioButtonSpan">
            <label>check Using Testcases</label>
            <input type="radio" name="chackingType" id="" />
          </span>
        </div>

        <AddTestCase setTestcases={setTestcases} />

        <div>

        </div>

      </div>
    </>
  );
}

export default AddQuestion;

function AddTestCase(props) {
    const [code, setCode] = useState("");
    const [saved, isSaved] = useState(false);
    var testCaseInfo = {};

        function savetestCase() {
            testCaseInfo.code = code;
            console.log(testCaseInfo);

            props.setTestcases((arr) => arr.push);
            isSaved(true);
            setTCIndex(c=>c+1)
        }

        return (
            <div className="testCases">
            <h3>Testcase</h3>
            <input type="text" placeholder="input (to be displayed in testcase" />
            <input type="text" placeholder="ip type" />
            <br />
            <textarea type="text" placeholder="desired output" />
            <input type="text" placeholder="op type" />
            <br />
            <Editor
                defaultLanguage="c"
                height={"20vh"}
                value={code}
                onChange={(value, e) => setCode((e1) => value)}
            />
            <button onClick={savetestCase}>save</button>
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
