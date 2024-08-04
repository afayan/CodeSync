import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return(
        <>
        <h1>Home</h1>

        <Link to={'/problem'}>Code Editor</Link>
        </>
    );
}

export default Home

