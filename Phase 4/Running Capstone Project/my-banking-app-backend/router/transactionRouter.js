const express=require('express');
const router=express.Router();
const transactionController = require("../controller/transactionController");

router.post("/storeTransaction",transactionController.storeTransaction);
router.get("/findAllTransaction",transactionController.findAllTransaction);
module.exports=router;