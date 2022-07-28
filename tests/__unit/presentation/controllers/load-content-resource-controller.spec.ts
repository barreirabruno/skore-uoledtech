import LoadContentResourceService from '@/data/load-content-resource-service'
import { Controller } from '@/presentation/controllers'
import { HttpResponse, success } from '@/presentation/helpers'
import { mock, MockProxy } from 'jest-mock-extended'

class LoadContentResourceController extends Controller {
  constructor (
    private readonly loadContentResourceService: LoadContentResourceService
  ) {
    super()
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    const loadContentResource = await this.loadContentResourceService.perform(httpRequest)
    return success(loadContentResource)
  }
}

describe('Load content resource controller', () => {
  let loadContentResourceService: MockProxy<LoadContentResourceService>
  let sut: LoadContentResourceController

  beforeAll(() => {
    loadContentResourceService = mock()
  })

  beforeEach(() => {
    sut = new LoadContentResourceController(loadContentResourceService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call LoadContentResourceService with correct params', async () => {
    const spyService = jest.spyOn(loadContentResourceService, 'perform')
    loadContentResourceService.perform.mockResolvedValue({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })

    await sut.perform({ id: 'any_valid_id' })
    expect(spyService).toHaveBeenCalled()
    expect(spyService).toHaveBeenCalledTimes(1)
    expect(spyService).toHaveBeenCalledWith({ id: 'any_valid_id' })
  })

  it('should return 200 if perform method succeeds', async () => {
    loadContentResourceService.perform.mockResolvedValueOnce({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
    const httpResponse = await sut.perform({ id: 'any_valid_id' })

    expect(httpResponse).toEqual({
      statusCode: 200,
      data: {
        id: 'any_content_resource_input_id',
        name: 'any_content_resource_input_name',
        published: 1,
        description: 'any_content_resource_input_description',
        type: 'pdf',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      }
    })
  })
})
