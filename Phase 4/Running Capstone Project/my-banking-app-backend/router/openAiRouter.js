const express=require('express');
const router=express.Router();
const openAiController = require("../controller/openAiController");

router.get("/info/:message",openAiController.findInformationUsingOpenAI);


module.exports=router;