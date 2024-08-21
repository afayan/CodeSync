import React from "react";
import { Link } from "react-router-dom";

function Home() {

    return(
        <>
        <h1>Home</h1>

        <div style={{display:"flex", flexDirection:"column"}}>
        <Link to={'/Add'}>Add problem</Link>
        <Link to={'/problems/all'} >Problems</Link>


        <h1>Problems</h1>
        <Link to={'/problems/array'}>Array</Link>
        <Link to={'/problems/stack'}>Stack</Link>
        <Link to={'/problems/queue'}>Queue</Link>
        <Link to={'/problems/linkedlist'}>Linked List</Link>
        <Link to={'/problems/tree'}>Tree</Link>
        <Link to={'/problems/graph'}>Graph</Link>
        </div>
        </>
    );
}

export default Home

