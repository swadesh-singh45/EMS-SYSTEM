import React, { useCallback, useEffect, useState } from 'react' 
import { dummyEmployeeData, DEPARTMENTS } from '../assets/assets';
import { Plus, Search, SearchIcon, X } from 'lucide-react';
import Loader from '../components/Loader';
import EmployeesCard from '../components/EmployeesCard';
import EmployeeForm from '../components/EmployeeForm';
import api from '../api/axios';

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(""); 
  const [selectedDept, setSelectedDept] = useState("")
  const [editEmployee, setEditEmployee] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const fetchEmployees = useCallback(async ()=>{
     try {
      const url = selectedDept? `/employees?department=${selectedDept}` : "/employees";
      const res = await api.get(url)
      setEmployees(res.data)

     } catch (error) {
        console.error("Failed to fetch employees", error);
     } finally {
      setLoading(false)
     }
  },[selectedDept])

  useEffect(()=>{
    fetchEmployees();

  },[fetchEmployees])

  const filter1 = employees.filter((emp)=> `${emp.firstName} ${emp.lastName} ${emp.position}`.toLowerCase().includes(search.toLowerCase()))
  return (
    <div className='animate-fade-in'>

      {/* -----Header------*/}
      <div className='flex flex-col justify-between sm:flex-row items-start sm:items-center gap-4 mb-8'> 
        <div> 
          <h1 className='page-title'>Employees</h1>
           <p className='page-subtitle'>Manage your team members</p>
        </div>
        <button onClick={()=>setShowCreateModal(true)} className='btn-primary flex items-center w-full gap-2 justify-center sm:w-auto'>
           <Plus size={16}/>Add Employee
        </button>
      </div>

      {/* -----SearchBar----- */}
      <div className='flex flex-col sm:flex-row gap-3 mb-6'>
         <div className='relative flex-1'>
           <Search className='absolute left-3.5 top-1/2 w-4 h-4 transform -translate-y-1/2 text-slate-400 '/>
            <input placeholder='Search employees...' className='w-full pl-10!' onChange={(e)=>setSearch(e.target.value)} value={search}/>
          </div>

          <select value={selectedDept} onChange={(e)=>setSelectedDept(e.target.value)} className='max-w-40 h-10'>
            <option value="">All Departments</option>
            {
              DEPARTMENTS.map((deptName)=>(
                 <option key={deptName} value={deptName}>{deptName}</option> ))
            }

          </select>
      </div>

      {/* -----Employee Cards */}

      {loading ?(
        <div className='flex justify-center p-12'>
          <div>
            <Loader/>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5'>
          {filter1.length === 0 ? (
            <p className='col-span-full text-center py-16 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200'>No employees found</p>
          ): (
            filter1.map((emp)=><EmployeesCard key={emp.id} employee={emp} onDelete={fetchEmployees} onEdit={(e)=>setEditEmployee(e)}/>)
          )}

        </div>
      )}

     {/* Create Employee Modal */}
     {showCreateModal && (
      <div className='fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto' onClick={()=> setShowCreateModal(false)}>
        <div className='fixed inset-0'/>
          <div className='relative bg-white rounded-2xl shadow-2xl w-full animate-fade-in my-8 max-w-3xl' onClick={(e)=> e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
              <div>
                <h3 className='text-lg font-semibold text-slate-900'>Add New Employee</h3>
                <p className='text-sm text-slate-500 mt-0.5'>Create a user account and employee profile</p>
              </div>
              <button onClick={()=>setShowCreateModal(false)} className='p-2 rounded-lg hover:bg-slate-300 transition-colors text-slate-400 hover:text-slate-600 '>
                <X className='w-4 h-4'/>
              </button>
            </div>

            <div className='p-6'>
              <EmployeeForm 
                onSuccess={()=>{
                  setShowCreateModal(false);
                  fetchEmployees()
                }} onCancel={()=>setShowCreateModal(false)}
                />
            </div>
          </div>
      </div>
     )}

     {/* Edit Employee Modal */}

     {editEmployee && (
      <div className='fixed bg-black/40 backdrop-blur-sm inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto' onClick={()=> setEditEmployee(null)}>
        <div className='fixed inset-0'/>
          <div className='relative bg-white rounded-2xl shadow-2xl w-full animate-fade-in my-8 max-w-3xl' onClick={(e)=> e.stopPropagation()}>
            <div className='flex items-center justify-between p-6 pb-0'>
              <div>
                <h3 className='text-lg font-semibold text-slate-900'>Edit Employee</h3>
                <p className='text-sm text-slate-500 mt-0.5'>Update employee details</p>
              </div>
              <button onClick={()=>setEditEmployee(null)} className='p-2 rounded-lg hover:bg-slate-300 transition-colors text-slate-400 hover:text-slate-600 '>
                <X className='w-4 h-4'/>
              </button>
            </div>

            <div className='p-6'>
               <EmployeeForm initialData={editEmployee}
                onSuccess={()=>{
                  setEditEmployee(null);
                  fetchEmployees()
                }} onCancel={()=>setEditEmployee(null)}
                />
            </div>
          </div>
      </div>
     )}


    </div>
  )
}

export default Employees 