type ContentResourceData = {
  id?: string
  published: number
  name: string
  description: string
  type: string
  created_at?: string
  updated_at?: string
}

type LoadContentResourceData = {
  id: string
  published: number
  name: string
  description: string
  type: string
  created_at: string
  updated_at: string
}

export class ContentResource {
  id?: string
  published: number
  name: string
  description: string
  type: string
  created_at?: string
  updated_at?: string

  constructor (params: ContentResourceData, loadParams?: LoadContentResourceData) {
    this.id = loadParams?.id ?? params.id
    this.published = loadParams?.published ?? params.published
    this.name = loadParams?.name ?? params.name
    this.description = loadParams?.description ?? params.description
    this.type = loadParams?.type ?? params.type
    this.created_at = loadParams?.created_at ?? params.created_at
    this.updated_at = loadParams?.updated_at ?? params.updated_at
  }
}
