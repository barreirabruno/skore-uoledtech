import ServerError from '@/domain/entities/errors/server-error'
import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '@/presentation/helpers'
import ValidationComposite from '@/presentation/validation/validation-composite'
import { mocked } from 'jest-mock'

jest.mock('@/presentation/validation/validation-composite')

class ControllerStub extends Controller {
  result: HttpResponse = {
    statusCode: 200,
    data: 'any_result_data'
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return this.result
  }
}

describe('Controller base', () => {
  let sut: ControllerStub

  const inputParams = {
    name: 'any_content_resource_input_name',
    published: 1,
    description: 'any_content_resource_input_description',
    type: 'pdf'
  }

  beforeEach(() => {
    sut = new ControllerStub()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
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

  it('should return 500 if perform method fails for any reason', async () => {
    const error = new ServerError(new Error('ANY_INFRA_ERROR'))
    jest.spyOn(sut, 'perform').mockResolvedValueOnce({
      statusCode: 500,
      data: error
    })
    const httpResponse = await sut.handle(inputParams)
    expect(httpResponse).toEqual({
      statusCode: 500,
      data: new ServerError(new Error('ANY_INFRA_ERROR'))
    })
  })

  it('should return same result as perform method', async () => {
    const httpResponse = await sut.handle(inputParams)

    expect(httpResponse).toEqual(sut.result)
  })
})
