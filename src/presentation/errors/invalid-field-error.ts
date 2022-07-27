export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} field is not valid`)
  }
}
