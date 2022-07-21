class ServerError extends Error {
  constructor (error?: Error) {
    super('Server failed. Try again soon or contact us')
    this.name = 'ServerError'
    this.stack = error?.stack
  }
}

type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

abstract class Controller {
  abstract perform (httpRequest: any): Promise<HttpResponse>

  async handle (httpRequest: any): Promise<HttpResponse> {
    try {
      return await this.perform(httpRequest)
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

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
