type ContentResourceData = {
  id?: string
  published: number
  name: string
  description: string
  type: string
  createdAt?: Date
}

export class ContentResource {
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
