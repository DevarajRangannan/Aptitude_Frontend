import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { ReactComponent as FOLDER_ICON } from '../asserts/folder.svg'

const TOPICS = ["Problems on Trains", "Time and Distance", "Height and Distance", "Time and Work", "Simple Interest", "Compound Interest", "Profit and Loss", "Partnership", "Percentage", "Problems on Ages", "Calendar", "Clock", "Average", "Area", "Volume and Surface Area", "Permutation and Combination", "Numbers", "Problems on Numbers", "Problems on H.C.F and L.C.M", "Decimal Fraction", "Simplification", "Square Root and Cube Root", "Surds and Indices", "Ratio and Proportion", "Chain Rule", "Pipes and Cistern", "Boats and Streams", "Alligation or Mixture", "Probability"]

export default function MultiQuiz() {

    const [selected, setSelected] = useState([])

    let navigate = useNavigate ();
    

    const x = (e)=>{
        let flag = e.target.checked
        let topic = e.target.value

        if(flag){
            setSelected(p => {
                let temp = [...p]
                temp.push(topic)
                return temp
            })
        }
        else{
            setSelected(p => {
                let temp = [...p]
                let index = temp.indexOf(topic)
                temp.splice(index, 1);
                return temp
            })
        }
    }

    const startMultiQuiz = ()=>{
        if(selected.length > 0)
            navigate('/multi-quiz-ground', {state:{selected:selected}})
        else
            alert("Please select atleast one topic")
    }

  return (
    <>
        <div className='text-white p-3  '>
            <div className='lg:flex justify-between'>
                <span className='text-xl md:text-3xl font-semibold '>MultiQuiz</span>
                <div className='mt-5 lg:mt-0'>
                   <span className=''>
                        <Link to={`/multi-quiz-ground`} className='bg-emerald-600 rounded-md px-3 py-2  inline-block hover:bg-emerald-800' state={{selected:TOPICS}}>Suffle All Topics</Link>
                    </span>
                    <span className=''>
                        <button className=' disabled:bg-red-500 bg-emerald-600 rounded-md px-8 py-2 m-3 lg:my-0 inline-block hover:bg-emerald-800' disabled={false} onClick={()=>{startMultiQuiz()}}>
                            Start
                        </button>
                    </span>
                </div>
            </div>

            
            
            <div className={`my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg grid md:grid-cols-2 select-none `}>
                {TOPICS.map((topic, i)=>{
                    return <span key={i} className='flex '>
                        <span className=''>
                            <input type="checkbox" id={`check-box-`+i} name={"topic"} value={topic} className='hover:cursor-pointer' onChange={(e)=>x(e)}/>
                        </span>
                        <label htmlFor={`check-box-`+i} className='ml-3 hover:cursor-pointer group'>
                            <span className=' mb-2 flex items-center' key={i} state={{title:topic}}>
                                <span className='fill-yellow-500  group-hover:fill-yellow-700'>
                                    <FOLDER_ICON/>
                                </span>
                                <span className='ml-1'>{topic}</span>
                            </span>
                        </label>

                        
                        
                    </span>
                })}
            </div>

            <div className='w-full  flex justify-center'>
                <button className='disabled:bg-red-500 bg-emerald-600 rounded-md px-8 py-2 m-3 lg:my-0 inline-block hover:bg-emerald-800' disabled={false} onClick={()=>{startMultiQuiz()}}>
                    Start
                </button>
            </div>
        </div>
    </>
  )
}
