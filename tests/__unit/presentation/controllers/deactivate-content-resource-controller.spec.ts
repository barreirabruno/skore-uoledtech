import DeactivateContentResourceService from '@/data/deactivate-content-resource-service'
import { DeactivateContentResourceController } from '@/presentation/controllers/deactivate-content-resource-controller'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Deactivate content resource', () => {
  let deactivateContentResourceService: MockProxy<DeactivateContentResourceService>
  let sut: DeactivateContentResourceController

  beforeAll(() => {
    deactivateContentResourceService = mock()
  })

  beforeEach(() => {
    sut = new DeactivateContentResourceController(deactivateContentResourceService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call DeactivateContentResourceService with correct params', async () => {
    const spyService = jest.spyOn(deactivateContentResourceService, 'perform')
    deactivateContentResourceService.perform.mockResolvedValue({
      id: 'any_valid_id',
      message: 'Content resource could not be deactivated'
    })
    const input = { params: { id: 'any_valid_id' } }
    await sut.perform(input)
    expect(spyService).toHaveBeenCalled()
    expect(spyService).toHaveBeenCalledTimes(1)
    expect(spyService).toHaveBeenCalledWith({ id: 'any_valid_id' })
  })
})
