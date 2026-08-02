"use client"
import Link from 'next/link'
import React from 'react'
import { FaBookOpen } from 'react-icons/fa6'
import { IoHomeOutline, IoLogOutOutline } from "react-icons/io5"
import { IoMdBook } from "react-icons/io"
import API from '../../../lib/axios'
import { useRouter } from 'next/navigation'

function NavBar() {
    const router = useRouter()
    async function handleLogout() {
        try {
            const {data:resp} = await API.post('/logout')
            if(resp.success){
                router.push('/login')
            }
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div className='bg-gray-200 min-h-screen w-56 p-5'>
            <div className='flex items-center gap-3'>
                <FaBookOpen className='text-purple-700 text-6xl' />
                <span className="text-md font-bold text-gray-800">Personal Book Manager</span>
            </div>

            <div className='mt-4 flex flex-col text-gray-600 font-semibold'>
                <Link href={"/dashboard"} className='flex items-center gap-3 hover:bg-purple-100 px-1 py-3 rounded-lg hover:text-purple-700'>
                    <IoHomeOutline className='text-lg' /> <span>Dashboard</span> </Link>

                <Link href={"/mylibrary"} className='flex items-center gap-3 hover:bg-purple-100 px-1 py-3 rounded-lg hover:text-purple-700'>
                    <IoMdBook className='text-lg' /><span>My Books</span></Link>

                <button onClick={handleLogout}
                    className='flex items-center gap-3 hover:cursor-pointer hover:bg-red-100 px-1 py-3 rounded-lg hover:text-red-700'>
                    <IoLogOutOutline className='text-lg' /> <span>Logout</span>
                </button>
            </div>
        </div>
    )
}

export default NavBar