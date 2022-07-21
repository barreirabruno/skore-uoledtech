import { ContentResource } from '@/domain/entities'
import { AddContentResourceInterface, AddContentResourceNamespace } from '@/domain/features/add-resource-feature'
import ContentResourceRepo from '@/infra/database/class-persistence-db'

export default class AddContentResourceService implements AddContentResourceInterface {
  constructor (
    private readonly contentResourceRepo: ContentResourceRepo
  ) {}

  async perform (params: AddContentResourceNamespace.Input): Promise<ContentResource> {
    const newContentResource = new ContentResource({
      id: 'any_content_resource_input_id',
      published: params.published,
      name: params.name,
      description: params.description,
      type: params.type,
      createdAt: new Date(Date.now())
    })
    await this.contentResourceRepo.add(newContentResource)
    return newContentResource
  }
}
