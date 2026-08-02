"use client"
import React, { useEffect, useState } from 'react'
import { GiCardRandom } from "react-icons/gi";
import { IoMdBookmarks } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";

import axios from 'axios';

function RandomBook() {
    const [randomBookObj,setRandomBookObj] = useState({})
    async function randomBook() {
        try{
            const {data:resp} = await axios.get('https://gutendex.com/books')
            const no = Math.floor(Math.random()*32)
            setRandomBookObj(resp.results[no])
        }catch(e){
            console.log(e)
        }
    }
    useEffect(()=>{
        randomBook()
    },[])
    return (
        <div className='border-2 border-gray-100 rounded-lg m-10 px-6 py-2'>
            <div>
                <span className='flex items-center gap-3'>  <GiCardRandom   className='text-blue-700 text-3xl' />
                    <span className='text-lg font-semibold'>Recommendation</span></span>
            </div>
            

            <div className="rounded-lg border border-gray-100 mt-4">

                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 rounded-t-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500">
                    <span>Title</span>
                    <span>Author</span>
                    <span>Subject</span>
                    <span className="text-center">
                        Add to Collection
                    </span>
                </div>


                <div className="grid grid-cols-[2fr_1.5fr_1.5fr_1fr] items-center gap-4 border-t border-gray-200 px-5 py-4">


                    <div className="font-medium text-gray-800">
                        <span className='flex items-center gap-3'>
                            <IoMdBookmarks className='text-black-700 text-3xl' />
                            <span> {randomBookObj.title}</span>
                        </span>
                    </div>

                    <div className="truncate text-gray-600">
                       {randomBookObj?.authors?.[0].name}
                    </div>

                    <div>
                        <span className="px-3 py-1 text-sm text-gray-700">
                            {randomBookObj?.bookshelves?.[0]}
                        </span>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button className="text-indigo-100 hover:cursor-not-allowed">
                            <GrAddCircle  className='text-2xl' />
                        </button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default RandomBook