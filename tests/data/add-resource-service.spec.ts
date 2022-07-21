import { ContentResource } from '@/domain/entities'
import { AddContentResourceInterface, AddContentResourceNamespace } from '@/domain/features/add-resource-feature'

import { mock, MockProxy } from 'jest-mock-extended'

class ContentResourceRepo {
  contentResourcesList: ContentResource[] = []

  add (newContentResource: ContentResource): void {
    this.contentResourcesList.push(newContentResource)
  }
}

class AddContentResourceService implements AddContentResourceInterface {
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

describe('Add Content Resource service', () => {
  let contentResourceRepository: MockProxy<ContentResourceRepo>
  let addContentResourceService: AddContentResourceService

  const inputParams = {
    name: 'any_content_resource_input_name',
    published: 1,
    description: 'any_content_resource_input_description',
    type: 'pdf'
  }

  beforeAll(() => {
    contentResourceRepository = mock()
  })

  beforeEach(() => {
    addContentResourceService = new AddContentResourceService(contentResourceRepository)
  })

  it('should create a Content Resource successfully', async () => {
    const sut = await addContentResourceService.perform(inputParams)
    expect(sut).toEqual({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      createdAt: expect.any(Date)
    })
  })
})
