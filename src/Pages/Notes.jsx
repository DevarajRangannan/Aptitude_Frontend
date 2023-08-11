import React, { useEffect, useState } from 'react'
import { useParams,  useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';


const TOPICS = ["problems-on-trains", "time-and-distance", "height-and-distance", "time-and-work", "simple-interest", "compound-interest"]

let navigate, title;

export default function Notes() {
  navigate = useNavigate ();
  let [Notes, setNotes] = useState(null)


  title = useParams().title

  useEffect(()=>{
    if(!TOPICS.includes(title)){      
      return navigate('/')
    }
    getQuestion()
  },[])

  if(Notes)
    console.log(Notes);

  const getQuestion = async()=>{
    try{
      let res = await axios.get(process.env.REACT_APP_NOTES_API  + title)
      
      setNotes(await res.data)

      if(res){
        let temp = JSON.stringify({"Q":JSON.parse(localStorage.getItem(title))?.Q, "N": await res.data})
        localStorage.setItem(title,temp)
      }

      
    }catch(e){
      console.log(e);
    }
  }

  const clearExpDate = () =>{
    localStorage.setItem(title,JSON.stringify({"Q":JSON.parse(localStorage.getItem(title))?.Q, "N": null}))
  }

  return (
    <>
      <div className='text-white p-3  '>
        <div className='text-xl md:text-3xl font-semibold' onClick={()=>{clearExpDate()}}>{title.replace(/-/g," ").toUpperCase()}</div>
        <Link to={`/topic/`+title} className='bg-emerald-600 rounded-md px-5 py-2 mt-3 inline-block hover:bg-emerald-800'>Go To Questions</Link>
      </div>

      {
        Notes? ""
        :
          ""
      }
    </>
  )
}
