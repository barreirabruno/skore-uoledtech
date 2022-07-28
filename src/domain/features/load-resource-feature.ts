import { ContentResource } from '../entities'

export interface LoadContentResourceInterface {
  perform: (params: LoadContentResourceNamespace.Input) => Promise<LoadContentResourceNamespace.Output>
}

export namespace LoadContentResourceNamespace {
  export type Input = {
    id?: string
  }
  export type Output = null | undefined | ContentResource | ContentResource[]
}
