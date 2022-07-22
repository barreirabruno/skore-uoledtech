import { ContentResource } from '@/domain/entities'

const inputParams = {
  id: 'any_content_resource_input_id',
  name: 'any_content_resource_input_name',
  published: 1,
  description: 'any_content_resource_input_description',
  type: 'pdf',
  createdAt: new Date(Date.now()).toISOString(),
  updatedAt: new Date(Date.now()).toISOString()
}

describe('Content Resource entity', () => {
  it('should create a Content Resource with correct params', () => {
    const sut = new ContentResource(inputParams)
    expect(sut).toEqual({
      id: 'any_content_resource_input_id',
      name: 'any_content_resource_input_name',
      published: 1,
      description: 'any_content_resource_input_description',
      type: 'pdf',
      createdAt: expect.any(String),
      updatedAt: expect.any(String)
    })
  })
})
