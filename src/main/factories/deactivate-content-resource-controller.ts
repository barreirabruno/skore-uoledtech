import DeactivateContentResourceService from '@/data/deactivate-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'
import { Controller } from '@/presentation/controllers'
import { DeactivateContentResourceController } from '@/presentation/controllers/deactivate-content-resource-controller'
import { makeLogController } from './log-controller'

export const makeDeactivateContentResourceController = (): Controller => {
  const persistenceClass = new PgContentResourceRepository()
  const deactivateContentResourceService = new DeactivateContentResourceService(persistenceClass)
  return makeLogController(new DeactivateContentResourceController(deactivateContentResourceService))
}
