import React, { useRef } from "react";

function Output(props) {
  const outputRef = useRef(" ");
  const baseURL = "https://emkc.org/api/v2/piston/execute"; //post

  async function check() {
    //function to check if the code is correct or not
  }

  async function exec() {
    // console.log("Lets code");
    // console.log(props.code);
    try {
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
              name: "my_cool_code.js",
              content: props.code,
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
    }
  }

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
