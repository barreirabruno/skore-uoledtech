import { SaveContentResourceRepositoryInterface, SaveTransactionRepositoryNamespace } from '@/data/contracts/repos/content-resource-repository'
import { Entity, PrimaryGeneratedColumn, getRepository, Column, CreateDateColumn, UpdateDateColumn, getConnection, Repository } from 'typeorm'

import { IBackup, IMemoryDb, newDb } from 'pg-mem'

@Entity()
class PgContentResource {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  published!: number

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  type!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}

const makeFakeDb = async (entities?: any[]): Promise<IMemoryDb> => {
  const db = newDb()
  const connection = await db.adapters.createTypeormConnection({
    type: 'postgres',
    entities: entities ?? [PgContentResource]
  })
  await connection.synchronize()
  return db
}

class PgContentResourceRepository implements SaveContentResourceRepositoryInterface {
  async save (input: SaveTransactionRepositoryNamespace.Input): Promise<SaveTransactionRepositoryNamespace.Output> {
    const pgContentResourceRepo = getRepository(PgContentResource)
    const contentResource = await pgContentResourceRepo.save({
      published: 1,
      name: input.name,
      description: input.description,
      type: input.type
    })
    const saveContentResource = {
      id: contentResource.id,
      published: contentResource.published,
      name: contentResource.name,
      description: contentResource.description,
      type: contentResource.type,
      createdAt: contentResource.createdAt
    }
    return saveContentResource
  }
}

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

  describe('save', () => {
    it('should create a content resource successfuly', async () => {
      await sut.save({
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
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date)
      })
    })
  })
})
