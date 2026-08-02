"use client"
import React, { useEffect, useState } from 'react'
import { FaBookOpen } from 'react-icons/fa6'
import { IoMdCloudDone } from "react-icons/io"
import AddBookDialog from './AddBookDialog'
import API from '../../../lib/axios'
import RandomBook from './RandomBook'

function Statics() {
    const [isOpen, setIsOpen] = useState(false)
    const [counts, setCounts] = useState({
        total:0,
        wtotal:0,
        rtotal:0,
        ctotal:0
    })

    async function fetchCounts() {
        try {
            const { data: resp } = await API.get('/dashboard-counts')
            console.log(resp)
            if(resp.success){
                const counts = resp.counts
                setCounts(counts)
            }
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchCounts()
    }, [])
    return (
        <div className='w-full'>
            <div className='p-12'>
                <span className='flex items-center gap-3'>  <FaBookOpen className='text-purple-700 text-4xl' />
                    <span className='text-3xl font-bold'>Welcome back, Alwyn!</span></span>
                <span className='text-gray-400'>Track your reading journey here.</span>
            </div>

            <div className='w-full flex justify-around'>
                <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <FaBookOpen className='text-purple-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-md font-semibold'>Total Books</span>
                        <span className='text-xl font-bold'>{counts.total}</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <FaBookOpen className='text-blue-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-md font-semibold'>Reading</span>
                        <span className='text-xl font-bold'>{counts.rtotal}</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <FaBookOpen className='text-yellow-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-md font-semibold'>To Read</span>
                        <span className='text-xl font-bold'>{counts.wtotal}</span>
                    </span>
                </div>
                <div className='flex items-center gap-3 px-12 py-4 bg-gray-100 border border-gray-200 rounded-xl'>
                    <IoMdCloudDone className='text-green-700 text-4xl bg-gray-200 p-1 rounded-xl' />
                    <span>
                        <span className='block text-md font-semibold'>Completed</span>
                        <span className='text-xl font-bold'>{counts.ctotal}</span>
                    </span>
                </div>
            </div>

            <hr className='text-gray-200 mt-4' />

            <div className='p-3 space-x-4 mt-1 mx-6 flex justify-end'>
                <button onClick={() => setIsOpen(true)}
                    className='border px-6 py-2 rounded-lg bg-indigo-700 text-xs font-semibold text-white'>Add Book</button>
                <button className='border px-6 py-2 rounded-lg bg-blue-700 text-xs font-semibold text-white'>Add Tags</button>
            </div>
            <RandomBook/>
            <AddBookDialog onClose={() => setIsOpen(false)} isOpen={isOpen} />
        </div>
    )
}

export default Statics 