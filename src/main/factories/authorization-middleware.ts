import { Middleware } from '@/presentation/helpers/middleware'
import AuthorizationMiddleware from '@/presentation/middlewares/authorization-middleware'

export const makeAuthorizationMiddleware = (role: string): Middleware => {
  return new AuthorizationMiddleware(role)
}
