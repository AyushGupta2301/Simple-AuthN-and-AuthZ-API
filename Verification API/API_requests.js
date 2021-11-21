$(function () {
    $("#signupsubmit").on("click", function () {
        $.ajax('https://api.hashify.net/hash/md4/hex', {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            data: document.getElementsByName('pwd')[0].value,
            success: (resp, status) => {
                $.ajax('http://192.168.1.5:8081/sign_up', {
                    method: 'POST',
                    data: JSON.stringify({
                        'uname': document.getElementsByName('uname')[0].value,
                        'pwd': resp.Digest,
                        'clearence': document.getElementsByName('clearence')[0].value
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    success: function (resp, status) {
                        alert("User " + JSON.parse(resp).uname + " registered");
                    }
                })
            }
        })
    })

    $('#signinsubmit').on("click", function () {
        $.ajax('https://api.hashify.net/hash/md4/hex', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: document.getElementsByName('pwd')[0].value,
            success: (resp, status) => {
                $.ajax('http://192.168.1.5:8081/sign_in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: JSON.stringify({
                        'uname': document.getElementsByName('uname')[0].value,
                        'pwd': resp.Digest
                    }),
                    success: function (resp, status) {
                        alert(resp);
                        let token = resp;
                        localStorage.setItem("onesignintoken", token);
                        document.write("<h3>User authorized, token saved, One-SignIn enabled on partner Sites</h3> List of Partner Sites: <ul><li><a href='../Sample\ Site\ B'>Site B</a></li><li><a href='../Sample\ Site\ C'>Site C</a></li></ul>");
                    },
                    statusCode : {
                        401 : function(resp,status){
                            alert('User Not Found in One-SignIn Database -- UNAUTHORIZED');
                        }
                    }
                })
            }
        })

    })
})