import "dotenv/config";
import connectDB from "./confiq/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt';

const TemporaryPassword = "admin123";

async function registerAdmin() {
  try {
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

    if(!ADMIN_EMAIL) {
      console.log("Missing ADMIN_EMAIL env Variable");
      process.exit(1);
    }
    await connectDB()

    const existingAdmin = await User.findOne({email: process.env.ADMIN_EMAIL});
    if(existingAdmin){
      console.log("User already exits as role", existingAdmin.role);
      process.exit(0);
    }
    const hashedPassword = await bcrypt.hash(TemporaryPassword,10)
    const admin = await User.create({
      email: process.env.ADMIN_EMAIL,
      password: hashedPassword,
      role: "ADMIN",
    })
    console.log("Admin User created");
    console.log("\nemail:", admin.email);
    console.log("TemporaryPassword:", TemporaryPassword);
    console.log("\nchange the password after login");

    process.exit(0)
    
  } catch (error) {
    console.log("Seed failed", error)
    
  }
  
}

registerAdmin();