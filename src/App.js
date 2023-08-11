import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Notes from './Pages/Notes'
import Questions from './Pages/Questions'
import { ReactComponent as Logo } from './asserts/d-logo-white.svg'
import MultiQuiz from './Pages/MultiQuiz'
import MuliQuizPlayGround from './Pages/MultyQuizPlayGround'

const check = (e)=>{

  let path = window.location.pathname

  if(path === "/")
    e.preventDefault()
}

export default function App() {
  return (
    <div className='min-w-[20rem] lg:max-w-screen-2xl lg:m-auto w-full selection:bg-gray-700 selection:text-white'>
      <nav className='w-full h-16 bg-[#242323] flex items-center drop-shadow-[0_3px_5px_rgba(0,255,255,.3)]' >
        <Link to='/' className='ml-5 md:ml-10 flex items-center' onClick={(e)=>check(e)}>
          <div className=' w-10'><Logo/></div>
          <sub className='text-white font-bold text-xl -translate-x-2 select-none'>Appteey</sub>
        </Link>
      </nav>

      <div className='my-5 w-[98%] md:w-[85%] lg:w-[70%] h-fit mx-auto '>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path='/notes/:title' Component={Notes}/>
          <Route path='/topic/:title' Component={Questions}/>
          <Route path='/multi-quiz' Component={MultiQuiz}/>
          <Route path='/multi-quiz-ground' Component={MuliQuizPlayGround}/>
          <Route path='/*' Component={Home}/>
        </Routes>
      </div>
    </div>
  )
}
