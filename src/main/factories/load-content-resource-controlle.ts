import LoadContentResourceService from '@/data/load-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'
import { Controller } from '@/presentation/controllers'
import LoadContentResourceController from '@/presentation/controllers/load-content-resource-controller'
import { makeLogController } from './log-controller'

export const makeLoadContentResourceController = (): Controller => {
  const persistenceClass = new PgContentResourceRepository()
  const deactivateContentResourceService = new LoadContentResourceService(persistenceClass)
  return makeLogController(new LoadContentResourceController(deactivateContentResourceService))
}
