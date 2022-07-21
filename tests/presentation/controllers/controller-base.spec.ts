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

  beforeEach(() => {
    sut = new ControllerStub()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return same result as perform method', async () => {
    const httpResponse = await sut.handle({
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })

    expect(httpResponse).toEqual(sut.result)
  })
})
