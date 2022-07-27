import AddContentResourceService from '@/data/add-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

import { mock, MockProxy } from 'jest-mock-extended'
import { ContentResource } from '@/domain/entities'

describe('Add Content Resource service', () => {
  let contentResourceRepository: MockProxy<PgContentResourceRepository>
  let addContentResourceService: AddContentResourceService

  const inputParams = {
    name: 'any_content_resource_input_name',
    published: 1,
    description: 'any_content_resource_input_description',
    type: 'pdf'
  }

  beforeAll(() => {
    contentResourceRepository = mock()
    contentResourceRepository.save.mockResolvedValue({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      created_at: 'any_iso_date_string',
      updated_at: 'any_iso_date_string'
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    addContentResourceService = new AddContentResourceService(contentResourceRepository)
  })

  it('should call ContentResourceRepo.save when ContentResourceRepo.load returns null', async () => {
    contentResourceRepository.load.mockResolvedValueOnce(null)
    const contentResourceFromDatabase = {
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    }
    await addContentResourceService.perform(contentResourceFromDatabase)

    expect(contentResourceRepository.save).toHaveBeenCalledWith({ ...contentResourceFromDatabase })
  })

  it('should create a Content Resource successfully', async () => {
    const sut = await addContentResourceService.perform(inputParams)
    expect(sut).toEqual({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })

  it('should call Content Resource Repository with correct params', async () => {
    const newContentResource = new ContentResource({
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })
    const contentResourceSpy = jest.spyOn(contentResourceRepository, 'save')
    await addContentResourceService.perform(inputParams)
    expect(contentResourceSpy).toHaveBeenCalled()
    expect(contentResourceSpy).toHaveBeenCalledTimes(1)
    expect(contentResourceSpy).toHaveBeenCalledWith(newContentResource)
  })
})
