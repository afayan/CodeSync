import React, { useRef, useState } from "react";
import Editor from '@monaco-editor/react';
import Output from "../components/Output";


function Problem() {

    const [value, setValue] = useState('')
    const editorRef = useRef('')
    // console.log(value);
    return(
       

        <div className="problemPage">

        <div className="problemContainer">

        Problem

        <Editor height="90vh" width={'90vh'} defaultLanguage="javascript" defaultValue="// some comment" 
        value={value}
        onChange={
            (value, e)=>setValue(e1=>value)
        }
        />
        </div>

        <Output code = {value}/>
        </div>


       
    )
}

export default Problem