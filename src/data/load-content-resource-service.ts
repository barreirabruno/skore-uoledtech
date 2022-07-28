import { LoadContentResourceInterface, LoadContentResourceNamespace } from '@/domain/features/load-resource-feature'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

export default class LoadContentResourceService implements LoadContentResourceInterface {
  constructor (
    private readonly contentResourceRepo: PgContentResourceRepository
  ) {}

  async perform (params: LoadContentResourceNamespace.Input): Promise<LoadContentResourceNamespace.Output> {
    const loadContentResource = await this.contentResourceRepo.load({ id: params.id })
    if (loadContentResource?.published !== 1) {
      return undefined
    }
    return loadContentResource
  }
}
