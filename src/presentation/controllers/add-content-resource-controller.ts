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
    console.log('[CHANGE FOR LOG][CONTROLLER][HTTPREQUEST][BODY]: ', httpRequest)
    const newContentResource = new ContentResource({
      published: httpRequest.params.published,
      name: httpRequest.params.name,
      description: httpRequest.params.description,
      type: httpRequest.params.type
    })
    console.log('[CHANGE FOR LOG][CONTROLLER][HTTPREQUEST]: ', newContentResource)
    await this.addContentResourceService.perform(newContentResource)
    return {
      statusCode: 200,
      data: newContentResource
    }
  }
}
