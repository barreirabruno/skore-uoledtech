import { InvalidFieldError } from '@/presentation/errors/invalid-field-error'
import PublishedValidator from '@/presentation/validation/published-validator'

describe('Published field validator', () => {
  it('should return InvalidFieldError if published is not 1', () => {
    const sut = new PublishedValidator('0', 'published')

    const error = sut.validate()

    expect(error).toEqual(new InvalidFieldError('published'))
  })
})
