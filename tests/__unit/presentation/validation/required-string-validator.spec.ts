import RequiredStringValidator from '@/presentation/validation/required-string-validator'

describe('Required string validator', () => {
  it('should return empty if value is not empty, null or undefined', () => {
    const sut = new RequiredStringValidator('any_valid_tring', 'any_field')

    const error = sut.validate()

    expect(error).toBeUndefined()
  })
})
