const mongoose=require('mongoose'); 
mongoose.pluralize(false);
//Patient Schema      
const adminSchema=new mongoose.Schema({
    emailid:{                                      
        type:String,
        required:true,
        unique:true
    },
    password:{                                   
        type:String,
        required:true
    },
    typeofuser:{                                  
        type:String,
        required:true
    }
});

// exports admin
const Admin=mongoose.model('Admin',adminSchema);
module.exports=Admin;