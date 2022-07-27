export class InvalidFieldError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} is a invalid`)
  }
}
