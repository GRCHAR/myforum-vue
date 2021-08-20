const stun = require('stun');

stun.request('127.0.0.1', (err, res) => {
    if(err){
        console.log(err);
    } else {
        console.log(res)
    }

})