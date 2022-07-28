import { ContentResource } from '@/domain/entities'

const inputParams = {
  name: 'any_content_resource_input_name',
  published: 1,
  description: 'any_content_resource_input_description',
  type: 'pdf'
}

const loadDataParams = {
  id: '1',
  name: 'database_any_name_value',
  published: 1,
  description: 'database_any_description_value',
  type: 'image',
  created_at: new Date(Date.now()).toISOString(),
  updated_at: new Date(Date.now()).toISOString()
}

describe('Content Resource entity', () => {
  it('should create a Content Resource with loadParams', () => {
    const inputParams = {
      name: 'update_any_name_value'
    }
    const sut = new ContentResource(inputParams, loadDataParams)
    expect(sut).toEqual({
      id: '1',
      name: 'update_any_name_value',
      published: 1,
      description: 'database_any_description_value',
      type: 'image',
      created_at: expect.any(String),
      updated_at: expect.any(String)
    })
  })

  it('should create a Content Resource with correct params', () => {
    const sut = new ContentResource(inputParams)
    expect(sut).toEqual({
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf'
    })
  })
})
