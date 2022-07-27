import { RequiredFieldError } from '@/presentation/errors/required-field-error'
import RequiredStringValidator from '@/presentation/validation/required-string-validator'

describe('Required string validator', () => {
  it('should return RequiredFieldError if value is undefined', () => {
    const sut = new RequiredStringValidator(undefined as any, 'any_field')

    const error = sut.validate()

    expect(error).toEqual(new RequiredFieldError('any_field'))
  })

  it('should return empty if value is not empty, null or undefined', () => {
    const sut = new RequiredStringValidator('any_valid_tring', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
