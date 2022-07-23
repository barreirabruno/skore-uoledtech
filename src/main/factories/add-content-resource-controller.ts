import AddContentResourceService from '@/data/add-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'
import { AddContentResourceController, Controller } from '@/presentation/controllers'
import { makeLogController } from './log-controller'

export const makeAddContentResourceController = (): Controller => {
  const persistenceClass = new PgContentResourceRepository()
  const addContentResourceService = new AddContentResourceService(persistenceClass)
  return makeLogController(new AddContentResourceController(addContentResourceService))
}
