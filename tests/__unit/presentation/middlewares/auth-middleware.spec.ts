import { AccessDeniedError } from '@/domain/entities/errors/access-denied-error'
import AuthorizationMiddleware from '@/presentation/middlewares/authorization-middleware'

describe('Auth middleware', () => {
  let sut: AuthorizationMiddleware

  beforeEach(() => {
    sut = new AuthorizationMiddleware('ADMIN')
  })

  it('should return forbiden if roles are different', async () => {
    const checkRole = await sut.handle({ role: 'STUDENT' })
    expect(checkRole).toEqual({ statusCode: 403, data: new AccessDeniedError() })
  })

  it('should return id if ADMIN role is allowed', async () => {
    const checkRole = await sut.handle({ role: 'ADMIN' })
    expect(checkRole).toEqual({ statusCode: 200, data: { id: 'any_static_id' } })
  })
})
