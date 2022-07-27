import { AccessDeniedError } from '@/domain/entities/errors/access-denied-error'
import ServerError from '@/domain/entities/errors/server-error'

export type HttpResponse<T = any> = {
  statusCode: number
  data: T
}

export const serverError = (error: Error): HttpResponse<Error> => ({
  statusCode: 500,
  data: new ServerError(error)
})

export const forbidenError = (error: Error): HttpResponse<AccessDeniedError> => ({
  statusCode: 403,
  data: error
})

export const badRequest = (error: Error): HttpResponse<AccessDeniedError> => ({
  statusCode: 400,
  data: error
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  data: data
})
