import { ContentResource } from '@/domain/entities'
import { AddContentResourceInterface, AddContentResourceNamespace } from '@/domain/features/add-resource-feature'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

export default class AddContentResourceService implements AddContentResourceInterface {
  constructor (
    private readonly contentResourceRepo: PgContentResourceRepository
  ) {}

  async perform (params: AddContentResourceNamespace.Input): Promise<AddContentResourceNamespace.Output> {
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
