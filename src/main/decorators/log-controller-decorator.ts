import RabbitMQRepo from '@/infra/queue/rabbitmq/rabbitmq-repo'
import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '@/presentation/helpers'

export default class LogControllerDecorator extends Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: RabbitMQRepo
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    console.log('[DECORATOR]', httpRequest)
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.sender(httpResponse.data.stack)
    }
    return httpResponse
  }
}
