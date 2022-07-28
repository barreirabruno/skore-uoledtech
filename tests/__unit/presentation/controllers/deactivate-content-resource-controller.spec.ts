import DeactivateContentResourceService from '@/data/deactivate-content-resource-service'
import { DeactivateContentResourceController } from '@/presentation/controllers/deactivate-content-resource-controller'

import { mock, MockProxy } from 'jest-mock-extended'

describe('Deactivate content resource', () => {
  let deactivateContentResourceService: MockProxy<DeactivateContentResourceService>
  let sut: DeactivateContentResourceController

  const inputParams = { params: { id: 'any_valid_id' } }

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

    await sut.perform(inputParams)
    expect(spyService).toHaveBeenCalled()
    expect(spyService).toHaveBeenCalledTimes(1)
    expect(spyService).toHaveBeenCalledWith({ id: 'any_valid_id' })
  })

  it('should call DeactivateContentResourceService with correct params', async () => {
    const spyService = jest.spyOn(deactivateContentResourceService, 'perform')
    deactivateContentResourceService.perform.mockResolvedValue({
      id: 'any_valid_id',
      message: 'Content resource could not be deactivated'
    })

    await sut.perform(inputParams)
    expect(spyService).toHaveBeenCalled()
    expect(spyService).toHaveBeenCalledTimes(1)
    expect(spyService).toHaveBeenCalledWith({ id: 'any_valid_id' })
  })

  it('should return 204 if perform method succeeds', async () => {
    deactivateContentResourceService.perform.mockResolvedValueOnce({
      id: 'any_valid_id',
      message: 'Content deactivated successfully'
    })
    const httpResponse = await sut.perform(inputParams)

    expect(httpResponse).toEqual({
      statusCode: 204,
      data: {
        id: 'any_valid_id',
        message: 'Content deactivated successfully'
      }
    })
  })
})
