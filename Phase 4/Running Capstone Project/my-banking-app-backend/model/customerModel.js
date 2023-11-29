const mongoose=require('mongoose'); 
mongoose.pluralize(false);
//Patient Schema      
const customerSchema=new mongoose.Schema({
    accno:{                                      
        type:Number,
        required:true,
        unique:true
    },
    amount:{                                   
        type:Number,
        required:true
    },
    cid:{                                      
        type:Number,
        required:true,
        unique:true
    },
    cname:{                                      
        type:String,
        required:true
    },
    emailid: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    typeofuser: {
        type:String,
        required:true
    },
    gender: {
        type:String,
        required:true
    },
    phonenumber: {
        type:String,
        required:true,
        unique:true
    },
    address: {
        type:String,
        required:true
    },
});

// exports customers 
const Customer=mongoose.model('Customer',customerSchema);
module.exports=Customer;