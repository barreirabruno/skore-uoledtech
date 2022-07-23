import AddContentResourceService from '@/data/add-content-resource-service'
import { ContentResource } from '@/domain/entities'
import { HttpResponse } from '../helpers'
import { Controller } from './controller-base'

export class AddContentResourceController extends Controller {
  constructor (
    private readonly addContentResourceService: AddContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const inputContentResource = new ContentResource({
      published: httpRequest.params.published,
      name: httpRequest.params.name,
      description: httpRequest.params.description,
      type: httpRequest.params.type
    })
    const newContentResource = await this.addContentResourceService.perform(inputContentResource)
    return {
      statusCode: 200,
      data: newContentResource
    }
  }
}
