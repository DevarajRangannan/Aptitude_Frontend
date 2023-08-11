import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as FOLDER_ICON } from '../asserts/folder.svg'

const TOPICS = ["Problems on Trains", "Time and Distance", "Height and Distance", "Time and Work", "Simple Interest", "Compound Interest", "Profit and Loss", "Partnership", "Percentage", "Problems on Ages", "Calendar", "Clock", "Average", "Area", "Volume and Surface Area", "Permutation and Combination", "Numbers", "Problems on Numbers", "Problems on H.C.F and L.C.M", "Decimal Fraction", "Simplification", "Square Root and Cube Root", "Surds and Indices", "Ratio and Proportion", "Chain Rule", "Pipes and Cistern", "Boats and Streams", "Alligation or Mixture", "Probability"]

export default function Home() {
  return (
    <>
        <div className='text-white p-3  '>
            <div className='flex justify-between	'>
                <span className='text-xl md:text-3xl font-semibold '>Quantative Topics</span>
                <span className=''>
                    <Link to={`/multi-quiz`} className='bg-emerald-600 rounded-md px-3 py-2  inline-block hover:bg-emerald-800' >Multi Quiz</Link>
                </span>
            </div>
            <ul className='my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg grid md:grid-cols-2  '>
                

                {TOPICS.map((topic, i)=>{
                    return <span key={i}  className='inline flex'>
                        <Link to={`/topic/`+topic.replace(/ /g,"-").toLowerCase()} className='hover:underline mb-2 flex items-center group' key={i} state={{title:topic}}>
                                <span className='fill-yellow-500 group-hover:fill-yellow-700'>
                                    <FOLDER_ICON/>
                                </span>
                                <span className='ml-1'>{topic}</span>
                            </Link>
                    </span>
                })}
            </ul>
            <div className='w-full  flex justify-center'>
                <Link to={`/multi-quiz`} className='bg-emerald-600 rounded-md px-5 py-2 my-3 inline-block hover:bg-emerald-800' >Multi Quiz</Link>
            </div>
        </div>
    </>
  )
}
