$(function () {
    $("#entrysubmit").on("click", function () {
        $.ajax('https://api.hashify.net/hash/md4/hex', {
            method: "POST",
            headers: {
                'Content-Type': 'text/plain'
            },
            data: document.getElementsByName('pwd')[0].value,
            success: (resp, status) => {
                $.ajax('http://127.0.0.1:8080/sign_up', {
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
$("#exitsubmit").on("click", function () {
    $.ajax('http://127.0.0.1:8080/sign_in', {
        method: 'POST',
        data: JSON.stringify({
            'uname': document.getElementsByName('uname')[0].value,
            'pwd': document.getElementsByName('pwd')[0].value,
            'clearence': document.getElementsByName('clearence')[0].value
        }),
        headers: {
            'Content-Type': 'application/json'
        },
        success: function (resp, status) {
            console.log('Authentication Successful');
            switch (JSON.parse(resp).clearence) {
                case "Level A":
                    console.log('Providing access to Level A')
                    $.ajax('http://127.0.0.1:80/Folder_A', {
                        method: "GET",
                        success: function (resp, status) {
                            console.log('access to folder A successful');
                        }
                    })
                    break;
                case "Level B":
                    console.log('Providing access to Level B')
                    $.ajax('http://127.0.0.1:80/Folder_B', {
                        method: "GET",
                        success: function (resp, status) {
                            console.log('access to folder B successful');
                        }
                    })
                    break;
            }

        }
    })
})
})