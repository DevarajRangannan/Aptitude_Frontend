import React, {useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'


let navigate, selected_length, selectedTopics, shuffleQuestions, totalPageNo=0;

const OPTIONS = ['A', 'B', 'C', 'D']
const NOMBER_OF_QUENTIONS = 5

export default function MuliQuizPlayGround() {
  navigate = useNavigate ();

  const [Questions, setQuestions] = useState([])
  const [currentQuestions, setCurrentQuestions] = useState([])
  const [pageNo, setPageNo] = useState(1)
  const [QuestionNo, setQuestionNo] = useState(NOMBER_OF_QUENTIONS)

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

  const getQuestion = ()=>{
    if(selected_length > 0){

      let neededQuestions = []
      let suffledQuestions = []

      for(let i = 0; i<selected_length; i++){
        let e = selectedTopics[i]
        let modified_title = e.replace(/ /g, "-").toLowerCase()
        let temp = JSON.parse(localStorage.getItem(modified_title))

        if(temp){
          neededQuestions = neededQuestions.concat(temp?.Q)
        }
      }

      suffledQuestions = shuffleQuestions(neededQuestions)

      setCurrentQuestions(suffledQuestions.slice(0,NOMBER_OF_QUENTIONS))
      setQuestions(suffledQuestions)
      console.log(suffledQuestions);

      totalPageNo = Math.ceil(neededQuestions.length/NOMBER_OF_QUENTIONS)
    }
  }

  const nextPage = ()=>{
    setCurrentQuestions(Questions.slice(QuestionNo, QuestionNo + NOMBER_OF_QUENTIONS))
    setQuestionNo(QuestionNo + NOMBER_OF_QUENTIONS)

    setPageNo(pageNo+1)
    window.scroll(0, 0);
    // console.log(QuestionNo);

  }

  const backPage = ()=>{
    setQuestionNo(QuestionNo-NOMBER_OF_QUENTIONS)
    console.log(QuestionNo);

    setCurrentQuestions(Questions.slice(QuestionNo-(NOMBER_OF_QUENTIONS*2), QuestionNo - NOMBER_OF_QUENTIONS ))
    setPageNo(pageNo-1)
    window.scroll(0, 0);
    
  }
  


  return (
    <>
      {
        selected_length > 0 ? <>
            <div className='text-white'>
              <div className=' p-3'>
                  <span className='text-xl md:text-3xl font-semibold ' >Multy Quiz Playround</span>
              </div>
              <div className='text-right mr-3'>{Questions.length} questions</div>
              <div className='text-right mr-3'>{pageNo}/{totalPageNo} pages</div>
            </div>
            {
              currentQuestions.length > 0 ? <div >
                  {currentQuestions.map((question,i)=>{
                    return <div key={i}  className='text-white my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded overflow-hidden '>
                        <div className='flex  font-normal	text-base md:text-lg'>
                          {(QuestionNo-(NOMBER_OF_QUENTIONS-1))+i}.
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


                        {/* <div className='ml-3 p-1 w-fit fill-white border rounded hover:fill-emerald-700 hover:border-emerald-500 hover:cursor-pointer' onClick={()=>{viewAnswer(i)}}><ANSWER_ICON/></div>

                        <div id={`answer-`+i} className='m-3 hidden'><span  className='text-emerald-500 font-semibold '>Answer: </span><span className='rounded-full border-2 text-xs px-1 py-0'>{OPTIONS[question.answer-1]}</span></div> */}
                    </div>
                  })}

                   <div className={`flex justify-center mb-10 `}>
                      <button className={`text-white disabled:bg-red-500 bg-emerald-600 rounded-md px-8 py-2 m-3 lg:my-0 inline-block hover:bg-emerald-800 ${pageNo===1 ?"hidden":""}`} onClick={()=>backPage()}>Back</button>

                      <button className={`text-white disabled:bg-red-500 bg-emerald-600 rounded-md px-8 py-2 m-3 lg:my-0 inline-block hover:bg-emerald-800 ${pageNo>=totalPageNo ?"hidden":""}`} onClick={()=>nextPage()}>Next</button>
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
