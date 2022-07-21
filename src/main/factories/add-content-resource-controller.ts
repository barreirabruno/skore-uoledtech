import AddContentResourceService from '@/data/add-content-resource-service'
import ContentResourceRepo from '@/infra/database/class-persistence-db'
import { AddContentResourceController } from '@/presentation/controllers'

export const makeAddContentResourceController = (): AddContentResourceController => {
  const persistenceClass = new ContentResourceRepo()
  const addContentResourceService = new AddContentResourceService(persistenceClass)
  return new AddContentResourceController(addContentResourceService)
}
