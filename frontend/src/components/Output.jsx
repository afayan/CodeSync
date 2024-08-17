import React, { useRef } from "react";

function Output(props) {
  const outputRef = useRef(" ");
  const baseURL = "https://emkc.org/api/v2/piston/execute"; //post

  const a = [1,2,11,55]

  const codeRunner = `
  
  int main(void) {
    printf("%d",doSomething(${a[0]},${a[1]}));
    return 0;
}
  `

  async function check() {
    //function to check if the code is correct or not

    const checkData = {}
    checkData.usercode = props.code
    checkData.qid = props.qid

    console.log(checkData);

    const response = await fetch('/api/checktc', {
      method : 'post',
      headers : {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify(checkData)
    })

    const data = await response.json()
    console.log(data);  
  }

  async function exec() {
    // console.log("Lets code");
    // console.log(props.code);
    try {


      console.log(typeof props.code);
      const finalCode = props.code + codeRunner;
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
      outputRef.current.innerHTML = data.run.stderr || data.run.stdout;
      console.log(data);
    } catch (error) {
      alert("an error occurred, please try again later");
      console.log(error);
      
    }
  }

  if (props.checkBy == 'testcase') {
    //if check by testcase
    return(
      <div className="outputBox">
        <h1>Testcase</h1>
        <button onClick={()=>check()}>check by Testcases</button>
      </div>
    );

  }

  //else if check by ai, terminal visible
  return (
    <div className="outputBox">
      Output
      <button className="executeButton" onClick={() => exec()}>
        Run Code
      </button>
      <pre ref={outputRef}>Your output here</pre>
    </div>
  );
}

export default Output;
