import React, { useCallback, useEffect, useState } from 'react'
import { dummyEmployeeData, dummyPayslipData } from '../assets/assets'
import Loader from '../components/Loader'
import PayslipList from '../components/payslip/PayslipList'
import GeneratePayslipForm from '../components/payslip/GeneratePayslipForm'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import {toast} from 'react-hot-toast'

const Payslip = () => {
  const [payslips, setPayslips] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true);
  const { user } = useAuth()
  const isAdmin = user?.role === "ADMIN";


  const fetchPayslip = useCallback(async ()=>{
    try {
      const res = await api.get("/payslips")
      setPayslips(res.data.data || [])
      console.log("PAYSLIP RESPONSE:", res.data)

      
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message)
      
    }finally {
      setLoading(false)
    }
  },[])

  useEffect(()=>{
    fetchPayslip()
  },[fetchPayslip])

  useEffect(()=>{
    if(isAdmin) api.get("/employees")
      .then((res)=> setEmployees(res.data.filter((e)=> !e.isDeleted)))
      .catch(()=>{})
  },[isAdmin])

  if(loading) return <Loader/>

  return (
    <div className='animate-fade-in'>
      <div className='flex flex-col sm:flex-row items-start justify-between gap-4 sm:items-center mb-8'>
        <div>
          <h1 className='page-title'>Payslips</h1>
          <p className='page-subtitle'>{isAdmin ? "Generate and manage employee payslips" : "Your payslip history"}</p>
        </div>
        {isAdmin && <GeneratePayslipForm employees={employees} onSuccess={fetchPayslip}/>}
      </div>
      <PayslipList isAdmin={isAdmin} payslips={payslips}/>
    </div>
    
  )
}

export default Payslip
