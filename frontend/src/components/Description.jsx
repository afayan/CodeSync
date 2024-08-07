import { useRef, useState } from "react";
import '../../src/App.css'
import React from 'react'
import {createRoot} from 'react-dom/client'
import Markdown from 'react-markdown'

function Description(props) {

    // const [window, setWindow] = useState('d')   // options : d = description, a = AI chatbox
    const [showDesc, setDesc] = useState(true)
    const [showAI, setAI] = useState(false)
    const [responseFromAI, setRFA] = useState('')
    const AIresponse = useRef('')

    function toggle(windowName) {

        //toggle the AI window and Desc window

        if(windowName == 'd'){
            setDesc(true)
            setAI(false)
        }
        else if (windowName == 'a') {
            setAI(true)
            setDesc(false)
        }
    }

    // try {
        
    async function askai() {
        //get code
        //fetch 

        console.log(props.value);

        const dataToSendToAI = {
            code : props.value
        }

        const res = await fetch('api/aihelp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSendToAI)
        })

        // const ai_message = await res.json

        const aiMessage = await res.json();
        // console.log(typeof aiMessage.response);

        AIresponse.current.textContent = aiMessage.response;
        setRFA(aiMessage.response)     
    }

// } catch (error) {
//      alert("An error occurred")   
// }

    return(
        <div className="descriptionBox">
            <div className="descriptionButtons">
            <button onClick={()=>toggle('d')}>Desc</button>
            <button onClick={()=>toggle('a')}>AI</button>
            </div>

            {showDesc && <div className="descTab">
                <h1>Desc</h1>
                
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae numquam ullam, sequi eaque deserunt velit ipsa, praesentium laudantium, exercitationem odio harum repellat inventore placeat adipisci eveniet. Similique repudiandae ut dignissimos!</p>
                {/* {createRoot(document.body).render(<Markdown>{AIresponse.current.innerHTML}</Markdown>)} */}
            </div>}

            {showAI && 
            <div className="aiTab">
                <h1>AI</h1>
                <button onClick={()=>askai()}>Ask AI</button>
                <pre className="airesp" ref={AIresponse}>
                    Use AI to help yourself with your code
                    
                {/* <Markdown >
                    {responseFromAI}
                </Markdown> */}
                </pre>
            </div>
            }
        </div>
    );
}

export default Description