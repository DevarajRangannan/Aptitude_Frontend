import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as FOLDER_ICON } from '../asserts/folder.svg'

const TOPICS = ["Problems on Trains", "Time and Distance", "Height and Distance", "Time and Work", "Simple Interest", "Compound Interest", "Profit and Loss", "Partnership", "Percentage", "Problems on Ages", "Calendar", "Clock", "Average", "Area", "Volume and Surface Area", "Permutation and Combination", "Numbers", "Problems on Numbers", "Problems on H.C.F and L.C.M", "Decimal Fraction", "Simplification", "Square Root and Cube Root", "Surds and Indices", "Ratio and Proportion", "Chain Rule", "Pipes and Cistern", "Boats and Streams", "Alligation or Mixture", "Probability"]

export default function Home() {
  return (
    <>
        <div className='text-white p-3  '>
            <div className='text-xl md:text-3xl font-semibold'>Quantative Topics</div>
            <ul className='my-5 p-5 bg-[#242323] drop-shadow-[0_3px_5px_rgba(0,0,0,.8)] rounded md:text-lg grid md:grid-cols-2  '>
                

                {TOPICS.map((topic, i)=>{
                    return <Link to={`/topic/`+topic.replace(/ /g,"-").toLowerCase()} className='hover:underline mb-2' key={i} state={{title:topic}}>
                                <sub className='inline-block fill-yellow-500 '>
                                    <FOLDER_ICON/>
                                </sub>
                                <span className='ml-1'>{topic}</span>
                            </Link>
                })}
            </ul>
        </div>
    </>
  )
}
