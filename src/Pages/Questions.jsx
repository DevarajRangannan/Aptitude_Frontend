import React, { useEffect, useState } from 'react'
import { useParams,  useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ReactComponent as ANSWER_ICON } from '../asserts/answer.svg'


const TOPICS = ["problems-on-trains", "time-and-distance", "height-and-distance", "time-and-work", "simple-interest", "compound-interest"]

const OPTIONS = ['A', 'B', 'C', 'D']

let navigate, title, TOPIC_HAS;
let shuffleQuestions;


export default function Questions() {
  let [Questions, setQuestions] = useState(null)

  navigate = useNavigate ();

  title = useParams().title

  TOPIC_HAS = TOPICS.includes(title)
  useEffect(()=>{
    
    if(!TOPIC_HAS){      
      return navigate('/')
    }

    if(!JSON.parse(localStorage.getItem(title))?.Q){
      getQuestion()

    }

    else{
      let data = JSON.parse(localStorage.getItem(title))
      setQuestions(shuffleQuestions(data.Q));
    }
      
  },[])
  
  shuffleQuestions = (array) => {
    for (var i = array.length - 1; i > 0; i--) {

        // Generate random number
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
  }

  const getQuestion = async()=>{
    try{
      let res = await axios.get(process.env.REACT_APP_QUESTIONS_API + title)
      

      if(res){
        let temp = JSON.stringify({"Q":await res.data, "N":JSON.parse(localStorage.getItem(title))?.N})
        localStorage.setItem(title,temp)
      }

      setQuestions(await shuffleQuestions(res.data))


      
    }catch(e){
      console.log(e);
    }
  }

  const viewAnswer = (id)=>{
    let elem = document.getElementById("answer-"+id)
    let breif_answer_elem = document.getElementById("breif-answer-"+id)
    
    elem.classList.toggle("hidden")
    breif_answer_elem.classList.toggle("hidden")

  }

  const clearExpDate = () =>{
    localStorage.setItem(title,JSON.stringify({Q:null, "N":JSON.parse(localStorage.getItem(title))?.N}))
  }
  

  return (
    <>
      {
        TOPIC_HAS? <div className='text-white p-3  '>
        <div className='text-xl md:text-3xl font-semibold' onClick={()=>{clearExpDate()}}>{title.replace(/-/g," ").toUpperCase()}</div>
        <div>
          <Link to={`/notes/`+title} className='bg-emerald-600 rounded-md px-5 py-2 mt-3 inline-block hover:bg-emerald-800' >Go To Notes</Link>
        </div>

        {
          Questions !== null ? <div className=''>
              {Questions.map((question,i)=>{
                return <div key={i}  className='mt-5 mb-10 p-5 bg-[#242323] drop-shadow-[0_1px_5px_rgba(0,255,255,.5)] rounded-lg overflow-hidden '>
                  
                    <div className='flex  font-normal	text-base md:text-lg'>
                      {i+1}.
                      <div  dangerouslySetInnerHTML={{__html:question.code}} className={`ml-3 `}></div>
                      
                    </div>

                    {
                      OPTIONS.map((OPTION,i)=>{
                        return <div key={i} className='relative ml-3 flex items-center my-3 overflow-hidden text-sm'>
                                 
                                  <span className=' flex justify-center items-center select-none '>
                                    <span className='border-2 rounded-full px-1 py-0 text-xs  flex justify-center items-center'><div>{OPTION}</div></span>
                                  </span>
                                  <div className={`ml-3 `}   dangerouslySetInnerHTML={{__html:question.options[i]}}></div>     
                                   
                                </div>
                      })
                    }

                    <div className='ml-3 p-1 w-fit fill-white border rounded hover:fill-emerald-700 hover:border-emerald-500 hover:cursor-pointer' onClick={()=>{viewAnswer(i)}}><ANSWER_ICON/></div>

                    <div id={`answer-`+i} className='m-3 hidden'><span  className='text-emerald-500 font-semibold '>Answer: </span><span className='rounded-full border-2 text-xs px-1 py-0'>{OPTIONS[question.answer-1]}</span></div>

                    
                    <div id={`breif-answer-`+i} className='overflow-x-auto ml-3 p-3 hidden' dangerouslySetInnerHTML={{__html:question.breaf_answer}}></div>
                </div>
              })}
            </div>

          :

            <div className='my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg'>
              Loading...
            </div>
        }
      </div>
        
        :
        
        ""
      }
    </>
  )
}
