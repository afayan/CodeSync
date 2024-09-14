import { useEffect, useRef, useState } from "react";
import "../../src/App.css";
import React from "react";
import Markdown from "react-markdown";
import { SiTicktick  } from "react-icons/si";
import { FaArrowAltCircleDown } from "react-icons/fa";
import Collab from "./Collab";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");


function Description(props) {
  // const [window, setWindow] = useState('d')   // options : d = description, a = AI chatbox

  socket.on('connect', ()=>{
    console.log(socket.id);
  })

  const [showDesc, setDesc] = useState(true);
  const [showAI, setAI] = useState(false);
  const [responseFromAI, setRFA] = useState("Use AI to help yourself with your code");
  const [qname, setQname] = useState("loading...");
  const [description, setDescription] = useState("");
  const [window, setWindow] = useState('d')

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
    setWindow(windowName)
  }

  // try {

  async function askai() {
    //get code
    //fetch
    console.log(props.value);
    setRFA("Generating response...")

    const dataToSendToAI = {
      code: props.value,
      description : description
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

    console.log(responseFromAI);
    
  }

  // } catch (error) {
  //      alert("An error occurred")
  // }

  return (
    <div className="descriptionBox">
      <div className="descButtonContainer">
        <button className="descToggleButtons" onClick={() => toggle("d")}>Desc</button>
        <button className="descToggleButtons" onClick={() => toggle("a")}>AI</button>
        <button className="descToggleButtons" onClick={()=> toggle('c')}>
          Collab
        </button>
      </div>

      {window == 'd' && (
        <div className="descTab">
          <h1>{qname}</h1>
          <p>{props.solved ? <SiTicktick color="lightgreen"/> : "unsolved"}</p>
          <Markdown>{description}</Markdown>
          {/* <p>{description}</p> */}

          {/* {createRoot(document.body).render(<Markdown>{AIresponse.current.innerHTML}</Markdown>)} */}
        </div>
      )}

      {window == 'a' && (
        <div className="aiTab">
          <h1>AI</h1>
          <button className="aibutton" onClick={() => askai()}>Ask AI</button>
          <Markdown className="airesponseTab">
            {responseFromAI}
          </Markdown>
        </div>
      )}

      {
        window == 'c' && <Collab 
        code = {props.value}
        />
      }
    </div>
  );
}

export default Description;
