const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(channel => {
        return channel.assertQueue('articles')
            .then(ok => channel.sendToQueue('articles', new Buffer('test!')))
    })
    .catch(console.warn)