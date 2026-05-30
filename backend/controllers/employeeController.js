import bcrypt from "bcrypt";
import Employee from "../models/Employee.js";
import User from "../models/User.js";

// get EMPLOYEE 
// GET /api/employees

export const getEmployees = async (req, res) =>{

  try {
    const { department } = req.query;
    const where = {};
    if(department) where.departments = department;

    const employees = await Employee.find(where).sort({createdAt: -1}).populate("userId", "email role").lean();

    const result = employees.map((emp)=>({
      ...emp,
      id: emp._id.toString(),
      user : emp.userId ? {email : emp.userId.email, role: emp.userId.role} : null
    }))
    return res.json(result)
  } catch (error) {
         return res.status(500).json({error: "Failed to fetch employees"});
    
  }

}

// create EMPLOYEE 
// POST /api/employees

export const createEmployee = async (req, res) =>{

  try {
    const {firstName, lastName, email, phone, position, basicSalary, allowances, deductions, joinDate, bio, password, role, departments} = req.body;

    if(!password || !email || !firstName || !lastName) {
      res.status(400).json({error: "Missing required field"});
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await  User.create({
      email : email,
      password : hashed,
      role: role || "EMPLOYEE"
    })

    const employee = await Employee.create({
      userId: user._id,
      firstName,
      lastName,
      email,
      phone,
      position,
      departments: departments || "Engineering",
      basicSalary : Number(basicSalary) || 0,
      allowances: Number(allowances) || 0 ,
      deductions: Number(deductions) || 0,
      joinDate: new Date(joinDate),
      bio: bio || "",
    })
    return res.status(201).json({success:true,employee})
    
  } catch (error) {
       if(error.code === 11000) {
         return res.status(400).json({error: "Email already exists"})
       }
       console.log("Create employee error:", error)
       return res.status(500).json({error: "Failed to create employee"});
  }
}

// Update EMPLOYEE 
// PUT /api/employees/:id

export const updateEmployee = async (req, res) =>{

  try {

    const {id} = req.params;
    const {firstName, lastName, email, phone, position, basicSalary, allowances, deductions, bio, password, role, department, employeeStatus} = req.body;

    // check employee exists
    const employee = await Employee.findById(id);
    if(!employee) {
      return res.status(404).json({error:"Employee not found"})
    }

    // update employee
    await Employee.findByIdAndUpdate(id, {
      firstName,
      lastName,
      email,
      phone,
      position,
      department: department || "Engineering",
      basicSalary : Number(basicSalary) || 0,
      allowances: Number(allowances) || 0 ,
      deductions: Number(deductions) || 0,
      employeeStatus : employeeStatus || "ACTIVE",
      bio: bio || "",

    })
    // update User record;
    const userUpdate = {email}
    if(role) userUpdate.role = role;
    if(password) userUpdate.password = await bcrypt.hash(password,10);
    await User.findByIdAndUpdate(employee.userId, userUpdate)

    return res.json({success: true});

  } catch (error) {
   if(error.code === 11000) {
         return res.status(400).json({error: "Email already exists"})
       }
       return res.status(500).json({error: "Failed to update employee"});
  }
}

// delete employees
// DELETE /api/employees/:id

export const deleteEmployee = async (req,res) =>{
  try {
     const { id } = req.params;

      const employee =  await Employee.findById(id);
      if(!employee) return res.status(404).json({error: "Employee not found"});
      employee.isDeleted = true;
      employee.employeeStatus = "INACTIVE";
      await employee.save()
      res.json({success: true});
  } catch (error) {
       return res.status(500).json({error: "Failed to delete employee"});
  }
}



















































