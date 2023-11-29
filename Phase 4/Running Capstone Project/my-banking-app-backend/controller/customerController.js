let customerModel = require("../model/customerModel");

module.exports.changePassword = async function(req, res){

    let customer = await customerModel.findOne({_id:req.body._id});
    if(customer){
    
        if(customer.password==req.body.password){
        
            return res.status(200).json({
                message: "Password didn't update new password and old password are same"
            });

             }else {
                console.log(req.body._id+" "+customer.password);
    let result = await customerModel.updateOne({_id:req.body._id},{$set:{password:req.body.password}})
                    console.log(result);
                    return res.status(200).json({
                        data:customer,
                        message: "Password change successfully"
                    });
            }
     

    }else {
       
        return res.status(200).json({
            message: "Record not present"
        });

    }
}

module.exports.findCustomer = async function(req, res){
        let cid = req.param.cid;
        let customer = await customerModel.findOne({cid:cid});
        if(customer){
            return res.status(200).json({
                data:customer,
                message: 'Customer present'
            });
        }else {
            return res.status(405).json({
                message: 'Customer not present'
            });
        }
}

//Create/Register the customer in db by using name,email and password
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.accno==undefined || req.body.amount==undefined || req.body.cid==undefined
        || req.body.cname==undefined || req.body.emailid==undefined || req.body.password==undefined
        ||req.body.typeofuser==undefined || req.body.gender==undefined || req.body.phonenumber==undefined
        || req.body.address==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    console.log(req.body)
    //Check if the customer is already registered in db
    let Email = req.body.emailid;
    let customerExists = await customerModel.findOne({emailid: Email});
    if(customerExists){
        customerExists = await customerExists.toObject();
        
        //delete doctorExists.password;
        return res.status(405).json({
            data:{
                customer: customerExists        
            },
            message: 'Customer already registered'
        });
    }
    console.log(customerExists)        
    try{
        let createdCustomer = await (await customerModel.create(req.body)).toObject();
        
        if(createdCustomer){
            //delete createdDoctor.password;
            return res.status(200).json({
                data: {
                    customer:createdCustomer
                },
                message: 'Successfully registered'
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

module.exports.viewAllCustomer = async function(req, res){
    let result = await customerModel.find({});
    return res.json(result)
}


module.exports.depositeAmount = async function(req, res){
   
    let foundCustomer = await customerModel.updateOne({cid:req.body.cid},{$set:{amount:eval(req.body.amount)}});
    if(foundCustomer){        
        return res.status(200).json({
                message:"Amount Deposited successfully"
        });

    }else {
        return res.status(200).json({
            message: 'customer not exits'
        });
    }
   
}

module.exports.withdrawAmount = async function(req, res){
   
    let foundCustomer = await customerModel.updateOne({cid:req.body.cid},{$set:{amount:eval(req.body.amount)}});
    if(foundCustomer){        
        return res.status(200).json({
                message:"Amount withdrawn successfully"
        });

    }else {
        return res.status(200).json({
            message: 'customer not exits'
        });
    }
   }

