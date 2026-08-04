"use client"
import React, { useEffect, useState } from 'react'
import { CiViewList } from "react-icons/ci";
import { FaBookOpen } from 'react-icons/fa6'
import { IoMdBookmarks } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import AddBookDialog from './AddBookDialog';
import API from '../../../lib/axios';

function Mylibrary() {
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState('')
    const [pageNo, setPageNo] = useState(0)
    const [lastPage, setLastPage] = useState(0)
    const [status, setStatus] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [bookArr, setBookArr] = useState([])
    const [editObj, setEditObj] = useState({})



    async function getBook() {
        try {
            const { data: resp } = await API.get('/get-book', {
                params: { pageNo, status, tags: tags }
            })
            console.log(resp)
            if (resp.success) {
                const books = resp.lists ?? []
                let count = books.length == 4 ? 4 : 0
                setLastPage(count)
                setBookArr(books)
            }
        } catch (e) {
            console.log(e)
        }
    }
    function handleEdit(book) {
        setEditObj(book)
        setIsOpen(true)
    }
    async function handleDelete(book) {
        const flag = confirm("Are you sure?")
        if (!flag) return
        try {
            const { data: resp } = await API.delete('/delete-book', {
                params: { id: book._id }
            })
            if (resp.success) {
                getBook()
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTags(search)
        }, 1000)
        return () => clearTimeout(timer)
    }, [search])

    useEffect(() => {
        getBook()
    }, [isOpen, pageNo, status, tags])

    return (
        <div className='w-full'>
            <div className='w-full flex justify-between p-12'>
                <div >
                    <span className='flex items-center'>
                        <CiViewList className='text-4xl text-indigo-800' />
                        <h1 className='text-extrabold text-4xl'>My Books</h1>
                    </span>
                    <p className='text-md text-gray-500'>Collection of all my favourites!!!</p>
                </div>
                <div>
                    <button onClick={() => setIsOpen(true)}
                        className='border px-6 py-2 rounded-lg hover:cursor-pointer bg-indigo-700 text-xs font-semibold text-white'>Add Book</button>
                </div>
            </div>
            <hr className='text-gray-200' />

            <div className='border-2 border-gray-100 rounded-lg m-10 px-6 py-2'>
                <div className='flex justify-between items-center'>
                    <span className='flex items-center gap-3'>  <FaBookOpen className='text-purple-700 text-2xl' />
                        <span className='text-lg font-semibold'>Books</span></span>

                    <div className='flex items-center'>
                        <input type="text" className='border border-gray-200 mr-4 px-4 py-2.5 rounded-lg text-gray-600 font-medium'
                            placeholder='Search By Tags' onChange={(e) => setSearch(e.target.value)} />
                        <select
                            onChange={(e) => setStatus(e.target.value)}
                            name="status"
                            className="w-full rounded-lg border border-gray-300 text-gray-600 font-medium bg-white px-4 py-2.5 mr-4 outline-none focus:border-purple-600"
                        >
                            <option value="" className='text-gray-600'>
                                Select Status
                            </option>
                            <option value="want-to-read" className='text-gray-600 font-medium'>
                                Want to Read
                            </option>

                            <option value="reading" className='text-gray-600 font-medium'>
                                Reading
                            </option>

                            <option value="completed" className='text-gray-600 font-medium'>
                                Completed
                            </option>
                        </select>

                        <button disabled={lastPage==0} onClick={() => setPageNo(pageNo + 1)} className={`${lastPage==0 ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                            <FaChevronCircleDown className={`text-3xl ${lastPage==0 ? "text-indigo-300" : "text-indigo-800"}`} />
                        </button>
                        <button disabled={pageNo == 0} onClick={() => setPageNo(pageNo - 1)} className={`${pageNo == 0 ? "hover:cursor-not-allowed" : "hover:cursor-pointer"}`}>
                            <FaChevronCircleUp className={`text-3xl ${pageNo == 0 ? "text-indigo-300" : "text-indigo-800"}`} />
                        </button>

                    </div>

                </div>

                {bookArr.length > 0 ? (
                    <div className="rounded-lg border border-gray-100 mt-4">

                        <div className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 rounded-t-lg bg-gray-100 px-5 py-3 text-sm font-semibold text-gray-500">
                            <span>Title</span>
                            <span>Author</span>
                            <span>Status</span>
                            <span>Tags</span>
                            <span className="text-center">
                                Actions
                            </span>
                        </div>

                        {bookArr?.map((book) => {
                            return (
                                <div key={book._id} className="grid grid-cols-[2fr_1.5fr_1fr_1fr] items-center gap-4 border-t border-gray-200 px-5 py-4">


                                    <div className="font-medium text-gray-800">
                                        <span className='flex items-center gap-3'>
                                            <IoMdBookmarks className='text-black-700 text-3xl' />
                                            <span>{book.title}</span>
                                            {book.tags?.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-white bg-gray-500 rounded-xl px-2 py-0.5 text-xs"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </span>
                                    </div>

                                    <div className="truncate text-gray-600">
                                        {book.author}
                                    </div>

                                    <div>
                                        {book.status === 'want-to-read' &&
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                                                {book.status}
                                            </span>}
                                        {book.status === 'reading' &&
                                            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                                                {book.status}
                                            </span>}
                                        {book.status === 'completed' &&
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                                                {book.status}
                                            </span>}

                                    </div>

                                    <div className="flex justify-center gap-3">
                                        <button onClick={() => handleEdit(book)} className="text-blue-500 hover:cursor-pointer">
                                            <TiEdit className='text-2xl' />
                                        </button>

                                        <button onClick={() => handleDelete(book)}
                                            className="text-red-500 hover:cursor-pointer">
                                            <RiDeleteBinLine className='text-2xl' />
                                        </button>
                                    </div>


                                </div>
                            )
                        })}



                    </div>
                ) : (
                    <div className="rounded-lg border border-gray-100 text-gray-500 font-medium  text-center mt-4">
                        No collection
                    </div>
                )}

            </div>
            <AddBookDialog onClose={() => { setIsOpen(false); setEditObj(null) }} isOpen={isOpen} editObj={editObj} />
        </div>
    )
}

export default Mylibrary