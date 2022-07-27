import { pinoHelper } from '@/infra/logger/pino-helper'
import ContentResourceValidator from './content-resource-validator'
import RequiredStringValidator from './required-string-validator'
import { Validator } from './validator'

export default class ValidatorBuilder {
  private constructor (
    private readonly value: string,
    private readonly fieldName: string,
    private readonly validators: Validator[] = []
  ) {}

  static of (params: { value: string, fieldName: string}): ValidatorBuilder {
    return new ValidatorBuilder(params.value, params.fieldName)
  }

  required (): ValidatorBuilder {
    pinoHelper.logInfo({ fieldname: this.fieldName, value: this.value }, 'presentation>controllers', 'Validate input params - required')
    this.validators.push(new RequiredStringValidator(this.value, this.fieldName))
    return this
  }

  contentResourceType (): ValidatorBuilder {
    this.validators.push(new ContentResourceValidator(this.value, this.fieldName))
    return this
  }

  build (): Validator[] {
    return this.validators
  }
}
