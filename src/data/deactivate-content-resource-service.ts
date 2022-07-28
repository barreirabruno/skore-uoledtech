import { DeactivateContentResourceNamespace, DeactivateResourceFeatureInterface } from '@/domain/features/deactivate-resource-feature'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

export default class DeactivateContentResourceService implements DeactivateResourceFeatureInterface {
  constructor (
    private readonly contentResourceRepo: PgContentResourceRepository
  ) {}

  async perform (params: DeactivateContentResourceNamespace.Input): Promise<DeactivateContentResourceNamespace.Output> {
    const loadContentResource = await this.contentResourceRepo.load({ id: params.id })
    if (loadContentResource !== null && loadContentResource !== undefined) {
      await this.contentResourceRepo.deactivate({ id: params.id })
      return {
        id: params.id,
        message: 'Content deactivated successfully'
      }
    }
    return {
      id: params.id,
      message: 'Content resource could not be deactivated'
    }
  }
}
