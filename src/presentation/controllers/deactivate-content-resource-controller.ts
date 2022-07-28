import DeactivateContentResourceService from '@/data/deactivate-content-resource-service'
import { pinoHelper } from '@/infra/logger/pino-helper'
import { HttpResponse } from '../helpers'
import { Validator } from '../validation'
import ValidatorBuilder from '../validation/validator-builder'
import { Controller } from './controller-base'

export class DeactivateContentResourceController extends Controller {
  constructor (
    private readonly deactivateContentResourceService: DeactivateContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    pinoHelper.logInfo(httpRequest, 'presentation>controllers>deactivate-controller-resource', 'Raw object that will be sent to repository')
    const inputContentResource = { id: httpRequest.params.id }
    const newContentResource = await this.deactivateContentResourceService.perform(inputContentResource)
    return {
      statusCode: 204,
      data: newContentResource
    }
  }

  override buildValidators (httpRequest: any): Validator[] {
    return [
      ...ValidatorBuilder.of({ value: httpRequest.params.id, fieldName: 'id' }).required().build()
    ]
  }
}
