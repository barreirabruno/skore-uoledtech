import { getRepository } from 'typeorm'
import { SaveContentResourceRepositoryInterface, LoadContentResourceRepositoryInterface, LoadTransactionRepositoryNamespace, SaveTransactionRepositoryNamespace, DeactivateContentResourceRepositoryInterface, DeactivateContentResourceRepositoryNamespace } from '@/data/contracts/repos/content-resource-repository'
import { PgContentResource } from '../entities/pg-content-resource'
import { pinoHelper } from '@/infra/logger/pino-helper'

export default class PgContentResourceRepository implements SaveContentResourceRepositoryInterface, LoadContentResourceRepositoryInterface, DeactivateContentResourceRepositoryInterface {
  async deactivate (input: DeactivateContentResourceRepositoryNamespace.Input): Promise<void> {
    const pgContentResourceRepo = getRepository(PgContentResource)
    await pgContentResourceRepo.update({
      id: input.id
    }, {
      published: 0
    })
  }

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
        created_at: findContentResource.created_at.toISOString(),
        updated_at: findContentResource.updated_at.toISOString()
      }
    }
  }

  async save (input: SaveTransactionRepositoryNamespace.Input): Promise<SaveTransactionRepositoryNamespace.Output> {
    pinoHelper.logInfo(input, 'infra', 'Prepare content resource to save')
    const pgContentResourceRepo = getRepository(PgContentResource)
    let contentResourceObject
    if (input.id === undefined) {
      const contentResource = await pgContentResourceRepo.save({
        published: 1,
        name: input.name,
        description: input.description,
        type: input.type
      })
      pinoHelper.logInfo(contentResource, 'infra', 'Save content resource on database')
      contentResourceObject = {
        id: contentResource.id,
        published: input.published,
        name: input.name,
        description: input.description,
        type: input.type,
        created_at: contentResource.created_at.toISOString(),
        updated_at: contentResource.updated_at.toISOString()
      }
    } else {
      await pgContentResourceRepo.update({
        id: input.id
      }, {
        name: input.name,
        description: input.description
      })
      const findContentResourceUpdated = await pgContentResourceRepo.findOne({ id: input.id })
      contentResourceObject = {
        id: findContentResourceUpdated?.id ?? '',
        published: findContentResourceUpdated?.published ?? 1,
        name: findContentResourceUpdated?.name ?? '',
        description: findContentResourceUpdated?.description ?? '',
        type: findContentResourceUpdated?.type ?? '',
        created_at: findContentResourceUpdated?.created_at.toISOString() ?? '',
        updated_at: findContentResourceUpdated?.updated_at.toISOString() ?? ''
      }
    }
    return contentResourceObject
  }
}
