"use client"
import React from 'react'
import { GiCardRandom } from "react-icons/gi";
import { IoMdBookmarks } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";

function RandomBook() {
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
                    <span>Status</span>
                    <span className="text-center">
                        Actions
                    </span>
                </div>


                <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 border-t border-gray-200 px-5 py-4">


                    <div className="font-medium text-gray-800">
                        <span className='flex items-center gap-3'>
                            <IoMdBookmarks className='text-black-700 text-3xl' />
                            <span> Atomic Habits</span>
                        </span>
                    </div>

                    <div className="truncate text-gray-600">
                        James Clear
                    </div>

                    <div>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                            Reading
                        </span>
                    </div>

                    <div className="flex justify-center gap-3">
                        <button className="text-blue-500 hover:cursor-pointer">
                            <TiEdit className='text-2xl' />
                        </button>

                        <button className="text-red-500 hover:cursor-pointer">
                            <RiDeleteBinLine className='text-2xl' />
                        </button>
                    </div>


                </div>

            </div>

        </div>
    )
}

export default RandomBook