loginDetails=[
    {"emailid":"admin@gmail.com","password":"admin@123","typeofuser":"admin"},
    {"emailid":"raj@gmail.com","password":"abc@123","typeofuser":"customer"},
    {"emailid":"ajay@gmail.com","password":"xyz@123","typeofuser":"customer"},
    {"emailid":"reeta@gmail.com","password":"mno@123","typeofuser":"customer"},
    {"emailid":"meeta@gmail.com","password":"123@123","typeofuser":"customer"}
]

function validate() {
    let emailid = document.getElementById("emailid").value;
    let password = document.getElementById("password").value;
    let adminUser = document.getElementById("admin");
    let customerUser = document.getElementById("customer");
    if(emailid.length==0){
        alert("emaild id is required")
    }else if(password.length==0){
        alert("password is  required")
    }else if(!adminUser.checked && !customerUser.checked){
        alert("plz select type of user")
    }else {
        
        if(adminUser.checked){
            let result = loginDetails.find(ld=>ld.emailid==emailid && ld.password==password);
            if(result==undefined){
                    alert("emailid or passwor wrong")
            } else {
                location.href="adminHome.html"; 
            }
            
        }else {
            let result = loginDetails.find(ld=>ld.emailid==emailid && ld.password==password);
            if(result==undefined){
                    alert("emailid or passwor wrong")
            } else {
                sessionStorage.setItem("user",result.emailid);
                location.href="customerHome.html"; 
            }

        }   
    }    
}