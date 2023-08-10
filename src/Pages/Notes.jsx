import React, { useEffect } from 'react'
import { useParams,  useNavigate } from 'react-router'
import { Link } from 'react-router-dom';


const TOPICS = ["problems-on-trains", "time-and-distance", "height-and-distance", "time-and-work", "simple-interest", "compound-interest"]

let navigate, title;

export default function Notes() {
  navigate = useNavigate ();

  title = useParams().title

  useEffect(()=>{
    if(!TOPICS.includes(title)){      
      return navigate('/')
    }
  },[])

  

  return (
    <>
      <div className='text-white p-3  '>
        <div className='text-xl md:text-3xl font-semibold'>{title.replace(/-/g," ").toUpperCase()}</div>
        <Link to={`/topic/`+title} className='bg-emerald-600 rounded-md px-5 py-2 mt-3 inline-block hover:bg-emerald-800'>Go To Questions</Link>
      </div>
    </>
  )
}
