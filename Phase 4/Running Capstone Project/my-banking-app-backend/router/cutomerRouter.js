const express=require('express');
const router=express.Router();
const customerController = require("../controller/customerController");

router.post("/register",customerController.register);
router.get("/viewAllCustomer",customerController.viewAllCustomer);
router.put("/depositAmount",customerController.depositeAmount)
router.put("/withdrawAmount",customerController.withdrawAmount)
router.get("/findCustomer/:cid",customerController.findCustomer);
router.put("/changePassword",customerController.changePassword);

module.exports=router;