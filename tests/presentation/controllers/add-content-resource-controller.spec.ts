import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '../helpers'

class AddContentResourceController extends Controller {
  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return {
      statusCode: 200,
      data: {
        id: 'any_content_resource_input_id',
        name: 'any_content_resource_input_name',
        published: 1,
        description: 'any_content_resource_input_description',
        type: 'pdf',
        createdAt: new Date(Date.now())
      }
    }
  }
}

describe('Add Content Resource Controller', () => {
  let sut: AddContentResourceController

  const inputParams = {
    name: 'any_content_resource_input_name',
    published: 1,
    description: 'any_content_resource_input_description',
    type: 'pdf'
  }

  beforeEach(() => {
    sut = new AddContentResourceController()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return 200 if perform method succeeds', async () => {
    const httpResponse = await sut.handle(inputParams)

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_content_resource_input_id',
        name: 'any_content_resource_input_name',
        published: 1,
        description: 'any_content_resource_input_description',
        type: 'pdf',
        createdAt: expect.any(Date)
      }
    })
  })
})
