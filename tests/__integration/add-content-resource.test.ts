import { PgContentResource } from '@/infra/database/postgres/entities'
import { setupApp } from '@/main/config/app'
import { Express } from 'express'
import { IBackup } from 'pg-mem'
import { makeFakeDb } from '../mocks/postgres/make-fake-database'
import request from 'supertest'
import { getConnection } from 'typeorm'

describe('Add content resource', () => {
  let app: Express
  let backup: IBackup

  beforeAll(async () => {
    app = await setupApp()
    app.listen({ port: 0 })
    const db = await makeFakeDb([PgContentResource])
    backup = db.backup()
  })

  beforeEach(() => {
    backup.restore()
  })

  afterAll(async () => {
    await getConnection().close()
  })

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

  it('should return 403 if a non ADMIN role try to create a content resource', async () => {
    const response = await request(app)
      .post('/graphql')
      .set('role', 'STUDENT')
      .send(queryData)
      .expect(403)

    const { statusCode, text } = response
    const { errors } = JSON.parse(text)

    expect(statusCode).toBe(403)
    expect(errors[0].message).toBeDefined()
    expect(errors[0].message).toBe('AccessDeniedError: Access denied')
    expect(errors[0].extensions).toBeDefined()
    expect(errors[0].extensions.code).toBeDefined()
    expect(errors[0].extensions.code).toBe('FORBIDDEN')
  })

  it('should create a new content resource successfuly', async () => {
    const response = await request(app)
      .post('/graphql')
      .set('role', 'ADMIN')
      .send(queryData)
      .expect(200)

    const { statusCode, body } = response

    expect(statusCode).toBe(200)
    expect(body.data).toBeDefined()
    expect(body.data.add).toBeDefined()
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
