const express=require('express');
const router=express.Router();
const patientController = require("../controller/patientController");

router.post("/register",patientController.register);
router.post("/:id/createReport",patientController.createReport);
router.get("/:id/viewPatientReports",patientController.viewPatientReports);

module.exports=router;
