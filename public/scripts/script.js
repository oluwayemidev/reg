function togglePassKey(){
    var passkey = document.getElementById("passkey");
    var eye = document.getElementById("eye");

    if(passkey.type == "text"){
        document.getElementById("passkey").type = "password";
        document.getElementById("eye").src = "../images/invisibleeye.png";
    }else{
        document.getElementById("passkey").type = "text";
        document.getElementById("eye").src = "../images/visibleeye.png";
    }
}

function toggleConfirmKey(){
    var passkey = document.getElementById("confirmkey");
    var eye = document.getElementById("eye2");

    if(passkey.type == "text"){
        document.getElementById("confirmkey").type = "password";
        document.getElementById("eye2").src = "../images/invisibleeye.png";
    }else{
        document.getElementById("confirmkey").type = "text";
        document.getElementById("eye2").src = "../images/visibleeye.png";
    }
}