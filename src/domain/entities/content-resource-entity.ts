type ContentResourceData = {
  id?: string
  published: number
  name: string
  description: string
  type: string
  created_at?: string
  updated_at?: string
}

export class ContentResource {
  id?: string
  published: number
  name: string
  description: string
  type: string
  created_at?: string
  updated_at?: string

  constructor (params: ContentResourceData) {
    this.id = params.id
    this.published = params.published
    this.name = params.name
    this.description = params.description
    this.type = params.type
    this.created_at = params.created_at
    this.updated_at = params.updated_at
  }
}
