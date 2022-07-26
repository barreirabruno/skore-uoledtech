import { RequiredFieldError } from '../errors/required-field-error'

export default class RequiredStringValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    if (this.value === '' ||
      this.value === null ||
      this.value === undefined) {
      return new RequiredFieldError(this.fieldName)
    }
    return undefined
  }
}
