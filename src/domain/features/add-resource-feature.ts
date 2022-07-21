import { ContentResource } from '../entities'

export interface AddContentResourceInterface {
  perform: (params: AddContentResourceNamespace.Input) => Promise<AddContentResourceNamespace.Output>
}

export namespace AddContentResourceNamespace {
  export type Input = {
    published: number
    name: string
    description: string
    type: string
  }
  export type Output = ContentResource
}
