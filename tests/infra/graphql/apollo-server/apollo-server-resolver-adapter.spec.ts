import { InternalServerError } from '@/domain/entities/errors/internal-server-error'
import { apolloServerResolverAdapter } from '@/infra/graphql/apollo-server/apollo-sever-resolver-adapter'
import { Controller } from '@/presentation/controllers'
import { HttpResponse } from '@/presentation/helpers'

class ControllerStub extends Controller {
  result: HttpResponse

  constructor (resultParam: HttpResponse) {
    super()
    this.result = resultParam
  }

  async perform (httpRequest: any): Promise<HttpResponse<any>> {
    return this.result
  }
}

describe('Apollo Server Resolver Adapter', () => {
  let controller: Controller

  describe('should return http data object when status is 2XX', () => {
    const responses2xx = [{
      statusCode: 200,
      data: 'any_data_200'
    }, {
      statusCode: 204,
      data: 'any_data_204'
    }]
    responses2xx.forEach((response) => {
      it(`should suceed with ${response.statusCode} statusCode`, async () => {
        controller = new ControllerStub(response)
        const sut = await apolloServerResolverAdapter(controller, { params: 'any_params' })
        expect(sut).toEqual(response.data)
      })
    })
  })

  it('should return an Apollo custom error by default', async () => {
    const responseWithError = {
      statusCode: 500,
      data: new InternalServerError()
    }
    controller = new ControllerStub(responseWithError)
    const sut = apolloServerResolverAdapter(controller, { params: 'any_params' })
    await expect(sut).rejects.toThrow()
  })
})
