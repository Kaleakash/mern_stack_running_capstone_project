const Doctor = require('../model/doctorModel');


module.exports.viewAllDoctor = async function(req, res){
            let result = await Doctor.find({});
            return res.json(result)
}


module.exports.changePassword = async function(req, res){
    //Check if all field enter
    if(req.body.email==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    let Email = req.body.email;
    let doctorExists = await Doctor.findOne({email: Email});
    if(doctorExists){
            if(doctorExists.password == req.body.password){
                res.send("Old password and new password are same didn't update")
            }else {
                let result = await Doctor.updateMany({"email":req.body.email},{$set:{"password":req.body.password}})
                if(result.modifiedCount>0 || result.matchedCount>0){
                    res.send("Password changes successfuly!")
                }else {
                    res.send("Didn' update password")
                }
            }
    }else {
        res.send("EmailId is wrong!");  
    }     
}



//Create/Register the doctor in db by using name,email and password
module.exports.register = async function(req, res){

    //Check if all field enter
    if(req.body.email==undefined || req.body.name==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
        });
    }
    
    //Check if the doctor is already registered in db
    let Email = req.body.email;
    let doctorExists = await Doctor.findOne({email: Email});
    if(doctorExists){
        doctorExists = await doctorExists.toObject();
        
        delete doctorExists.password;
        return res.status(405).json({
            data:{
                doctor: doctorExists
                
            },
            message: 'Doctor already registered'
        });
    }
            
    try{
        let createdDoctor = await (await Doctor.create(req.body)).toObject();
        
        if(createdDoctor){
            delete createdDoctor.password;
            return res.status(200).json({
                data: {
                    doctor:createdDoctor
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
            message: 'OOPS!! Error'
        });
    }
}


//Login for Doctor using email and password
module.exports.login = async function(req, res){
    
    if(req.body.email==undefined || req.body.password==undefined){
        return res.status(206).json({
            message: 'Incomplete data provided'
            });
        }

    try{
        let doctor = await Doctor.findOne({email:req.body.email});
        if(doctor){
            let pass = req.body.password;
            let pwdDb = doctor.password;
            if(pass==pwdDb){
                return res.status(200).json({
                    data:{
                        messsage:"Successfully login"
                    }
                })
            }
        }
        return res.status(401).json({
            message:'Invalid Email/Password'
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}