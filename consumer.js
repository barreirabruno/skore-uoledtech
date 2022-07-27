const amqplib = require('amqplib');

(async () => {
  const queue = 'service_a_logs'
  const conn = await amqplib.connect('amqp://guest:guest@localhost:5672')

  const ch1 = await conn.createChannel()
  await ch1.assertQueue(queue)

  // Listener
  ch1.consume(queue, (msg) => {
    if (msg !== null) {
      console.log('[RECEIVED]:', msg.content.toString())
      ch1.ack(msg)
    } else {
      console.log('Consumer cancelled by server')
    }
  })
})()
