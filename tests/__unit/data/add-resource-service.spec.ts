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

  it('should update a Content Resource successfully', async () => {
    contentResourceRepository.load.mockResolvedValueOnce({
      id: 'any_id_from_database',
      name: 'any_name_value_from_database',
      published: 1,
      description: 'any_description_value_from_database',
      type: 'pdf',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })

    contentResourceRepository.save.mockResolvedValueOnce({
      id: 'any_id_from_database',
      name: '**[UPDATE][UPDATE][UPDATE][UPDATE]**',
      published: 1,
      description: '**[UPDATE]****[UPDATE]****[UPDATE]',
      type: 'pdf',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })

    const spyContentResourceRepositorySave = jest.spyOn(contentResourceRepository, 'save')

    await addContentResourceService.perform({
      id: 'any_id_from_database',
      name: '**[UPDATE][UPDATE][UPDATE][UPDATE]**',
      published: 1,
      description: '**[UPDATE]****[UPDATE]****[UPDATE]',
      type: 'pdf'
    })

    expect(spyContentResourceRepositorySave).toHaveBeenCalled()
    expect(spyContentResourceRepositorySave).toHaveBeenCalledTimes(1)
    expect(spyContentResourceRepositorySave).toHaveBeenCalledWith({
      id: 'any_id_from_database',
      name: '**[UPDATE][UPDATE][UPDATE][UPDATE]**',
      published: 1,
      description: '**[UPDATE]****[UPDATE]****[UPDATE]',
      type: 'pdf',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })

  it('should create a Content Resource successfully', async () => {
    contentResourceRepository.save.mockResolvedValueOnce({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      created_at: 'any_iso_date_string',
      updated_at: 'any_iso_date_string'
    })
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
