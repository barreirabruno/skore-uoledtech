import AddContentResourceService from '@/data/add-content-resource-service'
import { AddContentResourceController } from '@/presentation/controllers'
import ValidationComposite from '@/presentation/validation/validation-composite'
import { mocked } from 'jest-mock'

import { mock, MockProxy } from 'jest-mock-extended'

jest.mock('@/presentation/validation/validation-composite')

describe('Add Content Resource Controller', () => {
  let contentResourceRepository: MockProxy<AddContentResourceService>
  let sut: AddContentResourceController

  const inputParams = {
    params: {
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    }
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

  it('should return 400 if validation fails', async () => {
    const error = new Error('Validation Error')
    const validationCompositeSpy = jest.fn().mockImplementationOnce(() => ({
      validate: jest.fn().mockReturnValueOnce(error)
    }))
    mocked(ValidationComposite).mockImplementationOnce(validationCompositeSpy)

    const httpResponse = await sut.handle({
      params: {
        name: '',
        published: 1,
        description: 'any_content_resource_input_description',
        type: 'pdf'
      }
    })

    expect(ValidationComposite).toHaveBeenCalledWith([])
    expect(httpResponse).toEqual({
      statusCode: 400,
      data: error
    })
  })

  it('should call AddContentResourceService with correct params', async () => {
    const spyAddContentResourceService = jest.spyOn(contentResourceRepository, 'perform')
    await sut.perform(inputParams)
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
    contentResourceRepository.perform.mockResolvedValueOnce({
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })
    const httpResponse = await sut.perform(inputParams)

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
