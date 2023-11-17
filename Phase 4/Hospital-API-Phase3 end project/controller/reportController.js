const Report = require('../model/reportModel');
const Status = require('../config/status');

//get/fetch all reports by using status
module.exports.fetchReports = async function(req, res){
    let status = Status[req.params.status];
    if(status==undefined){
        return res.status(404).json({
            message:'Error'
        });
    }

    try{
        let reportstatus = await Report.find({status: status}).sort("createdAt").populate('patient doctor');
            if(reportstatus.length==0){
                return res.status(200).json({
                    message: 'There is not reposrt available with status '+status
                });
            }else {
                return res.status(200).json({
                    message: 'All report of this status',
                    data: {reportstatus},
                   
                });
            }
            
        }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! Error'
        });
    }
}
// fetch all reports 
module.exports.fetchAllReports = async function(req, res){
        try{
        let reports = await Report.find({});
            console.log(reports)
            return res.status(200).json({
               
                message: 'All report of Details',
                data: {reports},
            });
        }
    catch(err){
        return res.status(500).json({
            message: 'OOPS!! Error'+err
        });
    }
}