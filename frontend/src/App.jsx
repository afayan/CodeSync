import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Link, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Problem from './pages/Problem'


function App() {

  return (
    <>
      <Routes>
      <Route path={'/Home'}  element = {<Home/>}/>
        <Route path='/Problem' element = {<Problem/>}/>

      </Routes>

    </>
  )
}

export default App
