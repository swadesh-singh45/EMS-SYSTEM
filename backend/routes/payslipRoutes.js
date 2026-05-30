import { Router } from "express";
import { createPayslip, getPayslip, getPayslipById } from "../controllers/payslipController.js";
import { protect, protectAdmin } from "../middlewares/auth.js";

const payslipRouter = Router();

payslipRouter.post("/", protect, protectAdmin, createPayslip);
payslipRouter.get("/",protect, getPayslip);
payslipRouter.get("/:id",protect, getPayslipById);

export default payslipRouter;