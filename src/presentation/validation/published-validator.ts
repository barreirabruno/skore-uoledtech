import { InvalidFieldError } from '../errors/invalid-field-error'

export default class PublishedValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value !== undefined && parseInt(this.value) !== 1) {
      return new InvalidFieldError(this.fieldName)
    }
    return undefined
  }
}
