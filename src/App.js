import React from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import Home from './Pages/Home'
import Notes from './Pages/Notes'
import Questions from './Pages/Questions'
import { ReactComponent as Logo } from './asserts/d-logo-white.svg'

const check = (e)=>{

  let path = window.location.pathname

  if(path === "/")
    e.preventDefault()
}

export default function App() {
  return (
    <div className='min-w-[20rem] lg:max-w-screen-2xl lg:m-auto w-full'>
      <nav className='w-full h-16 bg-[#383838] flex items-center drop-shadow-[0_3px_5px_rgba(0,0,0,.5)]' >
        <Link to='/' className='ml-5 md:ml-10 flex items-center' onClick={(e)=>check(e)}>
          <div className=' w-10'><Logo/></div>
          <sub className='text-white font-bold text-xl -translate-x-2 select-none'>eva.asia</sub>
        </Link>
      </nav>

      <div className='my-5 w-[98%] md:w-[85%] lg:w-[70%] h-fit mx-auto '>
        <Routes>
          <Route exact path='/' Component={Home}/>
          <Route path='/notes/:title' Component={Notes}/>
          <Route path='/topic/:title' Component={Questions}/>
          <Route path='*' Component={Home}/>

        </Routes>
      </div>
    </div>
  )
}
