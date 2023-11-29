let adminModel = require("../model/adminModel");


module.exports.changePassword = async function(req, res){

    let admin = await adminModel.findOne({_id:req.body._id});
    if(admin){
    
        if(admin.password==req.body.password){
        
            return res.status(200).json({
                message: "Password didn't update new password and old password are same"
            });

             }else {
    let result = await adminModel.updateOne({_id:req.body._id},{$set:{password:req.body.password}})
                    console.log(result);
                    return res.status(200).json({
                        data:admin,
                        message: "Password change successfully"
                    });
            }
     

    }else {
       
        return res.status(200).json({
            message: "Record not present"
        });

    }
}

//Login for Doctor using email and password
module.exports.login = async function(req, res){
    console.log("I came here")
    if(req.body.emailid==undefined || req.body.password==undefined || req.body.typeofuser==undefined){
        return res.status(201).json({
            message:"Incomplete data provided"
            });
        }
         

    try{
        let admin = await adminModel.findOne({emailid:req.body.emailid});
        console.log(admin);
        if(admin){
            let pass = req.body.password;
            let pwdDb = admin.password;
            if(pass==pwdDb){
                return res.status(200).json({
                    message:"Succesfully login!",
                    data:admin
                    });
            }
        }
        return res.status(201).json({
            message:"Invalid emailid/password"
            });
          
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}