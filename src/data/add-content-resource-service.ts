import { ContentResource } from '@/domain/entities'
import { AddContentResourceInterface, AddContentResourceNamespace } from '@/domain/features/add-resource-feature'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'
import { pinoHelper } from '@/infra/logger/pino-helper'

export default class AddContentResourceService implements AddContentResourceInterface {
  constructor (
    private readonly contentResourceRepo: PgContentResourceRepository
  ) {}

  async perform (params: AddContentResourceNamespace.Input): Promise<AddContentResourceNamespace.Output> {
    pinoHelper.logInfo(params, 'data', 'Raw object that will be sent to repository')
    const newContentResource = new ContentResource({
      published: params.published,
      name: params.name,
      description: params.description,
      type: params.type
    })
    const add = await this.contentResourceRepo.save(newContentResource)
    return add
  }
}
