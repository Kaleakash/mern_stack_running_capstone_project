const mongoose=require('mongoose'); 
mongoose.pluralize(false);
//Patient Schema      
const transactionSchema=new mongoose.Schema({
    amount:{                                      
        type:Number,
        required:true
    },
    typeoftransaction:{                                   
        type:String ,
        required:true
    },
    transferTo: {
        type:Number,
        required:true
    },
    cid: {
        type:Number,
        required:true,
    },
    cname: {
        type:String,
        required:true,
    },
    cid: {
        type:String,
        required:true,
    },
    accno: {
        type:Number,
        required:true
    },
    dot: {
        type:Date,
        require:true
    }
    // customer:[{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'customer',
    // }]
    // ,
    // dot:{
    //     timestamps:true                             //store timestamps
    // }
},
// dot:{
//     timestamps:true                             //store timestamps
// }

);

// exports Transaction
const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;