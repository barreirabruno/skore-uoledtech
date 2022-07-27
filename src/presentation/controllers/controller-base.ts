import { pinoHelper } from '@/infra/logger/pino-helper'
import { badRequest, HttpResponse, serverError } from '../helpers'
import ValidationComposite from '../validation/validation-composite'
import { Validator } from '../validation/validator'

export abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  buildValidators (httpRequest: any): Validator[] {
    return []
  }

  async handle (httpRequest: any): Promise<HttpResponse> {
    const error = this.validate(httpRequest)
    if (error !== undefined) {
      return badRequest(error)
    }
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      pinoHelper.logError(error, 'Error on controller execution')
      return serverError(error as Error)
    }
  }

  private validate (httpRequest: any): Error | undefined {
    const validators = this.buildValidators(httpRequest)
    return new ValidationComposite(validators).validate()
  }
}
