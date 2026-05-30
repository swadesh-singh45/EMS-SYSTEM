import React, { useCallback, useEffect, useState } from 'react'
import { dummyLeaveData } from "../assets/assets"
import Loader from '../components/Loader';
import { PalmtreeIcon, PlusIcon, ThermometerIcon, UmbrellaIcon } from 'lucide-react'
import Leavehistory from '../components/leave/Leavehistory';
import ApplyLeaveModal from '../components/leave/ApplyLeaveModal';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { toast } from 'react-hot-toast';
const Leave = () => {
  const {user} = useAuth()
  const [leaves, setLeaves] = useState([])
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const isAdmin = user?.role === "ADMIN";

  const fetchLeave = useCallback(async ()=>{
    try {
      const res = await api.get("/leave");
      setLeaves(res.data.data || [])
      if(res.data.employee?.isDeleted) setIsDeleted(true)

    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
      
    }finally {
      setLoading(false)
    }
  },[])

  useEffect(()=>{
    fetchLeave()
  },[fetchLeave])

  if(loading) return <Loader/>

  const approvedLeave = leaves.filter((l)=>l.status === "APPROVED")
  const sickCount = approvedLeave.filter((l)=>l.type === "SICK").length;
  const casualCount = approvedLeave.filter((l)=>l.type === "CASUAL").length;
  const annualCount = approvedLeave.filter((l)=>l.type === "ANNUAL").length;

  const leaveStats = [
    {label:"Sick Leave",value: sickCount, icon: ThermometerIcon},
    {label:"Casual Leave",value: casualCount, icon: UmbrellaIcon},
    {label:"Annual Leave", value: annualCount, icon: PalmtreeIcon},

  ]

  return (
    <div className='animate-fade-in'>
      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
        <div>
          <h1 className='page-title'>Leave Management</h1>
          <p className='page-subtitle'>{isAdmin? "Manage leave applications" : "Your leave history and requests"}</p>
        </div>
        {!isAdmin && !isDeleted && (
          <button onClick={()=>setShowModal(true)} className='btn-primary flex items-center gap-2 w-full justify-center sm:w-auto'>
            <PlusIcon className='w-4 h-4'/> Apply for Leave
          </button>
        )}

      </div>
      {!isAdmin && (
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 mb-8'>
          {leaveStats.map((s)=>(
            <div key={s.label} className='card card-hover p-5 sm:p-6 flex items-center gap-4 relative overflow-hidden group'>
              <div className='absolute left-0 top-0 bottom-0 w-1 rounded-r-full bg-slate-500/70 group-hover:bg-indigo-500/70'/>
              <div className='bg-slate-100 p-3 rounded-lg group-hover:bg-indigo-50 transition-colors duration-200'>
                <s.icon className='w-4 h-4 text-slate-600 group-hover:text-indigo-600 transition-colors duration-200'/>
              </div>
              <div>
                <p className='text-sm text-slate-500 font-medium tracking-tight'>{s.label}</p>
                <p className='font-bold text-2xl tracking-tight text-slate-900 '>{s.value} <span className='font-normal text-sm text-slate-400'> token</span></p>
              </div>


            </div>
          ))}


        </div>
      )}

      <Leavehistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeave}/>
      <ApplyLeaveModal open= {showModal} onClose={()=>setShowModal(false)} onSuccess={fetchLeave} />
    </div>
  )
}

export default Leave
