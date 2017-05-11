const amqp = require('amqplib');

amqp.connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(channel => {
        return channel.assertQueue('articles')
        .then(channel.consume('articles', (msg)=>{
            if(msg !== null){
                console.log(msg.content.toString()); 
                channel.ack(msg)
            }
        }))
    })
    .catch(console.warn);