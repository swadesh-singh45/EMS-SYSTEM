import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <p className='text-green-400'>SideBar</p>
      <main>
         <div className='p-4'>
            <Outlet />
         </div>
      </main>
    </div>
  )
}

export default Layout
