const connection = require('../../config/rabbitmq'); 
const rabbot = require('rabbot'); 

function connect(cb){
  rabbot
    .configure({ connection })
    .then(cb)
    .catch(function(err){
      setImmediate(function(){ throw err; });
    });
}

module.exports = connect; 