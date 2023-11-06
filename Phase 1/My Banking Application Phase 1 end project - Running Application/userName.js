let userInfo = sessionStorage.getItem("user");
if(userInfo!=null){
    document.getElementById("user").innerHTML = userInfo.substring(0,userInfo.indexOf('@'));
}
