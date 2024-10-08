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
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";



function App() {
  const userid = 1;

  return (
    <>
      <Routes>
        <Route path="profile" element={<Profile/>} ></Route>
        <Route path={"/home"} element={<Home />} />
        <Route path="/problem/:qid" element={<Problem />} />
        <Route path="/Add" element={<AddQuestion />} />
        <Route path="/problems/:type" element={<ProblemList />} />
        <Route path="/adminroadmap" element={<AdminRoadmap />} />
        <Route path="/leaderboard" element={<LeaderBoard/>}/>
        <Route path="/logsign" element={<Loginsignup/>}></Route>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/Registration" element={<Registration/>}></Route>
      </Routes>
    </>
  );
}

export default App;
