import { CalendarDays, FileText, Loader2Icon, Send, X } from 'lucide-react';
import React, { useState } from 'react'
import api from '../../api/axios';
import { toast } from 'react-hot-toast';

const ApplyLeaveModal = ({open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false)

  const today = new Date();
  const tomorrow = new Date(today)
  tomorrow.setDate(today.getDate() +1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setLoading(true)
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      await api.post("/leave", data)
      onSuccess()
      onClose()
      
    } catch (error) {
      toast.error(error.response?.data?.error || error?.message)
      
    }finally{
      setLoading(false)
    }
  }
  if(!open) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm' onClick={onclose}>
      <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in' onClick={(e)=> e.stopPropagation()}>

        {/* Header Section */}
        <div className='flex items-center justify-between pb-0 p-6'>
          <div>
            <h2 className='text-lg font-semibold text-slate-900'>Apply for Leave</h2>
            <p className='text-sm text-slate-400 mt-0.5'>Submit your leave request for approval</p>
          </div>
          <button onClick={onClose} className='p-2 rounded-lg hover:bg-slate-100 transition-colors text-slate-400 hover:text-indigo-600'>
            <X className='w-4 h-4'/>
          </button>
        </div>

        {/* -------Form------ */}
        <form onSubmit={handleSubmit} className='p-6 space-y-5'>
          <div>
            {/* ---Leave type */}
            <label className='flex items-center gap-2 text-sm font-medium text-slate-600 mb-2'>
              <FileText className='w-4 h-4 text-slate-400'/>
              Leave Type
            </label>
            <select name='type' required>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Causal Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>
          {/* ----Duration----- */}
          <div>
             <label className='flex items-center gap-2 text-sm font-medium text-slate-600 mb-2'>
                 <CalendarDays className='w-4 h-4 text-slate-400'/>
                 Duration
            </label>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <span className='block text-sm text-slate-400 mb-1'>To</span>
                <input type="date" name='startDate' required min={minDate} />
              </div>
              <div>
                <span className='block text-sm text-slate-400 mb-1'>From</span>
                <input type="date" name='endDate' required min={minDate} />
              </div>
            </div>

          </div>
          {/* ----Reason type----- */}
          <div>
            <label className='text-sm font-medium block mb-2 text-slate-700'>
                 Reason
            </label>
            <textarea className='resize-none' name="reason" required placeholder='Briefly describe why you need this leave..' rows={3}></textarea>
          </div>

          {/* ----Buttons---- */}
          <div className='flex gap-3'>
            <button onClick={onClose} type='button' className='btn-secondary flex-1'>
              Cancel
            </button>

            <button disabled= {loading} type='submit' className='btn-primary flex-1 flex items-center justify-center gap-2'>
              {loading ? <Loader2Icon className='w-4 h-4 animate-spin'/> : <Send className='w-4 h-4'/>}
              {loading ? "Submitting..." : "Submit"}
              
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}

export default ApplyLeaveModal