$(function(){
    $('#signinsubmit').on("click",function(){
        $.ajax('http://192.168.1.5:8081/sign_in',{
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : JSON.stringify({
                'uname' : document.getElementsByName('uname')[0].value,
                'pwd' : document.getElementsByName('pwd')[0].value
            }),
            success : function(resp,status){
                var token = JSON.parse(resp).token;
                localStorage.setItem("onesignintoken",token);
                document.write("<h3>User authorized, token saved, One-SignIn enabled on partner Sites</h3> List of Partner Sites: <ul><li><a href='../Sample\ Site\ B>Site B</a></li><li><a href='../Sample\ Site\ C>Site C</a></li>,/ul>");
            },
            statusCode : {
                401 : function(resp,status){
                    alert('Unauthorized');
                }
            }
        })
    })
})