import RequiredStringValidator from '@/presentation/validation/required-string-validator'
import ValidatorBuilder from '@/presentation/validation/validator-builder'

describe('Validator builder', () => {
  it('should return a required string validator', () => {
    const validators = ValidatorBuilder.of({
      value: '', fieldName: 'any_field_name'
    }).required().build()

    expect(validators).toEqual([
      new RequiredStringValidator('', 'any_field_name')
    ])
  })
})
