class ContentResource {
  id?: string
  published: number
  name: string
  description: string
  type: string
  createdAt?: Date

  constructor (params: ContentResourceData) {
    this.id = params.id
    this.published = params.published
    this.name = params.name
    this.description = params.description
    this.type = params.type
    this.createdAt = params.createdAt
  }
}

type ContentResourceData = {
  id?: string
  published: number
  name: string
  description: string
  type: string
  createdAt?: Date
}

const inputParams = {
  id: 'any_content_resource_input_id',
  name: 'any_content_resource_input_name',
  published: 1,
  description: 'any_content_resource_input_description',
  type: 'pdf',
  createdAt: new Date(Date.now())
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
      createdAt: expect.any(Date)
    })
  })
})
