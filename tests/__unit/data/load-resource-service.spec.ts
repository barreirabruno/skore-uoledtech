import { LoadContentResourceInterface, LoadContentResourceNamespace } from '@/domain/features/load-resource-feature'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

import { mock, MockProxy } from 'jest-mock-extended'

class LoadContentResourceService implements LoadContentResourceInterface {
  constructor (
    private readonly contentResourceRepo: PgContentResourceRepository
  ) {}

  async perform (params: LoadContentResourceNamespace.Input): Promise<LoadContentResourceNamespace.Output> {
    const loadContentResource = await this.contentResourceRepo.load({ id: params.id })
    return loadContentResource
  }
}

describe('View Content resource service', () => {
  let contentResourceRepository: MockProxy<PgContentResourceRepository>
  let sut: LoadContentResourceService

  beforeAll(() => {
    contentResourceRepository = mock()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new LoadContentResourceService(contentResourceRepository)
  })

  it('should load a content resource successfuly', async () => {
    contentResourceRepository.load.mockResolvedValueOnce({
      id: 'any_id_from_database',
      name: 'any_name_value_from_database',
      published: 1,
      description: 'any_description_value_from_database',
      type: 'pdf',
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString()
    })
    const request = await sut.perform({ id: 'any_valid_id' })
    expect(request).toEqual({
      id: 'any_id_from_database',
      name: 'any_name_value_from_database',
      published: 1,
      description: 'any_description_value_from_database',
      type: 'pdf',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })
})
