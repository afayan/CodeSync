import { useState } from "react";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import AddQuestion from "./pages/AddQuestion";
import ProblemList from "./pages/ProblemList";
import AdminRoadmap from "./pages/AdminRoadmap";
import LeaderBoard from "./pages/LeaderBoard";
import { Loginsignup } from "./pages/Loginsignup";
import LandingPage from "./pages/LandingPage";


function App() {
  const userid = 1;

  return (
    <>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path="/problem/:qid" element={<Problem />} />
        <Route path="/Add" element={<AddQuestion />} />
        <Route path="/problems/:type" element={<ProblemList />} />
        <Route path="/adminroadmap" element={<AdminRoadmap />} />
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
        <Route path="/logsign" element={<Loginsignup/>}></Route>
      </Routes>
    </>
  );
}

export default App;
