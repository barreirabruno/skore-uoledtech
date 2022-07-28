import LoadContentResourceService from '@/data/load-content-resource-service'
import LoadContentResourceController from '@/presentation/controllers/load-content-resource-controller'
import { mock, MockProxy } from 'jest-mock-extended'

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
    const input = {
      params: { id: 'any_valid_id' }
    }
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

    await sut.perform(input)
    expect(spyService).toHaveBeenCalled()
    expect(spyService).toHaveBeenCalledTimes(1)
    expect(spyService).toHaveBeenCalledWith(input.params)
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
