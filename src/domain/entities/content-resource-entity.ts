type ContentResourceData = {
  id?: string
  published?: number
  name?: string
  description?: string
  type?: string
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
} | undefined | null

export class ContentResource {
  id?: string
  published?: number
  name?: string
  description?: string
  type?: string
  created_at?: string
  updated_at?: string

  constructor (params: ContentResourceData, loadParams?: LoadContentResourceData) {
    this.id = loadParams?.id ?? params.id
    this.published = loadParams?.published ?? params.published
    this.name = params.name ?? loadParams?.name
    this.description = params.description ?? loadParams?.description
    this.type = loadParams?.type ?? params.type
    this.created_at = loadParams?.created_at ?? params.created_at
    this.updated_at = loadParams?.updated_at ?? params.updated_at
  }
}
