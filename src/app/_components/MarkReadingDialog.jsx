"use client"

import React, { useEffect, useRef, useState } from "react"
import { FaBookmark } from "react-icons/fa"
import API from "../../../lib/axios"

function MarkReadingDialog({ isOpen, onClose }) {
    const dialogRef = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [markArr, setMarkArr] = useState([])
    const [inputValue, setInputValue] = useState('')
    const [search, setSearch] = useState('')

    async function getbooks() {
        try {
            const { data: resp } = await API.get('/get-mark-books', {
                params: { search }
            })
            if (resp.success) {
                const data = resp.books || []
                setMarkArr(data)
            }
        } catch (e) {
            console.log(e)
        }
    }

    async function handleMarkBook(book) {
        setIsLoading(true)
        try {
            console.log(book)
            const { data: resp } = await API.patch('/mark-book', {
                id: book._id,
                status: book.status
            })
            if (resp.success) {
                getbooks()
            }
        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        if (isOpen) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
        getbooks()
    }, [isOpen,search])

    useEffect(() => {
        let timer = setTimeout(() => {
            setSearch(inputValue)
        }, 1000)
        return () => clearTimeout(timer)
    }, [inputValue])

    return (
        <div>
            <dialog
                ref={dialogRef}
                onClose={onClose}
                className="left-auto h-screen w-full max-w-lg rounded-xl p-0 shadow-xl backdrop:bg-black/50"
            >
                <div className="p-5">
                    <div className="flex items-center justify-between pb-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                                <FaBookmark className="text-lg text-indigo-600" />
                            </div>

                            <div>
                                <h3 className="text-lg font-bold text-gray-800">
                                    Mark Your Reading
                                </h3>

                                <p className="text-xs text-gray-500">
                                    Search and update your reading status
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            aria-label="Close dialog"
                            className="flex h-8 w-8 items-center justify-center hover:cursor-pointer rounded-full text-lg font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
                        >
                            X
                        </button>
                    </div>

                    <div className="mt-5">
                        <input
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Search by title..."
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        />
                    </div>

                    {markArr.map((book) => {
                        return (
                            <div key={book._id} className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">

                                <h4 className="min-w-0 flex-1 truncate text-sm font-semibold text-gray-800">
                                    {book.title}
                                </h4>

                                {book.status == 'want-to-read' &&
                                    <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700">
                                        {book.status}
                                    </span>}
                                {book.status == 'reading' &&
                                    <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                                        {book.status}
                                    </span>}
                                {book.status == 'completed' &&
                                    <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        {book.status}
                                    </span>}

                                {book.status == 'want-to-read' &&
                                    <button
                                        onClick={() => handleMarkBook(book)}
                                        className={`shrink-0 rounded-lg px-4 py-1.5 hover:cursor-pointer text-xs font-medium transition-all    
                                             bg-blue-600 text-white hover:bg-blue-700 active:scale-95
                                        }`}
                                    >
                                        {/* {isLoading ? "Marking..." : "Read"} */}
                                        Read
                                    </button>}
                                {book.status == 'reading' &&
                                    <button
                                        onClick={() => handleMarkBook(book)}
                                        className={`shrink-0 rounded-lg px-4 py-1.5 hover:cursor-pointer text-xs font-medium transition-all
                                            bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95
                                            }`}
                                    >
                                        {/* {isLoading ? "Marking..." : "Completed"} */}
                                        Completed
                                    </button>}

                            </div>
                        )
                    })}



                </div>
            </dialog>
        </div>
    )

}

export default MarkReadingDialog
