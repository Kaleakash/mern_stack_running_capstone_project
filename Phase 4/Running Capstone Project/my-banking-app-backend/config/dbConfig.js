const mongoose = require('mongoose');
const loginModel = require("../model/adminModel");

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/bank_db',{useNewUrlParser: true});

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', async()=>{
    let admin = {"emailid":"admin@gmail.com","password":"admin@123","typeofuser":"admin"};
    let result = await loginModel.find({"email":"admin@gmail.com"});
    console.log(result);
    if(result.length==0){
        loginModel.insertMany(admin);
    }
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;
