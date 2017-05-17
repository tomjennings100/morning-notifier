const amqp = require('amqplib');

module.exports.send = (queue, message) => {
    return new Promise((resolve, reject) => {
    amqp.connect('amqp://localhost')
        .then(conn => conn.createChannel())
        .then(channel => {
            return channel.assertQueue(queue)
                .then(ok => {
                    channel.sendToQueue(queue, new Buffer(message))
                    resolve(ok)
                })
        })
        .catch(reject)
    })
}