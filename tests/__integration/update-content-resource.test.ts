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

  it('should return 403 if a non ADMIN role try to update a content resource', async () => {
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

  it('should update a content resource successfuly', async () => {
    await request(app)
      .post('/graphql')
      .set('role', 'ADMIN')
      .send(addContentResourceMutation)
      .expect(200)
      .then(async function (response) {
        return await request(app)
          .post('/graphql')
          .set('role', 'ADMIN')
          .send(updateContentResourceMutation)
          .expect(200)
      }).then(function (response) {
        const { statusCode, body } = response
        expect(statusCode).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.update).toBeDefined()
        expect(body.data.update).toEqual({
          id: '1',
          published: 1,
          name: 'update_name_value_from_integration_test',
          description: 'update_description_from_integration_test',
          type: 'image',
          created_at: expect.any(String),
          updated_at: expect.any(String)
        })
      })
  })

  it('should update only the content resource name', async () => {
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
          name: 'updated_content_resource_name_by_test',
          description: 'any_content_resource_description',
          type: 'image'
        }
      }
    }
    await request(app)
      .post('/graphql')
      .set('role', 'ADMIN')
      .send(addContentResourceMutation)
      .expect(200)
      .then(async function (response) {
        return await request(app)
          .post('/graphql')
          .set('role', 'ADMIN')
          .send(updateContentResourceMutation)
          .expect(200)
      }).then(function (response) {
        const { statusCode, body } = response
        expect(statusCode).toBe(200)
        expect(body.data).toBeDefined()
        expect(body.data.update).toBeDefined()
        expect(body.data.update).toEqual({
          id: '1',
          published: 1,
          name: 'updated_content_resource_name_by_test',
          description: 'any_content_resource_description',
          type: 'image',
          created_at: expect.any(String),
          updated_at: expect.any(String)
        })
      })
  })
})
