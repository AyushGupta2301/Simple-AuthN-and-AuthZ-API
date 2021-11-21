$(function () {
    class User {
        constructor(uname, pwd, clearence) {
            this.naam = uname;
            this.guptrahasya = pwd;
            this.ijaazat = clearence;
            }
            static encryptpwMD4(){
                console.log('started');
                $.ajax('https://api.hashify.net/hash/md4/hex', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    data: this.guptrahasya,
                    success: (resp, status) => {
                        this.guptrahasya = resp.Digest;
                        alert(this.guptrahasya)
                    }
                })
            }
            static another(){
                alert(this);
            }
        }
    var user1 = new User('ayush', 'ayush2301', 'Level A');
    function encrypt(x) {
        $.ajax('https://api.hashify.net/hash/md4/hex', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            data: x.guptrahasya,
            success: (resp, status) => {
                x.guptrahasya = resp.Digest;
            }
        })
    }
    encrypt(user1);
})
