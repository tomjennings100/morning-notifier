const queue = require('./lib/queue'); 

queue.send('articles', 'does this work')
    .then(res=>console.log(res))