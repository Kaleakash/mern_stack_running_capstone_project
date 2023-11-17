const express=require('express');
const router=express.Router();
const doctorController = require("../controller/doctorController");

router.post("/register",doctorController.register);
router.post('/login',doctorController.login);
router.get("/viewAllDoctors",doctorController.viewAllDoctor)
router.put("/changePassword",doctorController.changePassword);



module.exports=router;
