import AddContentResourceService from '@/data/add-content-resource-service'
import { AddContentResourceController } from '@/presentation/controllers'

import { mock, MockProxy } from 'jest-mock-extended'

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

  it('should call AddContentResourceService with correct params', async () => {
    const spyAddContentResourceService = jest.spyOn(contentResourceRepository, 'perform')
    await sut.handle(inputParams)
    expect(spyAddContentResourceService).toHaveBeenCalled()
    expect(spyAddContentResourceService).toHaveBeenCalledTimes(1)
    expect(spyAddContentResourceService).toHaveBeenCalledWith({
      published: 1,
      name: 'any_content_resource_input_name',
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })
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
