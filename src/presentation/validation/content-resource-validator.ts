import { InvalidContentTypeError } from '../errors/invalid-content-type-error'

export default class ContentResourceValidator {
  constructor (
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    const contentTypeAvailable = ['pdf', 'image', 'video']
    const validateType = contentTypeAvailable.indexOf(this.fieldName)
    if (validateType === -1) {
      return new InvalidContentTypeError(this.fieldName)
    }
    return undefined
  }
}
