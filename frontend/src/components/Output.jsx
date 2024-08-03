import React, { useRef } from "react";

function Output(props) {
  const outputRef = useRef(' ')
  const baseURL = "https://emkc.org/api/v2/piston/execute"; //post

  async function exec() {
    console.log("Lets code");
    console.log(props.code);

    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        language: "js",
        version: "18.15.0",
        files: [
          {
            name: "my_cool_code.js",
            content: props.code
          }
        ]
      })
    });

    const data = await response.json();
    outputRef.current.innerHTML = data.run.stdout || data.run.stderr
    console.log(data);
  }

  return (
    <div>
      Output
      <button className="executeButton" onClick={() => exec()}>
        Run Code
      </button>
      <pre className="outputBox" ref={outputRef} >Your output here</pre>
    </div>
  );
}

export default Output;
