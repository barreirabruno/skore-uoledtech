import { ContentResource } from '@/domain/entities'

const inputParams = {
  name: 'any_content_resource_input_name',
  published: 1,
  description: 'any_content_resource_input_description',
  type: 'pdf'
}

const loadDataParams = {
  id: '1',
  name: 'update_content_name',
  published: 1,
  description: 'update_content_description',
  type: 'pdf',
  created_at: new Date(Date.now()).toISOString(),
  updated_at: new Date(Date.now()).toISOString()
}

describe('Content Resource entity', () => {
  it('should create a Content Resource with loadParams', () => {
    const sut = new ContentResource(inputParams, loadDataParams)
    expect(sut).toEqual({
      id: '1',
      name: 'update_content_name',
      published: 1,
      description: 'update_content_description',
      type: 'pdf',
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
