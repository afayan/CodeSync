import { useEffect, useRef, useState } from "react";
import "../../src/App.css";
import React from "react";
import { createRoot } from "react-dom/client";
import Markdown from "react-markdown";
import { SiTicktick } from "react-icons/si";

function Description(props) {
  // const [window, setWindow] = useState('d')   // options : d = description, a = AI chatbox
  const [showDesc, setDesc] = useState(true);
  const [showAI, setAI] = useState(false);
  const [responseFromAI, setRFA] = useState("Use AI to help yourself with your code");
  const [qname, setQname] = useState("loading...");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (props.problemData[0]) {
      const arr = props.problemData[0];
      console.log(arr);

      setQname(arr.qname);
      setDescription(arr.description);
      props.setDesc1(arr.description);
    }
  });

  function toggle(windowName) {
    //toggle the AI window and Desc window

    if (windowName == "d") {
      setDesc(true);
      setAI(false);
    } else if (windowName == "a") {
      setAI(true);
      setDesc(false);
    }
  }

  // try {

  async function askai() {
    //get code
    //fetch

    console.log(props.value);

    const dataToSendToAI = {
      code: props.value,
    };

    const res = await fetch("/api/aihelp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSendToAI),
    });

    const aiMessage = await res.json();

    // AIresponse.current.textContent = aiMessage.response;
    setRFA(aiMessage.response);
  }

  // } catch (error) {
  //      alert("An error occurred")
  // }

  return (
    <div className="descriptionBox">
      <div className="descButtonContainer">
        <button className="descToggleButtons" onClick={() => toggle("d")}>Desc</button>
        <button className="descToggleButtons" onClick={() => toggle("a")}>AI</button>
      </div>

      {showDesc && (
        <div className="descTab">
          <h1>{qname}</h1>
          <p>{props.solved ? <SiTicktick style={{'color':"lightgreen"}}/> : "unsolved"}</p>
          <Markdown>{description}</Markdown>
          {/* <p>{description}</p> */}

          {/* {createRoot(document.body).render(<Markdown>{AIresponse.current.innerHTML}</Markdown>)} */}
        </div>
      )}

      {showAI && (
        <div className="aiTab">
          <h1>AI</h1>
          <button className="aibutton" onClick={() => askai()}>Ask AI</button>
          <Markdown className="airesponseTab">
            {responseFromAI}
          </Markdown>
        </div>
      )}
    </div>
  );
}

export default Description;
