import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Problem from "./pages/Problem";
import AddQuestion from "./pages/AddQuestion";
import ProblemList from "./pages/ProblemList";
import AdminRoadmap from "./pages/AdminRoadmap";
import DummyLogin from "./pages/DummyLogin";
import DummySignup from "./pages/DummySignup";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  const userid = 1;

  return (
    <>
      <Routes>
        <Route path="/login" element={<DummyLogin />} />
        <Route path="/signup" element={<DummySignup />} />
        <Route path={"/"} element={<Home />} />
        <Route path="/problem/:qid" element={<Problem />} />
        <Route path="/Add" element={<AddQuestion />} />
        <Route path="/problems/:type" element={<ProblemList />} />
        <Route path="/adminroadmap" element={<AdminRoadmap />} />
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
      </Routes>
    </>
  );
}

export default App;
