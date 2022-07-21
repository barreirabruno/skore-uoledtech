import AddContentResourceService from '@/data/add-content-resource-service'
import { ContentResource } from '@/domain/entities'
import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '../helpers'

import { mock, MockProxy } from 'jest-mock-extended'

class AddContentResourceController extends Controller {
  constructor (
    private readonly addContentResourceService: AddContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const newContentResource = new ContentResource({
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })
    await this.addContentResourceService.perform(newContentResource)
    return {
      statusCode: 200,
      data: newContentResource
    }
  }
}

describe('Add Content Resource Controller', () => {
  let contentResourceRepository: MockProxy<AddContentResourceService>
  let sut: AddContentResourceController

  const inputParams = {
    name: 'any_content_resource_input_name',
    published: 1,
    description: 'any_content_resource_input_description',
    type: 'pdf'
  }

  beforeAll(() => {
    contentResourceRepository = mock()
  })

  beforeEach(() => {
    sut = new AddContentResourceController(contentResourceRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if perform method succeeds', async () => {
    const httpResponse = await sut.handle(inputParams)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        name: 'any_content_resource_input_name',
        published: 1,
        description: 'any_content_resource_input_description',
        type: 'pdf'
      }
    })
  })
})
