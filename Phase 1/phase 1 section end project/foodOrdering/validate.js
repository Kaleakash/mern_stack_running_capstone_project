function validate() {
    let emailid = document.getElementById("adminEmailId").value;
    let password = document.getElementById("adminPassword").value;
    if(emailid=="admin@gmail.com" && password=="admin@123"){
        alert("successfully login!")
        return true;
    }else {
        alert("failure try once again")
        return false;
    }
}