import AddContentResourceService from '@/data/add-content-resource-service'
import { ContentResource } from '@/domain/entities'
import { pinoHelper } from '@/infra/logger/pino-helper'
import { HttpResponse } from '../helpers'
import { Validator } from '../validation'
import ValidatorBuilder from '../validation/validator-builder'
import { Controller } from './controller-base'

export class AddContentResourceController extends Controller {
  constructor (
    private readonly addContentResourceService: AddContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const inputContentResource = new ContentResource({
      name: httpRequest.params.name,
      description: httpRequest.params.description,
      type: httpRequest.params.type,
      published: httpRequest.params.published
    })
    pinoHelper.logInfo(inputContentResource, 'presentation>controllers', 'Raw object that will be sent to repository')
    const newContentResource = await this.addContentResourceService.perform(inputContentResource)
    return {
      statusCode: 200,
      data: newContentResource
    }
  }

  override buildValidators (httpRequest: any): Validator[] {
    return [
      ...ValidatorBuilder.of({ value: httpRequest.params.name, fieldName: 'name' }).required().build(),
      ...ValidatorBuilder.of({ value: httpRequest.params.description, fieldName: 'description' }).required().build(),
      ...ValidatorBuilder.of({ value: httpRequest.params.type, fieldName: 'type' }).required().contentResourceType().build(),
      ...ValidatorBuilder.of({ value: httpRequest.params.published, fieldName: 'published' }).publishedField().build()
    ]
  }
}
