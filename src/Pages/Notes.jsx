import React, { useEffect, useState } from 'react'
import { useParams,  useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as ANSWER_ICON } from '../asserts/answer.svg'



const TOPICS = ["problems-on-trains", "time-and-distance", "height-and-distance", "time-and-work", "simple-interest", "compound-interest"]

let navigate, title;

export default function Notes() {
  navigate = useNavigate ();
  let [Notes, setNotes] = useState(null)

  console.log(Notes);
  title = useParams().title

  useEffect(()=>{
    if(!TOPICS.includes(title)){      
      return navigate('/')
    }

    if(!JSON.parse(localStorage.getItem(title))?.N){
      getQuestion()

    }

    else{
      let data = JSON.parse(localStorage.getItem(title))
      setNotes((data.N));
    }
  },[])



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

  const viewExample = (id)=>{
    let elem = document.getElementById("example-"+id)
    let ansBtn = document.getElementById("view-answer-btn-"+id)
    
    elem.classList.remove("hidden")
    ansBtn.classList.remove("hidden")
  }

  const viewAnswer = (id)=>{
    let ansBtn = document.getElementById("view-answer-btn-"+id)
    let elem = document.getElementById("answer-"+id)
    
    ansBtn.classList.remove("rounded","border")
    ansBtn.classList.add("rounded-tl","rounded-tr","border-l", "border-r", "border-t")
    elem.classList.remove("hidden")
  }

  return (
    <>
      <div className='text-white p-3  '>
        <div className='text-xl md:text-3xl font-semibold' onClick={()=>{clearExpDate()}}>{title.replace(/-/g," ").toUpperCase()}</div>
        <Link to={`/topic/`+title} className='bg-emerald-600 rounded-md px-5 py-2 mt-3 inline-block hover:bg-emerald-800'>Go To Questions</Link>
      </div>

      {
        Notes !== null ? <div >
        {Notes.map((note,i)=>{
          return <div key={i}  className='text-white my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded overflow-hidden '>
              <div className='flex  font-normal	text-base  md:text-lg'>
                {i+1}.
                <div  dangerouslySetInnerHTML={{__html:note.type}} className={`ml-3 `}></div>
              </div>

              <div className=' '>
                <span  dangerouslySetInnerHTML={{__html:note.shortcut}} className={`ml-3 mt-3 p-3 text-green-500 inline-block rounded`}></span>
              </div>


              <div className='ml-3 mt-3 p-1 w-fit fill-white border rounded hover:fill-emerald-700 hover:border-emerald-500 hover:cursor-pointer' onClick={()=>{viewExample(i)}}><ANSWER_ICON/></div>

              <div id={`example-`+i} className='m-3 hidden' dangerouslySetInnerHTML={{__html:note.example}}></div>

              <span id={`view-answer-btn-`+i} className='ml-3 py-1 px-3 text-xs border rounded hidden hover:cursor-pointer' onClick={()=>{viewAnswer(i)}}>Solution</span>
              <div id={`answer-`+i} className='overflow-x-auto ml-3 p-3 border rounded-br rounded-bl rounded-tr hidden' dangerouslySetInnerHTML={{__html:note.answer}}></div>
          </div>
        })}
      </div>

    :

      <div className='my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg'>
        Loading...
      </div>
      }
    </>
  )
}
