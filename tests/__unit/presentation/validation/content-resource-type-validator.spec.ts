import { InvalidContentTypeError } from '@/presentation/errors/invalid-content-type-error'
import ContentResourceValidator from '@/presentation/validation/content-resource-validator'

describe('Content resource type validator', () => {
  const validContentResourceTypes = [{ type: 'pdf' }, { type: 'image' }, { type: 'video' }]
  validContentResourceTypes.forEach(validContentResource => {
    it(`should return undefined when content type resource if ${validContentResource.type}`, () => {
      const sut = new ContentResourceValidator(`${validContentResource.type}`, 'type')

      const error = sut.validate()

      expect(error).toBeUndefined()
    })
  })

  it('should return ContentResourceValidator if value is empty', () => {
    const sut = new ContentResourceValidator('not_valid_content_type', 'type')

    const error = sut.validate()

    expect(error).toEqual(new InvalidContentTypeError('type'))
  })
})
