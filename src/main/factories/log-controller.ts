import RabbitMQRepo from '@/infra/queue/rabbitmq/rabbitmq-repo'
import { Controller } from '@/presentation/controllers'
import LogControllerDecorator from '../decorators/log-controller-decorator'

export const makeLogController = (controller: Controller): Controller => {
  const logRabbitMQ = new RabbitMQRepo()
  return new LogControllerDecorator(controller, logRabbitMQ)
}
