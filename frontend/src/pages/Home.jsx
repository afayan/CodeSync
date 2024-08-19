import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return(
        <>
        <h1>Home</h1>

        <div style={{display:"flex", flexDirection:"column"}}>

        <Link to={'/problem'}>Code Editor</Link>
        <Link to={'/Add'}>Add problem</Link>
        <Link to={'/problems'} >Problems</Link>
        <Link to={'/adminroadmap'}>Admin Roadmap</Link>
        </div>
        </>
    );
}

export default Home

