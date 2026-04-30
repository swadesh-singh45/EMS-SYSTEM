import React from 'react'

const LoginLeftSide = () => {
  return (
    <div className='hidden md:flex w-1/2 overflow-hidden bg-indigo-950 relative border-r border-slate-200'>
      <div className='absolute -top-30 -left-30 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl'></div>
         
      <div className='relative flex flex-col z-10 items-start justify-center p-12 w-full h-full lg:p-20'>
            <h1 className='text-white font-medium text-4xl lg:text-5xl mb-6 leading-tight tracking-tight'>Employee <br />Management System</h1>
            <p className='text-slate-400 text-lg max-w-md leading-relaxed'>Streamline your workforce operations, track
               attendance, manage payroll, and empower your team
               securely.</p>
        </div>


    </div>
  )
}

export default LoginLeftSide
