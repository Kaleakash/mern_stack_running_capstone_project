let transactionModel = require("../model/transactionsModel");


//Create/Register the customer in db by using name,email and password
module.exports.storeTransaction = async function(req, res){

    //Check if all field enter
    // if(req.body.accno==undefined || req.body.amount==undefined || req.body.cid==undefined
    //     || req.body.cname==undefined || req.body.emailid==undefined || req.body.password==undefined
    //     ||req.body.typeofuser==undefined || req.body.gender==undefined || req.body.phonenumber==undefined
    //     || req.body.address==undefined){
    //     return res.status(206).json({
    //         message: 'Incomplete data provided'
    //     });
    // }
    console.log(req.body)
 //   res.send("done");
    //Check if the customer is already registered in db
    // let Email = req.body.emailid;
    // let customerExists = await customerModel.findOne({emailid: Email});
    // if(customerExists){
    //     customerExists = await customerExists.toObject();
        
    //     //delete doctorExists.password;
    //     return res.status(405).json({
    //         data:{
    //             customer: customerExists        
    //         },
    //         message: 'Customer already registered'
    //     });
    // }
    // console.log(customerExists)        
    try{
        let transaction = await (await transactionModel.create(req.body)).toObject();
        
        if(transaction){
            //delete createdDoctor.password;
            return res.status(200).json({
                message: 'Transaction details stored successfully'
            });
        }
        else{
            return res.status(500).json({
                message: 'OOPS!! Error'
            });
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! Error'+err
        });
    }
}


module.exports.findAllTransaction = async function(req, res){
    let allTransaction = await transactionModel.find({})
    return res.json(allTransaction);
}