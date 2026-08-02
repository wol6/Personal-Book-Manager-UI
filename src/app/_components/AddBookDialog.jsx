"use client"
import React, { useEffect, useRef, useState } from 'react'
import API from '../../../lib/axios'

function AddBookDialog({ isOpen, onClose, editObj }) {
    const dialogRef = useRef(null)

    const initialObj = {
        title: '',
        author: '',
        tags: "",
        status: "want-to-read"
    }
    const [bookObj, setBookObj] = useState(initialObj)

    useEffect(() => {
        if (isOpen) {
            setBookObj(editObj || initialObj)

            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [isOpen])

    function handleChange(e) {
        const { name, value } = e.target
        setBookObj((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            if (editObj) {
                const { data: resp } = await API.put('/update-book', bookObj)
                if (resp.success) {
                    setBookObj(initialObj)
                    onClose(false)
                }
            } else {
                const { data: resp } = await API.post('/add-book', bookObj)
                if (resp.success) {
                    setBookObj(initialObj)
                    onClose(false)
                }
            }

        } catch (e) {
            console.log(e)
        }
    }
    return (
        <div>
            <dialog ref={dialogRef} onClose={onClose} className="w-full max-w-lg left-auto rounded-xl p-6 shadow-xl backdrop:bg-black/50">
                <form className="space-y-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-xl font-bold text-gray-800">
                                {editObj ? "Edit Book" : "Add Book"}
                            </h1>


                            <p className="mt-1 text-sm text-gray-500">
                                {editObj ? '' : 'Add a book to your collection'}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onClose}
                            className="text-2xl text-gray-500 hover:text-gray-800"
                        >
                            X
                        </button>


                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="title"
                            className="text-sm font-medium text-gray-700"
                        >
                            Book Title
                        </label>


                        <input
                            onChange={handleChange}
                            value={bookObj.title}
                            name="title"
                            type="text"
                            placeholder="Enter book title"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-600"
                        />


                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="author"
                            className="text-sm font-medium text-gray-700"
                        >
                            Author
                        </label>


                        <input
                            onChange={handleChange}
                            value={bookObj.author}
                            name="author"
                            type="text"
                            placeholder="Enter author name"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-600"
                        />


                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="tags"
                            className="text-sm font-medium text-gray-700"
                        >
                            Tags
                        </label>


                        <input
                            onChange={handleChange}
                            value={bookObj.tags}
                            name="tags"
                            type="text"
                            placeholder="Fiction, Self-help, Technology"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-purple-600"
                        />

                        <p className="text-xs text-gray-500">
                            Separate multiple tags with commas
                        </p>


                    </div>


                    <div className="space-y-2">
                        <label
                            htmlFor="status"
                            className="text-sm font-medium text-gray-700"
                        >
                            Reading Status
                        </label>


                        <select
                            onChange={handleChange}
                            value={bookObj.status}
                            name="status"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 outline-none focus:border-purple-600"
                        >
                            <option value="want-to-read">
                                Want to Read
                            </option>

                            <option value="reading">
                                Reading
                            </option>

                            <option value="completed">
                                Completed
                            </option>
                        </select>


                    </div>


                    <div className="flex justify-end gap-3 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                        >
                            Cancel
                        </button>


                        <button
                            onClick={handleSubmit}
                            className="rounded-lg bg-purple-700 px-5 py-2 text-sm font-medium text-white hover:cursor-pointer hover:bg-purple-800"
                        >
                            {editObj ? "Update" : "Add"}
                        </button>

                    </div>
                </form>

            </dialog>
        </div>
    )
}

export default AddBookDialog