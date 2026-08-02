"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import API from '../../../lib/axios';

function RegisterForm() {

    const router = useRouter()
    const [registerObj, setRegisterObj] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
    })

    function handleChange(e) {
        const { name, value } = e.target

        setRegisterObj((prev) => {
            return { ...prev, [name]: value }
        })
    }

    async function handleRegister(e) {
        e.preventDefault()

        if (registerObj.password !== registerObj.cpassword) {
            alert("Passwords do not match!")
            return
        }
        try {
            const { data: resp } = await API.post('/signup', { registerObj })
            console.log(resp)
            if (resp.success) {
                router.push('/login')
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    return (

        <div className='bg-indigo-100 h-screen flex justify-center p-6'>
            <div className='bg-white p-8 w-full max-w-md rounded-2xl mb-8'>
                <div className='text-center text-2xl font-bold text-gray-600'>
                    <p>Create Account</p>
                </div>
                <div className='p-4 space-y-5'>
                    <div>
                        <label className='block text-gray-500 font-semibold mb-1'>FULL NAME</label>
                        <input type="text"
                            name='name'
                            onChange={handleChange}
                            placeholder='Alwyn Mathew'
                            className='w-full rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 font-semibold uppercase mb-1'>Email Address</label>
                        <input type="email"
                            name='email'
                            onChange={handleChange}
                            placeholder='alwyn@gmail.com'
                            className='w-full rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 font-semibold uppercase mb-1'>Password</label>
                        <input type="password"
                            name='password'
                            onChange={handleChange}
                            placeholder='*******'
                            className='w-full rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-500 font-semibold uppercase mb-1'>Retype-Password</label>
                        <input type="password"
                            name='cpassword'
                            onChange={handleChange}
                            placeholder='*******'
                            className='w-full rounded-lg px-4 py-2 border border-gray-200 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>

                    <button onClick={handleRegister}
                        className='w-full bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-1.5 text-sm transaction-colors-400'
                    >SignUp</button>
                </div>
                <p className="text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;
