export class InvalidContentTypeError extends Error {
  constructor (fieldName: string) {
    super(`${fieldName} is a invalid content resource type`)
  }
}
