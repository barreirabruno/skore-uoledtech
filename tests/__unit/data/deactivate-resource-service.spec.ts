import DeactivateContentResourceService from '@/data/deactivate-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Deactivate content resource', () => {
  let contentResourceRepository: MockProxy<PgContentResourceRepository>
  let sut: DeactivateContentResourceService

  beforeAll(() => {
    contentResourceRepository = mock()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    sut = new DeactivateContentResourceService(contentResourceRepository)
  })

  it('should change published value from 1 to 0', async () => {
    contentResourceRepository.load.mockResolvedValue(null)
    contentResourceRepository.deactivate.mockResolvedValue()
    const deactivateContentResource = await sut.perform({ id: 'any_invalid_content_resource_id' })
    expect(deactivateContentResource).toEqual({
      id: 'any_invalid_content_resource_id',
      message: 'Content resource could not be deactivated'
    })
  })
})
