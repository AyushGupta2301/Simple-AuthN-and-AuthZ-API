$(function(){
    $('#prompt').on("click",function(){
        let enctoken = localStorage.getItem("onesignintoken");
        if(!(enctoken)){
            alert("no token found");
        }
        let dectoken = CryptoJS.AES.decrypt(enctoken,"ayushsecret");
        let strtoken = dectoken.toString(CryptoJS.enc.Utf8);
        let tokenobj = JSON.parse(strtoken);
        alert('decrypted token text : ' + strtoken);
        switch(tokenobj.clearence){
            case "Level A":
                document.write("<h1>Site B Folder A here</h1>")
                break;
            case "Level B":
                document.write("<h1>Site B Folder B here</h1>")
                break;
        }
    })
})