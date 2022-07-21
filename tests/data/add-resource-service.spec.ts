import ContentResourceRepo from '@/infra/database/class-persistence-db'
import AddContentResourceService from '@/data/add-content-resource-service'

import { mock, MockProxy } from 'jest-mock-extended'
import { ContentResource } from '@/domain/entities'

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
    jest.clearAllMocks()
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

  it('should call Content Resource Repository with correct params', async () => {
    const newContentResource = new ContentResource({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      createdAt: new Date(Date.now())
    })
    const contentResourceSpy = jest.spyOn(contentResourceRepository, 'add')
    await addContentResourceService.perform(inputParams)
    expect(contentResourceSpy).toHaveBeenCalled()
    expect(contentResourceSpy).toHaveBeenCalledTimes(1)
    expect(contentResourceSpy).toHaveBeenCalledWith(newContentResource)
  })
})
