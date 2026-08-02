"use client"
import Link from 'next/link';
import React, { useState } from 'react';
import API from '../../../lib/axios';
import { useRouter } from 'next/navigation';

function LoginForm() {
    const router = useRouter()
    const [loginObj, setLoginObj] = useState({
        email: '',
        password: ''
    })
    function handleChange(e) {
        const { name, value } = e.target

        setLoginObj((prev) => {
            return { ...prev, [name]: value }
        })
    }
   async function handleSignIn(e){
        e.preventDefault()
        try{
            const {data:resp} = await API.post('/signin',loginObj)
            if(resp.success){
                sessionStorage.setItem('username',resp.name)
                router.push('/dashboard')
            }
        }catch(err){
            console.log(err)
        }
    }
    return (
        <div className='bg-indigo-100 h-screen flex justify-center px-6 py-8'>
            <div className='bg-white px-8 py-13 w-full max-w-md rounded-2xl mb-20 border border-gray-200'>
                <div className='text-center'>
                    <p className='text-2xl font-bold text-gray-700'>Welcome Back</p>
                  <p className="text-sm text-gray-500 mt-2">Please enter your credential to sign in</p>

                </div>
                <div className='p-4 space-y-5'>

                    <div>
                        <label className='block text-gray-600 font-semibold uppercase mb-1'>Email Address</label>
                        <input type="email"
                            name='email'
                            onChange={handleChange}
                            placeholder='alwyn@gmail.com'
                            className='w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-600 font-semibold uppercase mb-1'>Password</label>
                        <input type="password"
                            name='password'
                            onChange={handleChange}
                            placeholder='*******'
                            className='w-full rounded-lg px-4 py-2 border border-gray-300 focus:outline-none focus:border-indigo-500 placeholder-gray-400'
                        />
                    </div>


                    <button onClick={handleSignIn}
                        className='w-full bg-indigo-600 hover:cursor-pointer hover:bg-indigo-700 text-white font-semibold rounded-xl px-4 py-1.5 text-sm transaction-colors-400'
                    >Sign In</button>
                </div>
                <p className="text-center text-sm text-gray-500">
                     Don't have an account?{' '}
                    <Link href={"/register"} className="font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                        Sign up here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginForm;
