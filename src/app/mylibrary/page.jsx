import React from 'react'
import NavBar from '../_components/NavBar'
import Mylibrary from '../_components/Mylibrary'

function page() {
  return (
    <div className='flex'>
        <NavBar/>
        <Mylibrary/>
    </div>
  )
}

export default page