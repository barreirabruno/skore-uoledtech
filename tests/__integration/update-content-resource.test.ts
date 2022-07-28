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

  const addContentResourceMutation = {
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
        type: 'image'
      }
    }
  }

  const updateContentResourceMutation = {
    query: `mutation Update($updateContentResource: ContentResourceUpdateInput!) {
        update(params: $updateContentResource) {
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
      updateContentResource: {
        id: '1',
        name: 'update_name_value_from_integration_test',
        description: 'update_description_from_integration_test',
        type: 'image'
      }
    }
  }

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

  it('should return 403 if a non ADMIN role try to create a content resource', async () => {
    await request(app)
      .post('/graphql')
      .set('role', 'ADMIN')
      .send(addContentResourceMutation)
      .expect(200)
      .then(async function (response) {
        return await request(app)
          .post('/graphql')
          .set('role', 'STUDENT')
          .send(updateContentResourceMutation)
          .expect(403)
      }).then(function (response) {
        const { statusCode, text } = response
        const { errors } = JSON.parse(text)
        expect(statusCode).toBe(403)
        expect(errors[0].message).toBeDefined()
        expect(errors[0].message).toBe('AccessDeniedError: Access denied')
        expect(errors[0].extensions).toBeDefined()
        expect(errors[0].extensions.code).toBeDefined()
        expect(errors[0].extensions.code).toBe('FORBIDDEN')
      })
  })
})
