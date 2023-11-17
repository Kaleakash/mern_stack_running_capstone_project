const express=require('express');
const router=express.Router();
const reportController = require("../controller/reportController");

router.get("/fetchAllReports",reportController.fetchAllReports);
router.get('/:status/status',reportController.fetchReports);


module.exports=router;
