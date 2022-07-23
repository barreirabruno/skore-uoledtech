import amqplib, { Channel } from 'amqplib'

export default class RabbitMQRepo {
  queueName: string = 'service_a_logs'

  private async setupConnection (): Promise<Channel> {
    const connection = await amqplib.connect('amqp://guest:guest@rmqskoreio:5672')
    const queueName = this.queueName
    const channel1 = await connection.createChannel()
    await channel1.assertQueue(queueName)
    return channel1
  }

  async sender (message: string): Promise<void> {
    const channel = await this.setupConnection()
    await channel.sendToQueue(this.queueName, Buffer.from(message))
    await channel.close()
  }
}
