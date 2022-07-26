import { AccessDeniedError } from '@/domain/entities/errors/access-denied-error'
import { HttpResponse, forbidenError, success, serverError } from '../helpers'
import { Middleware } from '../helpers/middleware'

export default class AuthorizationMiddleware implements Middleware {
  constructor (
    private readonly role: string
  ) {}

  async handle (httpRequest: any): Promise<HttpResponse<any>> {
    try {
      if (httpRequest.role !== this.role) return forbidenError(new AccessDeniedError())
      return success({ id: 'any_static_id' })
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
