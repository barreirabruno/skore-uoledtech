import { makeFakeDb } from '../../../../mocks/postgres/make-fake-database'
import { PgContentResource } from '@/infra/database/postgres/entities/pg-content-resource'
import PgContentResourceRepository from '@/infra/database/postgres/repos/content-resource-repo'

import { IBackup } from 'pg-mem'
import { getRepository, getConnection, Repository } from 'typeorm'

describe('Content resource repository', () => {
  let sut: PgContentResourceRepository
  let pgContentResourceRepo: Repository<PgContentResource>
  let backup: IBackup

  beforeAll(async () => {
    const db = await makeFakeDb([PgContentResource])
    backup = db.backup()
    pgContentResourceRepo = getRepository(PgContentResource)
  })

  beforeEach(() => {
    backup.restore()
    sut = new PgContentResourceRepository()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  describe('load', () => {
    it('should return a content resource if id exists', async () => {
      await pgContentResourceRepo.save([
        {
          published: 1,
          name: 'any_value_name_from_test_FIRST',
          description: 'any_value_description_from_test_FIRST',
          type: 'pdf'
        },
        {
          published: 1,
          name: 'any_value_name_from_test_SECOND',
          description: 'any_value_description_from_test_SECOND',
          type: 'image'
        }
      ])

      const findContentResource = await sut.load({ id: '2' })

      expect(findContentResource).toBeTruthy()
      expect(findContentResource).toEqual({
        id: 2,
        published: 1,
        name: 'any_value_name_from_test_SECOND',
        description: 'any_value_description_from_test_SECOND',
        type: 'image',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    })

    it('should return undefined if content resource id is not found', async () => {
      const findContentResource = await sut.load({ id: '2' })

      expect(findContentResource).toBeUndefined()
    })
  })

  describe('save', () => {
    it('should update a content resource if id is defined', async () => {
      await sut.save({
        published: 1,
        name: 'any_value_name_from_test',
        description: 'any_value_description_from_test',
        type: 'pdf'
      })

      const findContentResource = await pgContentResourceRepo.findOne({ id: '1' })

      const updateContentResource = await sut.save({
        id: findContentResource?.id,
        published: 1,
        name: 'update_content_resource_name',
        description: 'update_value_description_from_test',
        type: 'pdf'
      })

      expect(updateContentResource).toBeTruthy()
      expect(updateContentResource).toEqual({
        id: 1,
        published: 1,
        name: 'update_content_resource_name',
        description: 'update_value_description_from_test',
        type: 'pdf',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    })

    it('should create a content resource successfuly', async () => {
      const saveContentResource = await sut.save({
        published: 1,
        name: 'any_value_name_from_test',
        description: 'any_value_description_from_test',
        type: 'pdf'
      })

      const findContentResource = await pgContentResourceRepo.findOne({ id: '1' })

      expect(findContentResource).toBeTruthy()
      expect(findContentResource).toEqual({
        id: 1,
        published: 1,
        name: 'any_value_name_from_test',
        description: 'any_value_description_from_test',
        type: 'pdf',
        created_at: expect.any(Date),
        updated_at: expect.any(Date)
      })
      expect(saveContentResource).toBeTruthy()
      expect(saveContentResource).toEqual({
        id: 1,
        published: 1,
        name: 'any_value_name_from_test',
        description: 'any_value_description_from_test',
        type: 'pdf',
        created_at: expect.any(String),
        updated_at: expect.any(String)
      })
    })
  })
})
