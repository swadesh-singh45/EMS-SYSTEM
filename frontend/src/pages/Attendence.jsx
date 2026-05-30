import React, { useCallback, useEffect, useState } from 'react'
import { dummyAttendanceData } from "../assets/assets"
import Loader from '../components/Loader'
import CheckInButton from '../components/attendence/CheckInButton'
import AttendanceStats from '../components/attendence/AttendanceStats'
import AttendanceHistory from '../components/attendence/AttendanceHistory'
import api from '../api/axios'
import { toast } from 'react-hot-toast'

const Attendence = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [isDeleted, setIsDeleted] = useState(false)

  const fetchData = useCallback(async ()=>{
     try {
     const res =  await api.get("/attendance")
     const json = res.data;
     setHistory(json.data || [])
     if(json.employee?.isDeleted) {
      setIsDeleted(true)
     }

    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
      
    }finally {
      setLoading(false)
     }
  },[])

  useEffect(()=>{
    fetchData()
  },[fetchData])

  if (loading) return <Loader/>
  
  const today = new Date()
  today.setHours(0,0,0,0)
  const todayRecord = history.find((r)=> new Date(r.date).toDateString()=== today.toDateString())


  return (
    <div className='animate-fade-in'>
      <div className='page-header'>
        <h2 className='page-title'>Attendance</h2>
        <p className='page-subtitle'>Track your work hours and daily check-ins</p>
      </div>
      {
        isDeleted ? (
          <div className='md-8 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center'>
            <p className='text-rose-600'>You can no longer clock in or out beacuse your employee record have been marked as delete</p>
          </div>
        ) : (
          <div className='mb-8'>
            <CheckInButton todayRecord={todayRecord} onAction={fetchData}/>
          </div>
        )
      }
      <AttendanceStats history={history}/>
      <AttendanceHistory history= {history}/>
    </div>
  )
}

export default Attendence
