import { InvalidContentTypeError } from '@/presentation/errors/invalid-content-type-error'

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

describe('Content resource type validator', () => {
  const validContentResourceTypes = ['pdf', 'image', 'video']
  validContentResourceTypes.forEach(validContentResource => {
    it(`should return undefined when content type resource if ${validContentResource}`, () => {
      const sut = new ContentResourceValidator(`${validContentResource}`)

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  it('should return ContentResourceValidator if value is empty', () => {
    const sut = new ContentResourceValidator('not_valid_content_type')

    const error = sut.validate()

    expect(error).toEqual(new InvalidContentTypeError('not_valid_content_type'))
  })
})
