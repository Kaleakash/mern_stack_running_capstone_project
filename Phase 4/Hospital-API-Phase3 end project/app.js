const express=require('express'); 
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const doctorRouter = require("./router/doctorRouter");
const patientRouter = require("./router/patientRouter");
const reportRouter = require("./router/reportRouter");

const db = require("./config/dbConfig");

//middleware 
app.use(bodyParser.json());
app.use(bodyParser.json({ type:"application/json" }));


// router middleware 
app.use("/api/doctor",doctorRouter);
app.use("/api/patient",patientRouter);
app.use("/api/reports",reportRouter);

app.listen(port,()=>console.log(`Server running on port ${port} number`));

