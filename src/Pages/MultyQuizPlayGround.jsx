import React, {useState, useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router'
import axios from 'axios';

let navigate, selected_length, selectedTopics, shuffleQuestions, TOPIC_HAS, fetchData, MARK = 0;

const TOPICS = ["problems-on-trains", "time-and-distance", "height-and-distance", "time-and-work", "simple-interest", "compound-interest"]


const OPTIONS = ['A', 'B', 'C', 'D']
const NOMBER_OF_QUENTIONS = 30
export default function MuliQuizPlayGround() {
  navigate = useNavigate ();

  
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [Answers, setAnswers] = useState([])
  const [selectedAnswerArray, setSelectedAnswerArray] = useState([])
  let SELECTED_ANSWER_ARRAY = Array(NOMBER_OF_QUENTIONS).fill(null)


  selectedTopics = useLocation()?.state?.selected

  if(selectedTopics?.length)
    selected_length = selectedTopics?.length
  else
    selected_length = 0


  useEffect(()=>{
    
    if(selected_length === 0){
      navigate('/multi-quiz')
    }

    getQuestion()

  }, [])
  
  fetchData = async(title)=>{
    try{
      let res = await axios.get(process.env.REACT_APP_QUESTIONS_API + title)
      

      if(res){
        let temp = JSON.stringify({"Q":await res.data, "N":JSON.parse(localStorage.getItem(title))?.N})
        localStorage.setItem(title,temp)
        return true
      }
      
    }catch(e){
      console.log(e);
      return false
    }
  }

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
    if(selected_length > 0){

      let suffledQuestions = []
      let temp = []

      for(let i = 0; i<selected_length; i++){
        let title = selectedTopics[i]
        let modified_title = title.replace(/ /g, "-").toLowerCase()

        TOPIC_HAS = TOPICS.includes(modified_title)
        
        if(TOPIC_HAS){
          if(!JSON.parse(localStorage.getItem(modified_title))?.Q){
            let flag = await fetchData(modified_title)

            if(flag)
              temp = temp.concat(JSON.parse(localStorage.getItem(modified_title))?.Q)
          }
      
          else{
   
            temp = temp.concat(JSON.parse(localStorage.getItem(modified_title))?.Q)

          }
          
        }
        
      }

      if(temp){            
        suffledQuestions = shuffleQuestions(temp)
        setCurrentQuestions(suffledQuestions.slice(0,NOMBER_OF_QUENTIONS))
        console.log(suffledQuestions);

      }
    }
  }

  
  
  const setOption = (index, option)=>{
    SELECTED_ANSWER_ARRAY[index] = option
  }

  const Submit = (e)=>{
    let options = ["A", "B", "C", "D"]
    let answers = []


    currentQuestions.forEach((q, i)=>{
      answers.push(options[q.answer-1])
      if(q.answer === SELECTED_ANSWER_ARRAY[i]){
          MARK++
      }
    })
    console.log(MARK);
    setAnswers(answers);
    setSelectedAnswerArray(SELECTED_ANSWER_ARRAY)

  }

  return (
    <>
      {
        selected_length > 0 ? <>
            <div className='text-white '>
              <div className=' p-3'>
                  <span className='text-xl md:text-3xl font-semibold ' >Multy Quiz Playround</span>
              </div>
            </div>
            {
              currentQuestions.length > 0 ? <div className='p-3 '>
                  {currentQuestions.map((question,x)=>{
                    return <div key={x}  className='text-white mt-5 mb-10 p-5 bg-[#242323] drop-shadow-[0_1px_5px_rgba(0,255,255,.5)] rounded overflow-hidden '>
                        <div className='flex  font-normal	text-base md:text-lg'>
                          {x+1}.
                          <div  dangerouslySetInnerHTML={{__html:question.code}} className={`ml-3 `}></div>
                        </div>

                        {
                          OPTIONS.map((OPTION,i)=>{
                            return <div key={i} className='relative ml-3 flex items-center my-3 overflow-hidden text-sm'>
                               <input type="radio" id={`${question.id}-${i}`} name={`${x}`} value={OPTION} className='mr-3' onChange={(e)=>{setOption(x, i+1)}} />
                                      <label htmlFor={`${question.id}-${i}`} className='flex hover:cursor-pointer' >
                                        <span className=' flex justify-center items-center select-none ' htmlFor={`${question.id}-${i}`}>
                                          <span className={`border-2 rounded-full px-1 py-0 text-xs  flex justify-center items-center ${(Answers[x]===OPTION)?"bg-green-500":""} ${selectedAnswerArray[x] === i+1 ? "bg-red-500":""}` } onClick={()=>console.log(i)}><div>{OPTION}</div></span>
                                        </span>
                                        <div className={`ml-3 `}   dangerouslySetInnerHTML={{__html:question.options[i]}}></div> 
                                      </label>     
                                    </div>
                          })
                        }
                    </div>
                  })}

                   <div className={`flex justify-center mb-10 `}>              
                      <button className={`text-white disabled:bg-red-500 bg-emerald-600 rounded-md px-8 py-2 m-3 lg:my-0 inline-block hover:bg-emerald-800 `} onClick={()=>Submit()}>Submit</button>
                    </div>
                  

                </div>

              :

                <div className='text-white my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg'>
                  Loading...
                </div>
            }
        </>
        :
        ""
      }
    </>
  )
}
