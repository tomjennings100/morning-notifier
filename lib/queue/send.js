const util = require('util');
var Rabbus = require('rabbus');
const rabbot = require('rabbot');
var connection = require("./connection");

// define a sender
// ---------------

function SomeSender() {
  Rabbus.Sender.call(this, rabbot, {
    exchange: "send-rec.exchange",
    routingKey: "send-rec.key"
  });
}

util.inherits(SomeSender, Rabbus.Sender);

module.exports = (message) => {
  return new Promise((resolve, reject) => {
    connection(function () {
      var sender = new SomeSender();
      // basic error handler
      //@TODO - application wide error handling. 
      sender.use(function (err, message, props, actions, next) {
        return reject(err);
      });


      // send the message
      sender.send(message, function () {
        return resolve();
      });
    });
  })
}
