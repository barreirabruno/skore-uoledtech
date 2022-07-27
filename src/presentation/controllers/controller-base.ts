import { pinoHelper } from '@/infra/logger/pino-helper'
import { HttpResponse, serverError } from '../helpers'
import { Validator } from '../validation/validator'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      pinoHelper.logError(error, 'Error on controller execution')
      return serverError(error as Error)
    }
  }
}
