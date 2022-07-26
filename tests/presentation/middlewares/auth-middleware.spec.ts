import { forbidenError, HttpResponse, serverError, success } from '@/presentation/helpers'
import { Middleware } from '@/presentation/helpers/middleware'

class AuthorizationMiddleware implements Middleware {
  constructor (
    private readonly role: string
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse<any>> {
    try {
      if (httpRequest.role !== this.role) return forbidenError()
      return success({ id: 'any_static_id' })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}

describe('Auth middleware', () => {
  it('should return id if ADMIN role is allowed', async () => {
    const sut = await new AuthorizationMiddleware('ADMIN').handle({ role: 'ADMIN' })
    expect(sut).toEqual({ statusCode: 200, data: { id: 'any_static_id' } })
  })
})
