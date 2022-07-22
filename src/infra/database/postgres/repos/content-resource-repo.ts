import { getRepository } from 'typeorm'
import { SaveContentResourceRepositoryInterface, LoadContentResourceRepositoryInterface, LoadTransactionRepositoryNamespace, SaveTransactionRepositoryNamespace } from '@/data/contracts/repos/content-resource-repository'
import PgContentResource from '../entities/pg-content-resource'

export default class PgContentResourceRepository implements SaveContentResourceRepositoryInterface, LoadContentResourceRepositoryInterface {
  async load (input: LoadTransactionRepositoryNamespace.Input): Promise<LoadTransactionRepositoryNamespace.Output> {
    const pgContentResourceRepo = getRepository(PgContentResource)
    const findContentResource = await pgContentResourceRepo.findOne({ id: input.id })
    if (findContentResource !== undefined) {
      return {
        id: findContentResource.id,
        published: findContentResource.published,
        name: findContentResource.name,
        description: findContentResource.description,
        type: findContentResource.type,
        createdAt: findContentResource.createdAt
      }
    }
  }

  async save (input: SaveTransactionRepositoryNamespace.Input): Promise<SaveTransactionRepositoryNamespace.Output> {
    const pgContentResourceRepo = getRepository(PgContentResource)
    const contentResource = await pgContentResourceRepo.save({
      published: 1,
      name: input.name,
      description: input.description,
      type: input.type
    })
    const saveContentResource = {
      id: contentResource.id.toString(),
      published: contentResource.published,
      name: contentResource.name,
      description: contentResource.description,
      type: contentResource.type,
      createdAt: contentResource.createdAt
    }
    return saveContentResource
  }
}
