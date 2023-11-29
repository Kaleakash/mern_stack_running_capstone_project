const express=require('express'); 
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
const adminRouter = require("./router/adminRouter");
const customerRouter = require("./router/cutomerRouter");
const transactionRouter = require("./router/transactionRouter");
const openAiRouter = require("./router/openAiRouter");

const db = require("./config/dbConfig");

//middleware 
app.use(bodyParser.json());
app.use(bodyParser.json({ type:"application/json" }));
app.use(cors());
// app.get("/",(request,response)=> {
//     response.send("Test the App")
// })
// router middleware 
app.use("/api/admin",adminRouter);
app.use("/api/customer",customerRouter);
app.use("/api/transaction",transactionRouter);
app.use("/api/openai",openAiRouter);
app.listen(port,()=>console.log(`Server running on port ${port} number`));

