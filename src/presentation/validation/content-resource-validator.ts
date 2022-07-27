import { InvalidFieldError } from '@/presentation/errors/invalid-field-error'

export default class ContentResourceValidator {
  constructor (
    private readonly value: string,
    private readonly fieldName: string
  ) {}

  validate (): Error | undefined {
    const contentTypeAvailable = ['pdf', 'image', 'video']
    const validateType = contentTypeAvailable.indexOf(this.value)
    if (validateType === -1) {
      return new InvalidFieldError(this.fieldName)
    }
    return undefined
  }
}
