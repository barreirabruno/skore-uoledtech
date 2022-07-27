import { PgContentResource } from '@/infra/database/postgres/entities'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import { IBackup } from 'pg-mem'
import { makeFakeDb } from '../mocks/postgres/make-fake-database'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Add content resource', () => {
  let app: Express
  //   let pgContentResourceRepo: Repository<PgContentResource>
  let backup: IBackup

  beforeAll(async () => {
    app = await setupApp()
    app.listen({ port: 0 })
    const db = await makeFakeDb([PgContentResource])
    backup = db.backup()
    // pgContentResourceRepo = getRepository(PgContentResource)
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => {
    await getConnection().close()
  })

  it('should create a new content resource successfuly', async () => {
    const queryData = {
      query: `mutation Add($addContentResource: ContentResourceInput!) {
              add(params: $addContentResource) {
                  id
                  published
                  name
                  description
                  type
                  created_at
                  updated_at
              }
          }`,
      variables: {
        addContentResource: {
          name: 'any_name_C',
          published: 1,
          description: 'any_description_B',
          type: 'string'
        }
      }
    }

    const response = await request(app)
      .post('/graphql')
      .set('role', 'ADMIN')
      .send(queryData)
      .expect(200)

    const { statusCode, body } = response

    expect(statusCode).toBe(200)
    expect(body.data.add).toEqual({
      id: '1',
      published: 1,
      name: 'any_name_C',
      description: 'any_description_B',
      type: 'string',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })
})
