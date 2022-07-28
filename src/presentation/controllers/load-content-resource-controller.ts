import LoadContentResourceService from '@/data/load-content-resource-service'
import { HttpResponse, noContent, success } from '../helpers'
import { Controller } from './controller-base'

export default class LoadContentResourceController extends Controller {
  constructor (
    private readonly loadContentResourceService: LoadContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const loadContentResource = await this.loadContentResourceService.perform(httpRequest.params)
    if (loadContentResource === null) {
      return noContent(null)
    }
    return success(loadContentResource)
  }
}
