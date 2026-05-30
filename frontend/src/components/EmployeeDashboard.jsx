import React from 'react'
import { ArrowRightIcon, CalendarIcon, DollarSignIcon, FileTextIcon, Link } from 'lucide-react'

const EmployeeDashboard = ({data}) => {
  const emp = data.employee;


  const cards = [
    {
      icon: CalendarIcon,
      value: data.currentMonthAttendance,
      title: "Days Present",
      subtitle: "This month",
    },
    {
      icon: FileTextIcon,
      value: data.pendingLeaves,
      title: "Pending Leaves",
      subtitle: "Awaiting Approval",
    },
    {
      icon: DollarSignIcon,
      value: data.latestPayslip ? `$${data.latestPayslip.netSalary?.toLocaleString()}`: "N/A",
      title: "Latest Payslip",
      subtitle: " Most recent payout",
    },
  ]


  return (
    <div className='animate-fade-in'>
      <div className='page-header'>
         <h1 className='page-title'>Welcome, {emp?.firstName || "User"}!</h1>
         <p className='page-subtitle'>
          {emp?.position || "No Position"} - {emp?.department || "No Department"}
         </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mt-4'>
        {cards.map((card, index)=>(
          <div key={index} className='card card-hover p-5 sm:p-6 relative overflow-hidden group flex items-center justify-between'>
            <div>
              <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70' />
              <p className='text-sm font-medium text-slate-700'>{card.title}</p>
              <p className='text-2xl font-bold text-slate-900 mt-1'>{card.value??0}</p>
            </div>
            <card.icon className='size-10 p-2.5 rounded-lg bg-slate-100 text-slate-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors duration-200'/>
          </div>
        ))}
      </div>

      <div className='flex flex-col sm:flex-row gap-3 mt-5'>
        <a href="/attendance" className='btn-primary text-center inline-flex items-center justify-center gap-2'> 
           Mark Attendance
         <ArrowRightIcon className='w-4 h-4'/> </a>
         <a href="/leave" className='btn-secondary text-center '>
          Apply for Leave
         </a>
      </div>
    </div>
  )
}

export default EmployeeDashboard