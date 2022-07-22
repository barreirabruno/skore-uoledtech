import AddContentResourceService from '@/data/add-content-resource-service'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'
import { AddContentResourceController } from '@/presentation/controllers'

export const makeAddContentResourceController = (): AddContentResourceController => {
  const persistenceClass = new PgContentResourceRepository()
  const addContentResourceService = new AddContentResourceService(persistenceClass)
  return new AddContentResourceController(addContentResourceService)
}
